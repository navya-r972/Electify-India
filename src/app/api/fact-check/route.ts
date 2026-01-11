import { NextResponse } from 'next/server';

type Analysis = {
  verdict: "Factual" | "Potentially Misleading" | "Unsupported";
  confidence: number; // 0-100
  reasons: string[];
};

function analyzeText(input: string): Analysis {
  const text = input.toLowerCase();
  let score = 50; // baseline
  const reasons: string[] = [];

  const sensational = ["₹", "crore", "always", "never", "guaranteed", "everyone", "100%", "promised", "massive"];
  const authority = ["source:", "eci", "election commission", "law commission", "report no.", "pdf", "doi", "http://", "https://", "footnote", "appendix"];
  const hedging = ["may", "could", "suggests", "likely", "estimates", "appears"];

  if (sensational.some(k => text.includes(k))) {
    score -= 15;
    reasons.push("Contains sensational or absolute phrasing.");
  }
  if (authority.some(k => text.includes(k))) {
    score += 20;
    reasons.push("Mentions sources or authoritative references.");
  }
  if (hedging.some(k => text.includes(k))) {
    score += 5;
    reasons.push("Uses cautious/hedging language rather than absolutes.");
  }
  const linkCount = (text.match(/https?:\/\//g) || []).length;
  if (linkCount >= 2) {
    score += 10;
    reasons.push("Multiple external references/links present.");
  }

  const length = input.trim().length;
  if (length < 40) {
    score -= 20;
    reasons.push("Very short or out-of-context claim.");
  } else if (length > 500) {
    score += 5;
    reasons.push("Longer context provided.");
  }

  // Boundaries
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let verdict: Analysis["verdict"] = "Unsupported";
  if (score >= 70) verdict = "Factual";
  else if (score >= 40) verdict = "Potentially Misleading";

  return { verdict, confidence: Math.round(score), reasons };
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const analysis = analyzeText(text);
    
    // Simulate latency
    await new Promise(r => setTimeout(r, 600));

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
