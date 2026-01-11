import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language = 'en' } = body;

    // Validate language to prevent directory traversal
    const allowedLanguages = ['en', 'hi', 'ur', 'bn'];
    const lang = allowedLanguages.includes(language) ? language : 'en';

    const localesDir = path.join(process.cwd(), 'public', 'locales', lang);
    
    // Read translation files
    let translation = {};
    let common = {};

    try {
      const translationPath = path.join(localesDir, 'translation.json');
      const translationContent = await fs.readFile(translationPath, 'utf-8');
      translation = JSON.parse(translationContent);
    } catch (e) {
      console.warn(`Could not read translation.json for ${lang}`);
    }

    try {
      const commonPath = path.join(localesDir, 'common.json');
      const commonContent = await fs.readFile(commonPath, 'utf-8');
      common = JSON.parse(commonContent);
    } catch (e) {
      console.warn(`Could not read common.json for ${lang}`);
    }

    // Merge translations
    const merged = { ...common, ...translation };

    return NextResponse.json(merged);

  } catch (error: any) {
    console.error('Language API Error:', error);
    return NextResponse.json({ message: 'Failed to load translations' }, { status: 500 });
  }
}
