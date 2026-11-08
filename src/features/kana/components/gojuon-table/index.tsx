'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gojuonData, getDisplayRomaji, KanaChar } from "@/data/gojuon";

interface TableStyles {
  cell: string;
  kanaText: string;
  romajiText: string;
  wrapper: string;
  title: string;
}

interface KanaCellProps {
  char: KanaChar;
  display: 'hiragana' | 'katakana';
  styles: TableStyles;
  onSpeak: (text: string) => void;
}

/** 单个假名单元格：可聚焦按钮，触屏可见 romaji，Enter/Space 触发发音 */
function KanaCell({ char, display, styles, onSpeak }: KanaCellProps) {
  const kana = display === 'hiragana' ? char.hiragana : char.katakana;
  const displayRomaji = getDisplayRomaji(char);
  const isStandalone = char.isStandalone !== false;
  const aliases = char.aliases ?? [];
  const romajiLabel = aliases.length > 0
    ? `${displayRomaji} (${aliases.join('/')})`
    : displayRomaji;
  const description = isStandalone
    ? `${kana} (${displayRomaji})`
    : `${kana} — sokuon, not a standalone syllable`;

  return (
    <td className="p-0.5 sm:p-1 md:p-2">
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
    </td>
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
    title: "text-center mb-1 sm:mb-2 text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200"
  };

  const renderRows = (rows: KanaChar[][], display: 'hiragana' | 'katakana') => (
    <>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((char) => (
            <KanaCell
              key={`${display}-${char.hiragana}`}
              char={char}
              display={display}
              styles={tableStyles}
              onSpeak={speak}
            />
          ))}
        </tr>
      ))}
    </>
  );

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

          <TabsContent value="seion" className="relative z-0 mt-2 sm:mt-4 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              {/* 平假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-blue-500 dark:text-blue-400`}>Hiragana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {/* 元音行 */}
                    <tr>
                      {gojuonData.seion.vowels.map((char) => (
                        <KanaCell
                          key={`hiragana-${char.hiragana}`}
                          char={char}
                          display="hiragana"
                          styles={tableStyles}
                          onSpeak={speak}
                        />
                      ))}
                    </tr>
                    {/* 辅音行 */}
                    {renderRows(gojuonData.seion.consonants, 'hiragana')}
                  </tbody>
                </table>
              </div>

              {/* 片假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-blue-500 dark:text-blue-400`}>Katakana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {/* 元音行 */}
                    <tr>
                      {gojuonData.seion.vowels.map((char) => (
                        <KanaCell
                          key={`katakana-${char.katakana}`}
                          char={char}
                          display="katakana"
                          styles={tableStyles}
                          onSpeak={speak}
                        />
                      ))}
                    </tr>
                    {/* 辅音行 */}
                    {renderRows(gojuonData.seion.consonants, 'katakana')}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* 浊音内容 */}
          <TabsContent value="dakuon" className="relative z-0 mt-2 sm:mt-4 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              {/* 平假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-purple-800 dark:text-purple-300`}>Hiragana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {renderRows(gojuonData.dakuon.consonants, 'hiragana')}
                  </tbody>
                </table>
              </div>

              {/* 片假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-purple-800 dark:text-purple-300`}>Katakana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {renderRows(gojuonData.dakuon.consonants, 'katakana')}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* 拗音内容 */}
          <TabsContent value="youon" className="relative z-0 mt-2 sm:mt-4 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              {/* 平假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-green-800 dark:text-green-300`}>Hiragana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {renderRows(gojuonData.youon.combinations, 'hiragana')}
                  </tbody>
                </table>
              </div>

              {/* 片假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-green-800 dark:text-green-300`}>Katakana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {renderRows(gojuonData.youon.combinations, 'katakana')}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
