# Great Dane Builders

A responsive website for Great Dane Builders, recreated from the supplied Figma design with Next.js, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The contact form sends website enquiries through Resend. Configure the secret
server-side in Vercel (or in an ignored `.env.local` file for local development):

```bash
RESEND_API_KEY=your_resend_api_key
```

The API key is only read by the `/api/enquiries` route and is never exposed to
the browser.

## Quality checks

```bash
npm run lint
npm run build
```
