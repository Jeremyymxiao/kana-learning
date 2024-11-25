'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gojuonData } from "@/data/gojuon";

export function GojuonTable() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  const tableStyles = {
    cell: "group relative p-2 md:p-3 cursor-pointer transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg",
    kanaText: "text-lg md:text-xl lg:text-2xl font-japanese transition-transform group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400",
    romajiText: "text-xs md:text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity",
    wrapper: "relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg",
    title: "text-center mb-6 text-xl font-bold text-gray-800 dark:text-gray-200"
  };

  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="text-2xl font-bold text-center">五十音図 Gojūon</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <Tabs defaultValue="seion" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 mb-6 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-lg">
            <TabsTrigger 
              value="seion" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300"
            >
              清音 Seion
            </TabsTrigger>
            <TabsTrigger 
              value="dakuon" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
            >
              濁音・半濁音 Dakuten・Handakuten
            </TabsTrigger>
            <TabsTrigger 
              value="youon" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all duration-300"
            >
              拗音 Yōon
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seion">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={tableStyles.title}>Hiragana</h3>
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
                <h3 className={tableStyles.title}>Katakana</h3>
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
          <TabsContent value="dakuon">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={tableStyles.title}>Hiragana</h3>
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
                <h3 className={tableStyles.title}>Katakana</h3>
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
          <TabsContent value="youon">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div className={tableStyles.wrapper}>
                <h3 className={tableStyles.title}>Hiragana</h3>
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
                <h3 className={tableStyles.title}>Katakana</h3>
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