'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gojuonData, getDisplayRomaji, findKana, KanaChar } from "@/data/gojuon";

type Display = 'hiragana' | 'katakana';

interface TableStyles {
  cell: string;
  kanaText: string;
  romajiText: string;
  wrapper: string;
  title: string;
  rowHeader: string;
  colHeader: string;
  emptyCell: string;
}

interface ColumnDef {
  ja: string;
  romaji: string;
}

interface GridRow {
  labelJa: string;
  labelRomaji: string;
  /** 与列一一对应；null 表示该段没有假名，必须留空以保持对齐 */
  cells: (KanaChar | null)[];
}

/** 清音 / 浊音 / 半浊音：あ・い・う・え・お 五段 */
const SEION_COLUMNS: ColumnDef[] = [
  { ja: 'あ', romaji: 'a' },
  { ja: 'い', romaji: 'i' },
  { ja: 'う', romaji: 'u' },
  { ja: 'え', romaji: 'e' },
  { ja: 'お', romaji: 'o' },
];

/** 拗音：ゃ・ゅ・ょ 三段 */
const YOUON_COLUMNS: ColumnDef[] = [
  { ja: 'ゃ', romaji: 'a' },
  { ja: 'ゅ', romaji: 'u' },
  { ja: 'ょ', romaji: 'o' },
];

const SEION_VOWELS = SEION_COLUMNS.map((column) => column.romaji);
const YOUON_VOWELS = YOUON_COLUMNS.map((column) => column.romaji);

/** 从 romaji 的末尾元音反推「段」，空缺自然落 null —— や行/わ行因此能真正空出列 */
const buildGrid = (rows: KanaChar[][], vowels: string[]): GridRow[] =>
  rows.map((chars) => {
    const first = chars[0];
    const cells: (KanaChar | null)[] = vowels.map(() => null);

    for (const char of chars) {
      const vowel = char.romaji.slice(-1).toLowerCase();
      const index = vowels.indexOf(vowel);
      if (index >= 0 && cells[index] === null) cells[index] = char;
    }

    const isVowelRow = first ? first.romaji.length === 1 : false;
    return {
      labelJa: first ? `${first.hiragana}行` : '',
      labelRomaji: first ? (isVowelRow ? '∅' : first.romaji.slice(0, -1)) : '',
      cells,
    };
  });

/** 清音行：五十音 10 行（ん / っ 不在网格内，单独处理） */
const SEION_ROWS: KanaChar[][] = [
  gojuonData.seion.vowels,
  ...gojuonData.seion.consonants.filter((row) => {
    const first = row[0];
    return !!first && first.isStandalone !== false && first.romaji !== 'n';
  }),
];

interface KanaButtonProps {
  char: KanaChar;
  display: Display;
  styles: TableStyles;
  onSpeak: (text: string) => void;
  rowLabel?: string;
  colLabel?: string;
}

/** 单个假名按钮：可键盘聚焦，触屏 romaji 常显，aria-label 带行列定位 */
function KanaButton({ char, display, styles, onSpeak, rowLabel, colLabel }: KanaButtonProps) {
  const kana = display === 'hiragana' ? char.hiragana : char.katakana;
  const displayRomaji = getDisplayRomaji(char);
  const aliases = char.aliases ?? [];
  const romajiLabel = aliases.length > 0
    ? `${displayRomaji} (${aliases.join('/')})`
    : displayRomaji;
  const isStandalone = char.isStandalone !== false;
  const position = [rowLabel, colLabel].filter(Boolean).join(' ');
  const description = isStandalone
    ? `${kana} (${displayRomaji})${position ? `, ${position}` : ''}`
    : `${kana}, sokuon, not a standalone syllable`;

  return (
    <button
      type="button"
      onClick={() => onSpeak(kana)}
      aria-label={`Play pronunciation: ${description}`}
      title={description}
      className={styles.cell}
    >
      <span className="flex flex-col items-center space-y-1">
        <span lang="ja" className={styles.kanaText}>{kana}</span>
        <span className={styles.romajiText}>{romajiLabel}</span>
      </span>
    </button>
  );
}

interface KanaTableProps {
  display: Display;
  rows: GridRow[];
  columns: ColumnDef[];
  styles: TableStyles;
  onSpeak: (text: string) => void;
  caption: string;
  /** ん：独立音节，单独占一行 */
  standalone?: KanaChar | null;
}

function KanaTable({
  display,
  rows,
  columns,
  styles,
  onSpeak,
  caption,
  standalone,
}: KanaTableProps) {
  return (
    <table className="w-full table-fixed border-collapse text-center">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <td aria-hidden="true" className="w-9 sm:w-11" />
          {columns.map((column) => (
            <th key={column.ja} scope="col" className={styles.colHeader}>
              <span lang="ja" className="block">{column.ja}</span>
              <span className="block text-[9px] font-normal text-gray-400">
                {column.romaji}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.labelJa}>
            <th scope="row" className={styles.rowHeader}>
              <span lang="ja" className="block">{row.labelJa}</span>
              <span className="block text-[9px] font-normal text-gray-400">
                {row.labelRomaji}
              </span>
            </th>
            {row.cells.map((char, index) =>
              char ? (
                <td key={`${row.labelJa}-${columns[index].ja}`} className="p-0.5 sm:p-1">
                  <KanaButton
                    char={char}
                    display={display}
                    styles={styles}
                    onSpeak={onSpeak}
                    rowLabel={row.labelJa}
                    colLabel={columns[index].ja}
                  />
                </td>
              ) : (
                // 空缺段：留空单元格，保证 や行/わ行 与上方列对齐
                <td
                  key={`${row.labelJa}-${columns[index].ja}`}
                  aria-hidden="true"
                  className={styles.emptyCell}
                />
              )
            )}
          </tr>
        ))}
        {standalone && (
          <tr>
            <th scope="row" className={styles.rowHeader}>
              <span lang="ja" className="block">ん行</span>
              <span className="block text-[9px] font-normal text-gray-400">n</span>
            </th>
            <td colSpan={columns.length} className="p-0.5 sm:p-1">
              <KanaButton
                char={standalone}
                display={display}
                styles={styles}
                onSpeak={onSpeak}
                rowLabel="ん行"
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export function GojuonTable() {
  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('Speech synthesis failed:', error);
    }
  };

  const tableStyles: TableStyles = {
    // 移动端 romaji 常显，桌面端 hover/focus 时显现
    cell: "group relative block w-full rounded-lg p-1 transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    kanaText: "text-sm sm:text-base md:text-lg lg:text-xl font-japanese transition-transform group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400",
    romajiText: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity",
    wrapper: "relative z-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 sm:p-2 shadow-lg",
    title: "text-center mb-1 sm:mb-2 text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200",
    rowHeader: "w-9 sm:w-11 py-0.5 text-left align-middle font-normal text-gray-600 dark:text-gray-300",
    colHeader: "pb-1 font-normal text-gray-500 dark:text-gray-400",
    emptyCell: "p-0.5 sm:p-1",
  };

  const seionGrid = buildGrid(SEION_ROWS, SEION_VOWELS);
  const dakuonGrid = buildGrid(gojuonData.dakuon.consonants, SEION_VOWELS);
  const youonGrid = buildGrid(gojuonData.youon.combinations, YOUON_VOWELS);

  const nChar = findKana('ん') ?? null;
  const sokuon = findKana('っ');

  return (
    <Card className="relative w-full overflow-hidden bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm border-0 shadow-xl">
      <CardContent className="p-1 sm:p-2">
        <Tabs defaultValue="seion" className="w-full">
          <TabsList className="relative md:sticky top-0 z-50 grid w-full grid-cols-3 gap-0.5 sm:gap-1 md:gap-1.5 mb-2 md:mb-4 bg-gray-100/50 dark:bg-gray-800/50 p-0.5 sm:p-1 rounded-lg text-xs sm:text-sm md:text-base">
            <TabsTrigger
              value="seion"
              className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <span className="font-bold">清音</span>
              <span className="text-[10px] sm:text-xs opacity-90">Seion</span>
            </TabsTrigger>
            <TabsTrigger
              value="dakuon"
              className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <span className="font-bold">濁音</span>
              <span className="text-[10px] sm:text-xs opacity-90">Dakuon</span>
            </TabsTrigger>
            <TabsTrigger
              value="youon"
              className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <span className="font-bold">拗音</span>
              <span className="text-[10px] sm:text-xs opacity-90">Yōon</span>
            </TabsTrigger>
          </TabsList>

          {/* 清音：行 × 段 */}
          <TabsContent value="seion" className="relative z-0 mt-2 sm:mt-4 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-blue-500 dark:text-blue-400`}>Hiragana</h3>
                <KanaTable
                  display="hiragana"
                  rows={seionGrid}
                  columns={SEION_COLUMNS}
                  styles={tableStyles}
                  onSpeak={speak}
                  caption="Hiragana seion chart: rows are kana groups, columns are vowel sounds"
                  standalone={nChar}
                />
              </div>

              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-blue-500 dark:text-blue-400`}>Katakana</h3>
                <KanaTable
                  display="katakana"
                  rows={seionGrid}
                  columns={SEION_COLUMNS}
                  styles={tableStyles}
                  onSpeak={speak}
                  caption="Katakana seion chart: rows are kana groups, columns are vowel sounds"
                  standalone={nChar}
                />
              </div>
            </div>
            {sokuon && (
              <p className="mt-2 px-1 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                <span lang="ja">{sokuon.hiragana} / {sokuon.katakana}</span> (sokuon) doubles the
                following consonant. It is not a standalone syllable, so it is shown here as a
                note rather than in the grid.
              </p>
            )}
          </TabsContent>

          {/* 浊音 / 半浊音：行 × 段 */}
          <TabsContent value="dakuon" className="relative z-0 mt-2 sm:mt-4 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-purple-800 dark:text-purple-300`}>Hiragana</h3>
                <KanaTable
                  display="hiragana"
                  rows={dakuonGrid}
                  columns={SEION_COLUMNS}
                  styles={tableStyles}
                  onSpeak={speak}
                  caption="Hiragana dakuon and handakuon chart, grouped by kana row"
                />
              </div>

              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-purple-800 dark:text-purple-300`}>Katakana</h3>
                <KanaTable
                  display="katakana"
                  rows={dakuonGrid}
                  columns={SEION_COLUMNS}
                  styles={tableStyles}
                  onSpeak={speak}
                  caption="Katakana dakuon and handakuon chart, grouped by kana row"
                />
              </div>
            </div>
          </TabsContent>

          {/* 拗音：行 × 段（ゃ・ゅ・ょ） */}
          <TabsContent value="youon" className="relative z-0 mt-2 sm:mt-4 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-green-800 dark:text-green-300`}>Hiragana</h3>
                <KanaTable
                  display="hiragana"
                  rows={youonGrid}
                  columns={YOUON_COLUMNS}
                  styles={tableStyles}
                  onSpeak={speak}
                  caption="Hiragana yōon chart: rows are consonant groups, columns are ゃ, ゅ and ょ"
                />
              </div>

              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-green-800 dark:text-green-300`}>Katakana</h3>
                <KanaTable
                  display="katakana"
                  rows={youonGrid}
                  columns={YOUON_COLUMNS}
                  styles={tableStyles}
                  onSpeak={speak}
                  caption="Katakana yōon chart: rows are consonant groups, columns are ゃ, ゅ and ょ"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
