import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDataFromToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new NextResponse("No text provided", { status: 400 });
    }

    let blindText = text;

    const replacements: Record<string, string> = {
      // Political parties
      "Bharatiya Janata Party": "a national political party",
      "BJP": "a national political party",
      "Indian National Congress": "a national opposition party",
      "Congress": "a national opposition party",
      "INC": "a national opposition party",
      "Aam Aadmi Party": "a regional political party",
      "AAP": "a regional political party",
      "Trinamool Congress": "a regional political party",
      "TMC": "a regional political party",
      "DMK": "a regional political party",

      // Government references
      "state government": "the regional administration",
      "central government": "the national administration",
      "government": "the administration",

      // Leadership titles
      "Prime Minister": "the head of government",
      "PM": "the head of government",
      "Chief Minister": "the head of the regional government",
      "CM": "the head of the regional government",

      // Locations
      "Delhi": "the national capital",
      "India": "the country",
    };

    for (const [key, value] of Object.entries(replacements)) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedKey, "gi");
      blindText = blindText.replace(regex, value);
    }

    // Activity Logging
    const userId = getDataFromToken(req);
    if (userId) {
        // We don't await this to avoid blocking response, or we await to ensure it's saved.
        // User said "No blocking or long-running calls". But Prisma create is fast.
        // Safer to await to catch errors, or use void promise.
        // Given constraints, awaiting is safer for consistency unless perf is critical.
        await prisma.activity.create({
            data: {
                userId,
                type: 'BLIND_READ',
                title: 'Used Blind Mode Reader',
                url: '/blind-mode'
            }
        });
    }

    return NextResponse.json({ blindText });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
