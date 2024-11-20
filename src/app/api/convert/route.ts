import { NextResponse } from 'next/server';

import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const kuroshiro = new Kuroshiro();
    const analyzer = new KuromojiAnalyzer();
    await kuroshiro.init(analyzer);
    
    const result = await kuroshiro.convert(text, {
      to: 'hiragana',
      mode: 'normal'
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: `转换失败: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}