import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, blind } = body;

    // Log Activity if user is logged in
    const userId = getDataFromToken(req);
    if (userId) {
        await prisma.activity.create({
            data: {
                userId,
                type: 'CHATBOT_USE',
                title: 'Used Chatbot',
                url: '/chatbot'
            }
        });
    }

    // Proxy to external API
    const chatbotApi = process.env.NEXT_PUBLIC_CHATBOT_API;
    if (!chatbotApi) {
        // Fallback or error
        return NextResponse.json({ reply: "Chatbot API URL not configured." });
    }

    const res = await fetch(`${chatbotApi}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, blind })
    });

    if (!res.ok) {
        return NextResponse.json({ reply: "I'm having trouble connecting to my AI backend." }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Chatbot Proxy Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
