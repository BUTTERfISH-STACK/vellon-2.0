import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function POST(request: NextRequest) {
  try {
    const { cvContent, targetRole, industry, answers, audioTranscription } = await request.json();

    // If no answers provided, generate questions
    if (!answers && !audioTranscription) {
      const questions = await generateInterviewQuestions(cvContent, targetRole, industry);
      return NextResponse.json({ questions });
    }

    // If answers provided, evaluate them
    const feedback = await evaluateAnswers(cvContent, targetRole, industry, answers || audioTranscription);
    const overallScore = calculateOverallScore(feedback);

    return NextResponse.json({
      feedback,
      overall_score: overallScore
    });

  } catch (error) {
    console.error('Interview Simulator Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateInterviewQuestions(cvContent: string, targetRole: string, industry: string) {
  if (!openai) {
    // Return mock questions if no API key
    return [
      "Tell me about a challenging project you worked on and how you overcame the difficulties.",
      "What programming languages are you most proficient in?",
      "Describe a situation where you had to learn a new technology quickly.",
      "How do you handle tight deadlines and multiple priorities?",
      "What is your experience with agile development methodologies?",
      "Can you walk me through your problem-solving process?",
      "Tell me about a time you received constructive criticism.",
      "What tools do you use for version control?",
      "How do you ensure code quality in your projects?",
      "Describe your ideal work environment.",
      "What motivates you in your career?",
      "How do you stay updated with industry trends?",
      "Tell me about a successful team collaboration experience.",
      "What are your strengths and areas for improvement?",
      "Where do you see yourself in 5 years?"
    ];
  }

  const prompt = `
Based on the following CV content and target role/industry, generate 15 realistic interview questions.
Mix of:
- 5 Behavioral questions (past experiences, STAR method)
- 5 Technical/role-specific questions
- 5 Situational problem-solving questions

CV Content: ${cvContent.substring(0, 2000)}
Target Role: ${targetRole}
Industry: ${industry}

Return only a JSON array of question strings.
`;

  if (!openai) throw new Error('OpenAI not configured');

  const response = await (openai as any).chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const questions = JSON.parse(response.choices[0].message.content || '[]');
  return questions;
}

async function evaluateAnswers(cvContent: string, targetRole: string, industry: string, answers: string[]) {
  if (!openai) {
    // Return mock feedback if no API key
    return answers.map((_, index) => ({
      question_index: index,
      scores: {
        clarity: Math.floor(Math.random() * 5) + 6,
        confidence: Math.floor(Math.random() * 5) + 6,
        relevance: Math.floor(Math.random() * 5) + 6,
        completeness: Math.floor(Math.random() * 5) + 6
      },
      suggestions: [
        "Practice speaking more clearly and confidently.",
        "Provide more specific examples from your experience.",
        "Focus on quantifiable achievements."
      ]
    }));
  }

  const prompt = `
Evaluate the following interview answers based on:
- Clarity (1-10)
- Confidence (1-10)
- Relevance (1-10)
- Completeness (1-10)

Provide scores and actionable improvement suggestions for each answer.

CV Context: ${cvContent.substring(0, 1000)}
Target Role: ${targetRole}
Industry: ${industry}

Answers: ${JSON.stringify(answers)}

Return a JSON array where each object has:
{
  "question_index": number,
  "scores": { "clarity": number, "confidence": number, "relevance": number, "completeness": number },
  "suggestions": ["suggestion1", "suggestion2"]
}
`;

  const response = await (openai as any).chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  const feedback = JSON.parse(response.choices[0].message.content || '[]');
  return feedback;
}

function calculateOverallScore(feedback: any[]) {
  if (!feedback.length) return 0;

  const totalScore = feedback.reduce((sum, item) => {
    const scores = item.scores;
    return sum + (scores.clarity + scores.confidence + scores.relevance + scores.completeness);
  }, 0);

  return Math.round((totalScore / (feedback.length * 40)) * 100);
}