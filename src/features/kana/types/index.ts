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

export interface GojuonData {
  seion: {
    vowels: Array<{ hiragana: string; katakana: string; romaji: string }>;
    consonants: Array<Array<{ hiragana: string; katakana: string; romaji: string }>>;
  };
  dakuon: {
    consonants: Array<Array<{ hiragana: string; katakana: string; romaji: string }>>;
  };
  youon: {
    combinations: Array<Array<{ hiragana: string; katakana: string; romaji: string }>>;
  };
} 