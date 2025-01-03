declare module 'kuroshiro' {
  export default class Kuroshiro {
    init(analyzer: KuromojiAnalyzer): Promise<void>;
    convert(text: string, options: {
      to: 'hiragana' | 'katakana' | 'romaji';
      mode: 'normal' | 'spaced' | 'okurigana' | 'furigana';
    }): Promise<string>;
  }
}

declare module 'kuroshiro-analyzer-kuromoji' {
  export default class KuromojiAnalyzer {
    constructor();
  }
}