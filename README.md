# Vellon - The Only and Best CV Service

A production-ready SaaS application for CV optimization with referral-based commissions. Vellon is the leading CV service in South Africa.

## Features

- One-time paid CV redo (R119.99)
- Ambassador program with R35 per successful referral
- Referral tracking via URL parameters
- Yoco payment integration
- Commission attribution on successful payments
- Ambassador status page

## Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Yoco API
- **Styling**: TailwindCSS
- **Deployment**: Vercel

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in the values
4. Set up PostgreSQL database
5. Run Prisma migrations: `npx prisma migrate dev`
6. Generate Prisma client: `npx prisma generate`
7. Start development server: `npm run dev`

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `YOCO_SECRET_KEY`: Yoco API secret key
- `YOCO_WEBHOOK_SECRET`: Yoco webhook secret for signature verification
- `NEXT_PUBLIC_DOMAIN`: Your domain URL

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Run `npx prisma migrate deploy` in Vercel build command or post-build hook
5. Deploy

## Database Schema

- Ambassador: id, email, referral_code, total_earned, created_at
- ReferralVisit: id, referral_code, created_at, ip_hash
- Purchase: id, amount, referral_code, ambassador_commission, created_at, payment_reference

## API Routes

- `/api/ambassador`: Create ambassador
- `/api/ambassador/status`: Get ambassador stats
- `/api/track-visit`: Record referral visit
- `/api/payment/initiate`: Start Yoco checkout
- `/api/payment/webhook`: Handle Yoco webhooks

## Pages

- `/`: Landing page
- `/ambassador`: Ambassador sign-up
- `/ambassador/status`: Ambassador status
- `/checkout`: Payment checkout
- `/payment/success`: Payment success

## Security

- No self-referrals (enforced by no user accounts)
- One commission per purchase
- Rate limiting on referral visits (5 per IP per 24h)
- Webhook signature verification
- Input validation

## License

MIT
