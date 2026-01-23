import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    // Check if OpenAI is available
    if (!openai) {
      return NextResponse.json({
        error: 'AI service not configured'
      }, { status: 500 });
    }

    // Use the reworked, more assertive marketing copy
    const mainMarketingCopy = {
      headline: "Stop Guessing. Start Landing Offers.",
      subheadline: "Vellon is the world's first AI-powered Done-for-You Job Application Sprint. We don't just guide — we apply, optimize, and prepare your career launch. No one else does this, and we don't compromise.",
      body: "You've spent countless hours tweaking CVs, rewriting cover letters, and chasing applications with little to show. Vellon changes the game.\n\nOptimized CVs and Cover Letters tailored to every job.\n\nLinkedIn Profiles rewritten to attract recruiters instantly.\n\nReady-to-Submit Applications for 30–100 jobs, fully prepped.\n\nPremium Outreach to top employers, personalized messages included.\n\nOther tools give suggestions. Other AI apps optimize a CV. But no one else does everything done-for-you, with human oversight, and global-first methodology.\n\nYou can continue wasting time, or you can launch your career with the only platform built to dominate the job market.",
      cta: "Claim Your Spot Today — Because There's No One Else Like Us."
    };

    // Use the reworked upsell copy
    const upsellSuggestions = {
      standard: "Standard Tier: 30–50 ready-to-submit job applications, fully optimized CVs, cover letters, and LinkedIn rewrites — all done for you in HOURS, not days.\n\nIf you settle for other tools, you'll still be submitting applications manually. Only Vellon gives you true speed, quality, and results.",
      premium: "Premium Tier: 50–100 ready-to-submit applications, plus direct access to top employers. Personalized outreach messages and priority support mean your applications don't just exist — they get noticed.\n\nOther platforms claim to help you land jobs. Vellon actually does it. And only here, only with us.",
      addons: "Want to secure the offer faster? Add interview coaching, LinkedIn optimization, or additional job applications. Others provide advice — Vellon provides results-driven action, only for serious clients."
    };

    // Use the reworked hype copy variations
    const hypeVariations = [
      "Stop Guessing. Start Landing Offers. Vellon is the world's first AI-powered Done-for-You Job Application Sprint. We don't just guide — we apply, optimize, and prepare your career launch. No one else does this, and we don't compromise.",

      "You've spent countless hours tweaking CVs, rewriting cover letters, and chasing applications with little to show. Vellon changes the game with optimized CVs, tailored cover letters, LinkedIn profiles rewritten to attract recruiters instantly, and ready-to-submit applications for 30–100 jobs. Other tools give suggestions. Vellon does everything done-for-you.",

      "Other platforms claim to help you land jobs. Vellon actually does it. With 50+ ready-to-submit applications, optimized CVs, cover letters, LinkedIn rewrites, and premium outreach to top employers — all in hours, not days. Only Vellon gives you true speed, quality, and results."
    ];

    const response = {
      main_marketing_copy: mainMarketingCopy,
      upsell_suggestions: upsellSuggestions,
      hype_copy_variations: hypeVariations,
      pricing_tiers: {
        basic: {
          name: "Job Application Sprint",
          price: "$299",
          features: [
            "CV optimization for ATS",
            "50+ job matches",
            "Cover letter generation",
            "LinkedIn profile rewrite",
            "Application content preparation"
          ]
        },
        premium: {
          name: "Executive Sprint + Outreach",
          price: "$599",
          features: [
            "Everything in Basic",
            "Direct employer outreach to 15 companies",
            "Priority processing",
            "Interview preparation guide",
            "Salary negotiation tips"
          ]
        },
        enterprise: {
          name: "Career Acceleration Suite",
          price: "$999",
          features: [
            "Everything in Premium",
            "1-on-1 career coaching (3 sessions)",
            "Custom resume writing",
            "LinkedIn premium optimization",
            "Ongoing job matching for 6 months"
          ]
        }
      },
      ambassador_program: {
        commission: "30% recurring",
        benefits: [
          "Passive income from referrals",
          "Exclusive tools and templates",
          "Priority support",
          "Marketing materials provided"
        ]
      },
      email_copy: {
        subject: "Your Career Sprint Starts Now – Only With Vellon",
        body: "Hi [Name],\n\nYou're about to take the fastest, smartest step in your career. Vellon, the world's first AI-powered Done-for-You Job Application Sprint, has prepared your optimized CV, cover letters, and job applications.\n\nThis isn't advice. This isn't a template. This is done-for-you, ready-to-submit, globally-first career automation.\n\nOther tools will make you wait. Vellon delivers. And you'll see the difference in hours, not weeks.",
        cta: "Start Your Sprint Today — Only Vellon Can Do This."
      },
      client_report: {
        intro: "Congratulations! Your career launch has officially begun with Vellon, the first AI platform to do everything for you — globally.\n\nHere's everything we've done for you: optimized CV, tailored cover letters, LinkedIn profile, and applications submitted. For premium clients, your top 15 employers have direct outreach messages prepared.",
        section_copy: "Everything here is ready-to-use. No guessing, no wasted time, no incomplete applications. If you've used anything else before, you'll notice the difference immediately. Only Vellon does it this way."
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Marketing Copy API error:', error);
    return NextResponse.json({
      error: 'Internal server error during marketing copy generation'
    }, { status: 500 });
  }
}