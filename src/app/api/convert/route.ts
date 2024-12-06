import { NextResponse } from 'next/server';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import axios from 'axios';
import crypto from 'crypto';

// 有道翻译API配置
const YOUDAO_APP_KEY = process.env.YOUDAO_APP_KEY!;
const YOUDAO_APP_SECRET = process.env.YOUDAO_APP_SECRET!;
const YOUDAO_API_URL = 'https://openapi.youdao.com/api';

interface YoudaoResponse {
  translation: string[];
  // 可以根据需要添加其他字段
}

interface YoudaoParams {
  q: string;
  from: string;
  to: string;
  appKey: string;
  salt: number;
  sign: string;
  signType: string;
  curtime: number;
}

interface KuroshiroOptions {
  mode: 'normal' | 'spaced' | 'okurigana' | 'furigana';
  to: 'hiragana' | 'katakana' | 'romaji';
  romajiSystem?: string;
}

function truncate(q: string): string {
  const len = q.length;
  return len <= 20 ? q : q.substring(0, 10) + len + q.substring(len - 10, len);
}

async function translateToJapanese(text: string): Promise<string> {
  try {
    const salt = new Date().getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const str = YOUDAO_APP_KEY + truncate(text) + salt + curtime + YOUDAO_APP_SECRET;
    const sign = crypto.createHash('sha256').update(str).digest('hex');

    const params: YoudaoParams = {
      q: text,
      from: 'en',
      to: 'ja',
      appKey: YOUDAO_APP_KEY,
      salt: salt,
      sign: sign,
      signType: 'v3',
      curtime: curtime,
    };

    const response = await axios.post<YoudaoResponse>(YOUDAO_API_URL, new URLSearchParams({
      ...params,
      salt: String(params.salt),
      curtime: String(params.curtime)
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.data && response.data.translation && response.data.translation[0]) {
      return response.data.translation[0];
    }
    throw new Error('翻译返回数据格式错误');
  } catch (error) {
    console.error('有道翻译错误:', error);
    throw new Error('翻译服务出错');
  }
}

export async function POST(req: Request) {
  try {
    const { text, options } = await req.json();
    const kuroshiro = new Kuroshiro();
    const analyzer = new KuromojiAnalyzer();
    await kuroshiro.init(analyzer);
    
    // 如果是英文输入，先用有道翻译成日文
    let japaneseText = text;
    if (options.sourceType === 'english') {
      japaneseText = await translateToJapanese(text);
    }
    
    const conversionResults = await Promise.all(
      options.targetTypes.map(async (targetType: string) => {
        const kuroshiroOptions: KuroshiroOptions = {
          mode: 'normal',
          to: 'hiragana'
        };

        switch (targetType) {
          case 'hiragana':
            kuroshiroOptions.to = 'hiragana';
            break;
          case 'katakana':
            kuroshiroOptions.to = 'katakana';
            break;
          case 'romaji':
            kuroshiroOptions.to = 'romaji';
            kuroshiroOptions.romajiSystem = options.romajiSystem;
            break;
          default:
            kuroshiroOptions.to = 'hiragana';
        }

        const convertedText = await kuroshiro.convert(japaneseText, kuroshiroOptions);
        return {
          type: targetType,
          text: convertedText
        };
      })
    );

    return NextResponse.json({ results: conversionResults });
  } catch (error) {
    console.error('转换错误:', error);
    return NextResponse.json(
      { error: `转换失败: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}