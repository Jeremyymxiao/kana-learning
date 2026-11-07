import { NextResponse } from 'next/server';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import path from 'path';

// Singleton kuroshiro instance
let kuroshiroInstance: Kuroshiro | null = null;
let initPromise: Promise<Kuroshiro> | null = null;

async function getKuroshiro(): Promise<Kuroshiro> {
  if (kuroshiroInstance) return kuroshiroInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const kuroshiro = new Kuroshiro();
    const analyzer = new KuromojiAnalyzer({
      dictPath: path.join(process.cwd(), 'public', 'dict'),
    });
    await kuroshiro.init(analyzer);
    kuroshiroInstance = kuroshiro;
    return kuroshiro;
  })();

  return initPromise;
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Text is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    const kuroshiro = await getKuroshiro();
    const result = await kuroshiro.convert(text, {
      to: 'hiragana',
      mode: 'furigana',
    });

    return NextResponse.json({ html: result });
  } catch (error) {
    console.error('Furigana conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to process text' },
      { status: 500 }
    );
  }
}
