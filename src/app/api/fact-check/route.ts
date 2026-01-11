import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { claim } = await request.json();
    
    if (!claim || typeof claim !== 'string') {
      return NextResponse.json(
        { error: 'Claim is required and must be a string' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      // Return mock data for demo purposes
      console.log('No API key configured, returning mock data');
      return NextResponse.json({
        verdict: 'Misleading',
        validity_percentage: 65,
        reasoning: 'Demo mode: Please configure your Gemini API key in .env.local file for real fact-checking'
      });
    }

    try {
      // Initialize Google Generative AI
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      
//       const model = genAI.getGenerativeModel({
//         model: 'gemini-1.5-flash',
//         systemInstruction: `You are a Fact Evaluator. Analyze the given claim and provide a structured response with:
// 1. verdict: One of these exact values - "True", "False", or "Misleading"
// 2. validity_percentage: A number between 0-100 representing confidence in the verdict
// 3. reasoning: A brief explanation (1-2 sentences) of why you reached this conclusion

// Format your response as a JSON object with these exact keys: verdict, validity_percentage, reasoning`
//       });


const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
  systemInstruction: `You are the Lead Fact Auditor for 'Electrify-India', a non-partisan platform educating voters on One Nation One Election (ONOE) and Indian electoral reforms.

STRICT OPERATING RULES:
1. TOPIC RESTRICTION: You only analyze claims related to Indian Elections, ONOE, the Kovind Committee Report, Constitutional Amendments (specifically Articles 83, 172, 324), and ECI (Election Commission of India) guidelines. 
2. OFF-TOPIC HANDLING: If a claim is unrelated to these topics, return: {"verdict": "False", "validity_percentage": 0, "reasoning": "This claim is outside the scope of electoral reforms. Please submit a claim related to Indian elections or ONOE."}
3. NEUTRALITY: Use objective, constitutional language. Do not show bias toward any political party.
4. SOURCE BASIS: Base your analysis on the 'Report of the High-Level Committee on Simultaneous Elections' and the Constitution of India.

RESPONSE FORMAT (JSON ONLY):
{
  "verdict": "True" | "False" | "Misleading",
  "validity_percentage": number (0-100),
  "reasoning": "string (Max 2 sentences, citing specific legal or committee facts where possible)"
}`
});

      const prompt = `Please fact-check this claim: "${claim}"`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('Gemini response:', text);

      // Parse the response to extract JSON
      let parsedResponse;
      try {
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          // Fallback: try to parse the entire response as JSON
          parsedResponse = JSON.parse(text);
        }
      } catch (parseError) {
        // If JSON parsing fails, create a fallback response
        console.error('Failed to parse Gemini response, using fallback:', text);
        
        // Simple heuristic-based fallback
        const lowerText = text.toLowerCase();
        let verdict = 'Misleading';
        let validity_percentage = 50;
        let reasoning = 'Analysis completed with fallback method';
        
        if (lowerText.includes('true') || lowerText.includes('correct') || lowerText.includes('accurate')) {
          verdict = 'True';
          validity_percentage = 85;
          reasoning = 'The claim appears to be supported by evidence';
        } else if (lowerText.includes('false') || lowerText.includes('incorrect') || lowerText.includes('wrong')) {
          verdict = 'False';
          validity_percentage = 15;
          reasoning = 'The claim appears to be contradicted by evidence';
        }
        
        parsedResponse = { verdict, validity_percentage, reasoning };
      }

      // Validate the response structure
      const validVerdicts = ['True', 'False', 'Misleading'];
      if (!parsedResponse.verdict || !validVerdicts.includes(parsedResponse.verdict)) {
        parsedResponse.verdict = 'Misleading';
      }
      
      if (typeof parsedResponse.validity_percentage !== 'number' || 
          parsedResponse.validity_percentage < 0 || 
          parsedResponse.validity_percentage > 100) {
        parsedResponse.validity_percentage = 50;
      }

      if (typeof parsedResponse.reasoning !== 'string') {
        parsedResponse.reasoning = 'Analysis completed';
      }

      // Log activity
      const userId = getDataFromToken(request);
      if (userId) {
          await prisma.activity.create({
              data: {
                  userId,
                  type: 'FACT_CHECK',
                  title: 'Used Fact Checker',
                  url: '/fact-check'
              }
          });
      }

      return NextResponse.json(parsedResponse);
      
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      return NextResponse.json(
        { 
          error: 'Failed to process fact check',
          details: 'Gemini API error occurred'
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Fact-check API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}