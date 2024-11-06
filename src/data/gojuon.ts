// src/data/gojuon.ts
/*
export const gojuonData = {
    vowels: [
      { hiragana: 'あ', katakana: 'ア', romaji: 'a' },
      { hiragana: 'い', katakana: 'イ', romaji: 'i' },
      { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
      { hiragana: 'え', katakana: 'エ', romaji: 'e' },
      { hiragana: 'お', katakana: 'オ', romaji: 'o' }
    ],
    consonants: [
      [
        { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
        { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
        { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
        { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
        { hiragana: 'こ', katakana: 'コ', romaji: 'ko' }
      ],
      // ... 其他行的数据
    ]
  };
  
  // 如果你想要单独导出数据类型
  export interface KanaData {
    hiragana: string;
    katakana: string;
    romaji: string;
  }
  
  export interface GojuonData {
    vowels: KanaData[];
    consonants: KanaData[][];
  }
*/

  // src/data/gojuon.ts

// 数据类型定义
interface KanaChar {
    hiragana: string;
    katakana: string;
    romaji: string;
  }
  
  interface GojuonData {
    seion: {     // 清音
      vowels: KanaChar[];    // 元音行
      consonants: KanaChar[][] // 各个辅音行
    };
    dakuon: {    // 浊音/半浊音
      consonants: KanaChar[][]
    };
    youon: {     // 拗音
      combinations: KanaChar[][]
    };
  }
  
  // 数据示例
  export const gojuonData: GojuonData = {
    seion: {
      // 元音 (あいうえお)
      vowels: [
        { hiragana: 'あ', katakana: 'ア', romaji: 'a' },
        { hiragana: 'い', katakana: 'イ', romaji: 'i' },
        { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
        { hiragana: 'え', katakana: 'エ', romaji: 'e' },
        { hiragana: 'お', katakana: 'オ', romaji: 'o' },
      ],
      // 辅音行 (かさたなはまやらわ)
      consonants: [
        // か行
        [
          { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
          { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
          { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
          { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
          { hiragana: 'こ', katakana: 'コ', romaji: 'ko' },
        ],
        // さ行
        [
          { hiragana: 'さ', katakana: 'サ', romaji: 'sa' },
          { hiragana: 'し', katakana: 'シ', romaji: 'shi' },
          { hiragana: 'す', katakana: 'ス', romaji: 'su' },
          { hiragana: 'せ', katakana: 'セ', romaji: 'se' },
          { hiragana: 'そ', katakana: 'ソ', romaji: 'so' },
        ],
        // た行
        [
          { hiragana: 'た', katakana: 'タ', romaji: 'ta' },
          { hiragana: 'ち', katakana: 'チ', romaji: 'chi' },
          { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' },
          { hiragana: 'て', katakana: 'テ', romaji: 'te' },
          { hiragana: 'と', katakana: 'ト', romaji: 'to' },
        ],
        // な行
        [
          { hiragana: 'な', katakana: 'ナ', romaji: 'na' },
          { hiragana: 'に', katakana: 'ニ', romaji: 'ni' },
          { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' },
          { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' },
          { hiragana: 'の', katakana: 'ノ', romaji: 'no' },
        ],
        // は行
        [
          { hiragana: 'は', katakana: 'ハ', romaji: 'ha' },
          { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' },
          { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' },
          { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' },
          { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' },
        ],
        // ま行
        [
          { hiragana: 'ま', katakana: 'マ', romaji: 'ma' },
          { hiragana: 'み', katakana: 'ミ', romaji: 'mi' },
          { hiragana: 'む', katakana: 'ム', romaji: 'mu' },
          { hiragana: 'め', katakana: 'メ', romaji: 'me' },
          { hiragana: 'も', katakana: 'モ', romaji: 'mo' },
        ],
        // や行
        [
          { hiragana: 'や', katakana: 'ヤ', romaji: 'ya' },
          { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' },
          { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' },
        ],
        // ら行
        [
          { hiragana: 'ら', katakana: 'ラ', romaji: 'ra' },
          { hiragana: 'り', katakana: 'リ', romaji: 'ri' },
          { hiragana: 'る', katakana: 'ル', romaji: 'ru' },
          { hiragana: 'れ', katakana: 'レ', romaji: 're' },
          { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' },
        ],
        // わ行
        [
          { hiragana: 'わ', katakana: 'ワ', romaji: 'wa' },
          { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' },
        ]
      ]
    },
    dakuon: {
      // 浊音行 (がざだばぱ)
      consonants: [
        // が行
        [
          { hiragana: 'が', katakana: 'ガ', romaji: 'ga' },
          { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi' },
          { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu' },
          { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge' },
          { hiragana: 'ご', katakana: 'ゴ', romaji: 'go' },
        ],
        // ざ行
        [
          { hiragana: 'ざ', katakana: 'ザ', romaji: 'za' },
          { hiragana: 'じ', katakana: 'ジ', romaji: 'ji' },
          { hiragana: 'ず', katakana: 'ズ', romaji: 'zu' },
          { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze' },
          { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo' },
        ],
        // だ行
        [
          { hiragana: 'だ', katakana: 'ダ', romaji: 'da' },
          { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji' },
          { hiragana: 'づ', katakana: 'ヅ', romaji: 'zu' },
          { hiragana: 'で', katakana: 'デ', romaji: 'de' },
          { hiragana: 'ど', katakana: 'ド', romaji: 'do' },
        ],
        // ば行
        [
          { hiragana: 'ば', katakana: 'バ', romaji: 'ba' },
          { hiragana: 'び', katakana: 'ビ', romaji: 'bi' },
          { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu' },
          { hiragana: 'べ', katakana: 'ベ', romaji: 'be' },
          { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo' },
        ],
        // 半浊音行 (ぱ行)
        [
          { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa' },
          { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi' },
        { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu' },
        { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe' },
        { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po' },
        ]
        ]
        },
  youon: {
  // 拗音组合 (きょ、しょ等)
  combinations: [
  // きゃ行
  [
  { hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya' },
  { hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu' },
  { hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo' },
  ],
  // しゃ行
  [
  { hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha' },
  { hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu' },
  { hiragana: 'しょ', katakana: 'ショ', romaji: 'sho' },
  ],
  // ちゃ行
  [
  { hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha' },
  { hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu' },
  { hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho' },
  ],
  // にゃ行
  [
  { hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya' },
  { hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu' },
  { hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo' },
  ],
  // ひゃ行
  [
  { hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya' },
  { hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu' },
  { hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo' },
  ],
  // みゃ行
  [
  { hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya' },
  { hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu' },
  { hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo' },
  ],
  // りゃ行
  [
  { hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya' },
  { hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu' },
  { hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo' },
  ],
  // ぎゃ行
  [
  { hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya' },
  { hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu' },
  { hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo' },
  ],
  // じゃ行（这里じゃ、じゅ、じょ的发音与ちゃ、ちゅ、ちょ相同）
  [
  { hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja' },
  { hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju' },
  { hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo' },
  ],
  // びゃ行
  [
  { hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya' },
  { hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu' },
  { hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo' },
  ],
  // ぴゃ行
  [
  { hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya' },
  { hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu' },
  { hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo' },
  ]
  ]
  }
  };