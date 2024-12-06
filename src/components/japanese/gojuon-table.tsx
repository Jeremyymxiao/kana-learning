'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gojuonData } from "@/data/gojuon";

export function GojuonTable() {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  const tableStyles = {
    cell: "group relative p-0.5 sm:p-1 md:p-2 cursor-pointer transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg",
    kanaText: "text-sm sm:text-base md:text-lg lg:text-xl font-japanese transition-transform group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400",
    romajiText: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity",
    wrapper: "relative z-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 sm:p-2 shadow-lg",
    title: "text-center mb-1 sm:mb-2 text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200"
  };

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
                        <td 
                          key={char.hiragana}
                          className={tableStyles.cell}
                          onClick={() => speak(char.hiragana)}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <span className={tableStyles.kanaText}>{char.hiragana}</span>
                            <span className={tableStyles.romajiText}>{char.romaji}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* 辅音行 */}
                    {gojuonData.seion.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.hiragana}
                            className={tableStyles.cell}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <span className={tableStyles.kanaText}>{char.hiragana}</span>
                              <span className={tableStyles.romajiText}>{char.romaji}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
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
                        <td 
                          key={char.katakana}
                          className={tableStyles.cell}
                          onClick={() => speak(char.katakana)}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <span className={tableStyles.kanaText}>{char.katakana}</span>
                            <span className={tableStyles.romajiText}>{char.romaji}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* 辅音行 */}
                    {gojuonData.seion.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.katakana}
                            className={tableStyles.cell}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <span className={tableStyles.kanaText}>{char.katakana}</span>
                              <span className={tableStyles.romajiText}>{char.romaji}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
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
                    {gojuonData.dakuon.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.hiragana}
                            className={tableStyles.cell}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <span className={tableStyles.kanaText}>{char.hiragana}</span>
                              <span className={tableStyles.romajiText}>{char.romaji}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* 片假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-purple-800 dark:text-purple-300`}>Katakana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.dakuon.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.katakana}
                            className={tableStyles.cell}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <span className={tableStyles.kanaText}>{char.katakana}</span>
                              <span className={tableStyles.romajiText}>{char.romaji}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
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
                    {gojuonData.youon.combinations.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.hiragana}
                            className={tableStyles.cell}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <span className={tableStyles.kanaText}>{char.hiragana}</span>
                              <span className={tableStyles.romajiText}>{char.romaji}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* 片假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={`${tableStyles.title} text-green-800 dark:text-green-300`}>Katakana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.youon.combinations.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.katakana}
                            className={tableStyles.cell}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <span className={tableStyles.kanaText}>{char.katakana}</span>
                              <span className={tableStyles.romajiText}>{char.romaji}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
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