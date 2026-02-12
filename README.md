# Roopali Fashion Web App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Key Features

- **Modern Stack**: Next.js 15, React, TypeScript.
- **Admin Dashboard**: Manage products at `/admin` (Password: `admin123`).
- **Authentication**: Secure login and middleware protection for Admin routes.
- **Dark Mode**: Fully responsive dark/light theme with toggle.
- **Dynamic Collections**: Products are filtered dynamically based on category.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/`: Source code for pages and layouts.
- `components/`: Reusable React components (Header, Footer, Hero, etc.).
- `data/`: JSON data storage (`products.json`) and types (`types.ts`).
- `public/`: Static assets.

## Deployment

This app can be deployed to Vercel or any other Next.js compatible hosting providing:
1.  **Write Access**: Since this app uses a local JSON file for data persistence, it requires a persistent filesystem (like a VPS or specialized storage) if you want changes to persist across redeployments on serverless platforms. For serverless (Vercel), data changes will reset on redeploy.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
"# roopali-fashion" 
