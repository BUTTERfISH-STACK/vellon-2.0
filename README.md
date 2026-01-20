# Vellon CV Redo with Ambassador Program

A production-ready SaaS application for CV optimization with referral-based commissions.

## Features

- One-time paid CV redo (R119.99)
- Ambassador program with R35 per successful referral
- Email-only magic link authentication
- Yoco payment integration
- Referral tracking and commission attribution
- Ambassador dashboard

## Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js with email magic links
- **Payments**: Yoco API
- **Styling**: TailwindCSS
- **Deployment**: Vercel

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in the values
4. Set up PostgreSQL database
5. Run Prisma migrations: `npm run db:migrate`
6. Generate Prisma client: `npm run db:generate`
7. Start development server: `npm run dev`

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `NEXTAUTH_URL`: Your app URL
- `YOCO_SECRET_KEY`: Yoco API secret key
- `EMAIL_SERVER_HOST`: SMTP host
- `EMAIL_SERVER_PORT`: SMTP port
- `EMAIL_SERVER_USER`: SMTP username
- `EMAIL_SERVER_PASSWORD`: SMTP password
- `EMAIL_FROM`: From email address

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Database Schema

- User: email, role
- Ambassador: referralCode, totalEarnings
- ReferralClick: referralCode, ipAddress
- Payment: userId, amount, status, referralCode, ambassadorCommission

## API Routes

- `/api/auth/[...nextauth]`: Authentication
- `/api/ambassador`: Create ambassador
- `/api/dashboard`: Ambassador stats
- `/api/payment/initiate`: Start Yoco checkout
- `/api/payment/webhook`: Handle Yoco webhooks

## Pages

- `/`: Landing page
- `/ambassador`: Ambassador sign-up
- `/checkout`: Payment checkout
- `/dashboard`: Ambassador dashboard
- `/payment/success`: Payment success

## Security

- No self-referrals
- One commission per paid CV
- Rate limiting (to be implemented)
- Input validation

## License

MIT
