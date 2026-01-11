import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FactCheck from '@/models/FactCheck';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { statement } = await req.json();
    
    // Simple keyword matching for demo purposes
    let verdict = 'Unverified';
    let explanation = 'We could not verify this statement automatically. Our team will review it.';

    const lowerStmt = statement.toLowerCase();

    if (lowerStmt.includes('onoe') && lowerStmt.includes('save') && lowerStmt.includes('money')) {
      verdict = 'True';
      explanation = 'Multiple reports, including the Law Commission, suggest simultaneous elections could significantly reduce the recurring cost of conducting separate elections.';
    } else if (lowerStmt.includes('evm') && lowerStmt.includes('hack')) {
      verdict = 'False';
      explanation = 'EVMs in India are standalone devices not connected to any network, making remote hacking impossible.';
    }

    // Log the check
    const check = await FactCheck.create({
      statement,
      verdict,
      explanation,
      source: 'Automated Check'
    });

    return NextResponse.json(check);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
