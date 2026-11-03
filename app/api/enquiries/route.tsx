import { Resend } from "resend";
import { EnquiryEmail, enquiryPlainText } from "@/emails/enquiry";
import {
  enquiryServices,
  type EnquiryPayload,
  type EnquiryService,
} from "@/lib/enquiries";
import { contact } from "@/lib/site-data";

const MAX_BODY_BYTES = 12_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validServices = new Set<string>(enquiryServices);

function response(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function singleLine(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function validate(body: unknown):
  | { data: EnquiryPayload; error?: never }
  | { data?: never; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Please complete all required fields." };
  }

  const input = body as Record<string, unknown>;
  const name = singleLine(input.name);
  const email = singleLine(input.email).toLowerCase();
  const service = singleLine(input.service);
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const company = singleLine(input.company);

  if (name.length < 2 || name.length > 100) {
    return { error: "Please enter your name." };
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!validServices.has(service)) {
    return { error: "Please select a service." };
  }
  if (message.length < 10 || message.length > 5_000) {
    return { error: "Please enter a message between 10 and 5,000 characters." };
  }

  return {
    data: {
      name,
      email,
      service: service as EnquiryService,
      message,
      company,
    },
  };
}

function requestIsCrossSite(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host !== new URL(request.url).host;
  } catch {
    return true;
  }
}

export async function POST(request: Request) {
  if (requestIsCrossSite(request)) {
    return response({ error: "This request is not allowed." }, 403);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return response({ error: "This enquiry is too large to send." }, 413);
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return response({ error: "Please complete all required fields." }, 400);
  }

  if (
    parsedBody &&
    typeof parsedBody === "object" &&
    !Array.isArray(parsedBody) &&
    singleLine((parsedBody as Record<string, unknown>).company)
  ) {
    return response({ ok: true }, 200);
  }

  const result = validate(parsedBody);
  if ("error" in result) {
    return response({ error: result.error }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return response(
      { error: "Email delivery is temporarily unavailable. Please try again shortly." },
      503,
    );
  }

  const submittedAt = new Intl.DateTimeFormat("en-NZ", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Pacific/Auckland",
  }).format(new Date());
  const { name, email, service, message } = result.data;
  const resend = new Resend(apiKey);
  const suppliedIdempotencyKey = request.headers.get("x-idempotency-key");
  const idempotencyKey =
    suppliedIdempotencyKey && /^[A-Za-z0-9._:-]{1,128}$/.test(suppliedIdempotencyKey)
      ? suppliedIdempotencyKey
      : undefined;
  const emailContent = (
    <EnquiryEmail
      name={name}
      email={email}
      service={service}
      message={message}
      submittedAt={submittedAt}
    />
  );
  const plainTextContent = enquiryPlainText({
    name,
    email,
    service,
    message,
    submittedAt,
  });

  try {
    const { data, error } = await resend.emails.send(
      {
        from: "Great Dane Builders <enquiries@weblaunch.co.nz>",
        to: [contact.email, contact.secondaryEmail],
        replyTo: email,
        subject: `Website enquiry: ${service} — ${name}`,
        react: emailContent,
        text: plainTextContent,
        tags: [{ name: "source", value: "website-enquiry" }],
      },
      idempotencyKey ? { idempotencyKey } : undefined,
    );

    if (error) {
      console.error("Resend enquiry delivery failed:", error.name);
      return response(
        { error: "We could not send your enquiry. Please try again." },
        502,
      );
    }

    return response({ ok: true, id: data?.id }, 200);
  } catch (error) {
    console.error(
      "Unexpected enquiry delivery failure:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return response(
      { error: "We could not send your enquiry. Please try again." },
      502,
    );
  }
}

