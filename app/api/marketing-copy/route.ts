import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    // Generate main marketing copy
    const mainCopyPrompt = `
You are Vellon, the world's first AI-powered Done-for-You Job Application Sprint Platform.

Generate compelling marketing copy that positions Vellon as the first of its kind globally.

Requirements:
- Use hype language that conveys: fast results, massive value, first-of-its-kind innovation
- Emphasize the complete end-to-end service
- Highlight AI + human combination
- Include specific benefits and outcomes
- Make it conversion-focused

Example structure:
- Hook with the "first of its kind" positioning
- Problem statement (job search frustration)
- Solution (Vellon's complete service)
- Benefits and features
- Social proof elements
- Call to action

Keep it under 300 words but highly impactful.
    `;

    const mainCopyCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Generate compelling marketing copy for Vellon platform.' },
        { role: 'user', content: mainCopyPrompt }
      ],
      max_tokens: 400,
      temperature: 0.8,
    });

    const mainMarketingCopy = mainCopyCompletion.choices[0]?.message?.content?.trim();

    // Generate upsell suggestions
    const upsellPrompt = `
Suggest premium upsells and pricing tiers for Vellon.

Current service: Basic job application sprint ($299)
Premium features to upsell:
- Direct employer outreach
- Priority application processing
- Interview preparation
- Salary negotiation coaching
- LinkedIn premium optimization
- Resume writing service
- Career coaching sessions

Suggest 3 pricing tiers with clear value propositions.
Include reseller opportunities and ambassador program benefits.
    `;

    const upsellCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Suggest monetization strategies and pricing tiers.' },
        { role: 'user', content: upsellPrompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const upsellSuggestions = upsellCompletion.choices[0]?.message?.content?.trim();

    // Generate hype copy variations
    const hypeVariations = [
      "Introducing Vellon: The WORLD'S FIRST AI-powered Done-for-You Job Application Sprint. From optimized CVs to tailored cover letters, LinkedIn rewrites, and fully prepped job applications, Vellon gets you applying to 50+ jobs in HOURS — not days. Premium clients get direct access to top employers with personalized outreach messages. It's fast, efficient, and globally unprecedented — your career launch, supercharged by AI.",

      "STOP wasting weeks on job applications! Vellon is the world's first AI-powered Done-for-You Job Application Sprint that handles EVERYTHING: CV optimization, cover letters, LinkedIn profiles, job matching, and application submission. Get 50+ applications submitted in hours, not days. Premium tier includes direct employer outreach. The future of job searching is here — and it's called Vellon.",

      "What if you could apply to 50 dream jobs in one day? With Vellon, the world's first AI-powered Done-for-You Job Application Sprint, that's reality. Our AI optimizes your CV for ATS, crafts perfect cover letters, rewrites your LinkedIn, finds matching jobs, and our human experts submit everything. Premium clients get personalized outreach to top companies. Don't just search for jobs — let Vellon find YOU the perfect role."
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