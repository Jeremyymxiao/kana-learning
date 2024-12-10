import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, sourceType } = await req.json();
    console.log('收到转换请求:', { text, sourceType });

    // 假名与片假名的转换偏移量
    const KATAKANA_START = 0x30A1;
    const HIRAGANA_START = 0x3041;
    const CONVERSION_DIFFERENCE = KATAKANA_START - HIRAGANA_START;

    // 罗马音映射表
    const romajiToHiraganaMap: { [key: string]: string } = {
      'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
      'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
      'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
      'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
      'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
      'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
      'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
      'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
      'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
      'wa': 'わ', 'wo': 'を', 'n': 'ん'
    };

    // ��换函数
    const convertToKatakana = (text: string) => {
      return text.replace(/[\u3041-\u3096]/g, char => 
        String.fromCharCode(char.charCodeAt(0) + CONVERSION_DIFFERENCE)
      );
    };

    const convertToHiragana = (text: string) => {
      return text.replace(/[\u30A1-\u30F6]/g, char => 
        String.fromCharCode(char.charCodeAt(0) - CONVERSION_DIFFERENCE)
      );
    };

    const convertRomajiToHiragana = (text: string) => {
      const input = text.toLowerCase();
      let result = '';
      let i = 0;
      while (i < input.length) {
        let found = false;
        // 尝试匹配两个字符
        if (i + 1 < input.length) {
          const twoChars = input.slice(i, i + 2);
          if (romajiToHiraganaMap[twoChars]) {
            result += romajiToHiraganaMap[twoChars];
            i += 2;
            found = true;
            continue;
          }
        }
        // 如果没有匹配到两个字符，尝试匹配单个字符
        if (!found) {
          const oneChar = input[i];
          result += romajiToHiraganaMap[oneChar] || oneChar;
          i++;
        }
      }
      return result;
    };

    let hiragana = text;
    let katakana = text;
    const romaji = text;

    switch (sourceType) {
      case 'hiragana':
        katakana = convertToKatakana(text);
        break;
      case 'katakana':
        hiragana = convertToHiragana(text);
        break;
      case 'romaji':
        hiragana = convertRomajiToHiragana(text);
        katakana = convertToKatakana(hiragana);
        break;
    }

    return NextResponse.json({
      hiragana,
      katakana,
      romaji
    });
  } catch (error) {
    console.error('处理请求失败:', error);
    return NextResponse.json(
      { error: '转换失败' },
      { status: 500 }
    );
  }
}