export const enquiryServices = [
  "Renovations, Additions & Alterations",
  "Outdoor Living",
  "New Builds",
  "Project Management",
] as const;

export type EnquiryService = (typeof enquiryServices)[number];

export type EnquiryPayload = {
  name: string;
  email: string;
  service: EnquiryService;
  message: string;
  company?: string;
};

