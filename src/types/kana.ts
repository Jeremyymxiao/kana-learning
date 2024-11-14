export interface KanaCell {
    kana: string;
    romaji: string;
  }
  
  export interface KanaRow {
    [key: string]: KanaCell;
  }
  
  export interface KanaTable {
    [key: string]: KanaRow;
  }

  export const HIRAGANA_TABLE = {
    a: { kana: 'あ', romaji: 'a' },
    i: { kana: 'い', romaji: 'i' },
    u: { kana: 'う', romaji: 'u' },
    e: { kana: 'え', romaji: 'e' },
    o: { kana: 'お', romaji: 'o' },
    // ... 其他假名数据
  };
  
  export const KATAKANA_TABLE = {
    // ... 片假名数据
  };