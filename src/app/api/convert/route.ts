import { NextResponse } from 'next/server';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

// 扩展 KuromojiAnalyzer 的类型
interface KuromojiAnalyzerOptions {
  dictPath?: string;
}

// 扩展 Kuroshiro 选项的类型
interface KuroshiroOptions {
  to: 'hiragana' | 'katakana' | 'romaji';
  mode: 'normal' | 'spaced' | 'okurigana' | 'furigana';
  romajiSystem?: 'nippon' | 'passport' | 'hepburn';
}

// Kuroshiro 实例
let kuroshiroInstance: Kuroshiro | null = null;

// 初始化 Kuroshiro
async function initializeKuroshiro(): Promise<Kuroshiro> {
  if (!kuroshiroInstance) {
    console.log('创建新的 Kuroshiro 实例');
    kuroshiroInstance = new Kuroshiro();
    const analyzer = new (KuromojiAnalyzer as any)({
      dictPath: process.cwd() + '/node_modules/kuromoji/dict'  // 使用绝对路径
    });
    try {
      await kuroshiroInstance.init(analyzer);
      console.log('Kuroshiro 初始化完成');
    } catch (error) {
      console.error('Kuroshiro 初始化失败:', error);
      throw error;
    }
  }
  return kuroshiroInstance;
}

export async function POST(req: Request) {
  try {
    const { text, options } = await req.json();
    console.log('收到转换请求:', { text, options });
    console.log('当前工作目录:', process.cwd());

    // 确保 Kuroshiro 已初始化
    console.log('开始初始化 Kuroshiro...');
    const kuroshiro = await initializeKuroshiro();
    console.log('Kuroshiro 初始化成功');
    
    const conversionResults = await Promise.all(
      options.targetTypes.map(async (targetType: string) => {
        let to: 'hiragana' | 'katakana' | 'romaji';
        
        // 根据目标类型设置转换选项
        switch (targetType) {
          case 'hiragana':
            to = 'hiragana';
            break;
          case 'katakana':
            to = 'katakana';
            break;
          case 'romaji':
            to = 'romaji';
            break;
          default:
            throw new Error(`不支持的转换类型: ${targetType}`);
        }

        console.log(`开始转换到 ${to}`);
        const convertedText = await kuroshiro.convert(text, {
          mode: 'normal',
          to: to,
          romajiSystem: options.romajiSystem || 'hepburn'
        } as KuroshiroOptions);
        console.log(`转换结果:`, convertedText);

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