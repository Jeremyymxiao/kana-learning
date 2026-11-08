// src/data/gojuon.ts
// 五十音数据：全站唯一数据源（图表 + 四种练习池都从这里取）

/** 单个假名条目 */
export interface KanaChar {
  hiragana: string;
  katakana: string;
  romaji: string;
  /** 图表展示用的替代 romaji（促音 っ 显示 —） */
  displayRomaji?: string;
  /** false = 不是独立音节（促音 っ/ッ），不进入任何练习池 */
  isStandalone?: boolean;
  /** 常用替代拼写（ぢ → di），用于判分与图表小字 */
  aliases?: string[];
  /** 明确排除在练习池之外（ぢ/づ 与 じ/ず 同音，选项会重复） */
  quizExcluded?: boolean;
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
      ],
      // ん
      [
        { hiragana: 'ん', katakana: 'ン', romaji: 'n' },
      ],
      // っ (促音) —— 不是独立音节：不参与考核，图表只作对照
      [
        {
          hiragana: 'っ',
          katakana: 'ッ',
          romaji: 'tsu',
          displayRomaji: '—',
          isStandalone: false,
        },
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
      // だ行（ぢ/づ 主标 Hepburn ji/zu，兼收 di/du；与 じ/ず 同音，不参与考核）
      [
        { hiragana: 'だ', katakana: 'ダ', romaji: 'da' },
        { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji', aliases: ['di'], quizExcluded: true },
        { hiragana: 'づ', katakana: 'ヅ', romaji: 'zu', aliases: ['du'], quizExcluded: true },
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
      // じゃ行
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

/** 练习用的假名组（与 quiz 的 KanaType 结构一致） */
export type KanaGroup = 'hiragana' | 'katakana' | 'mixed' | 'special' | 'all';

/** 练习池里的一个假名（kana 已按组选好平/片假名） */
export interface QuizKana {
  kana: string;
  romaji: string;
  aliases: string[];
  hiragana: string;
  katakana: string;
}

const SEION = [
  ...gojuonData.seion.vowels,
  ...gojuonData.seion.consonants.flat(),
];
const DAKUON = gojuonData.dakuon.consonants.flat();
const YOUON = gojuonData.youon.combinations.flat();

/** 全部假名（含图表用的促音） */
export const KANA_POOL: KanaChar[] = [...SEION, ...DAKUON, ...YOUON];

/** 可进入练习池的假名：排除促音与同音歧义项（ぢ/づ） */
export const QUIZ_KANA_POOL: KanaChar[] = KANA_POOL.filter(
  (kana) => kana.isStandalone !== false && !kana.quizExcluded
);

/** 根据组选择展示字符 */
export const pickKanaChar = (kana: KanaChar, group: KanaGroup): string => {
  if (group === 'katakana') return kana.katakana;
  if (group === 'mixed') return Math.random() < 0.5 ? kana.hiragana : kana.katakana;
  return kana.hiragana;
};

/**
 * 四种题型统一的取池函数。
 * - hiragana / katakana / mixed：清音
 * - special：浊音 + 拗音
 * - all：全部
 * 任何情况下都不含 っ/ッ（非独立音节）与 ぢ/づ（与 じ/ず 同音）。
 */
export const getQuizKana = (group: KanaGroup): QuizKana[] => {
  const source =
    group === 'special'
      ? [...DAKUON, ...YOUON]
      : group === 'all'
        ? [...SEION, ...DAKUON, ...YOUON]
        : SEION;

  return source
    .filter((kana) => kana.isStandalone !== false && !kana.quizExcluded)
    .map((kana) => ({
      kana: pickKanaChar(kana, group),
      romaji: kana.romaji,
      aliases: kana.aliases ?? [],
      hiragana: kana.hiragana,
      katakana: kana.katakana,
    }));
};

/** 按平/片假名反查数据 */
export const findKana = (kana: string): KanaChar | undefined =>
  KANA_POOL.find((item) => item.hiragana === kana || item.katakana === kana);

/** 图表展示的 romaji（促音显示 —） */
export const getDisplayRomaji = (kana: KanaChar): string =>
  kana.displayRomaji ?? kana.romaji;

export const kanaToRomaji = (kana: string): string | undefined => findKana(kana)?.romaji;

/** 归一化：去空白、小写、去掉长音符号与连字符 */
export const normalizeRomaji = (input: string): string =>
  input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');

/** 长音变体：ou / oo / ō / - 视为同一读音 */
const romajiVariants = (input: string): string[] => {
  const base = normalizeRomaji(input);
  if (!base) return [];
  const variants = new Set<string>([base]);
  variants.add(base.replace(/ou/g, 'o').replace(/oo/g, 'o'));
  if (base.endsWith('o')) {
    variants.add(`${base}u`);
    variants.add(`${base}o`);
  }
  return [...variants].filter(Boolean);
};

/** 拼写题判分：忽略大小写/空白，接受 aliases 与长音常见变体 */
export const isRomajiMatch = (
  answer: string,
  expected: string,
  aliases: string[] = []
): boolean => {
  const accepted = [expected, ...aliases].flatMap(romajiVariants);
  const given = new Set(romajiVariants(answer));
  return accepted.some((variant) => given.has(variant));
};
