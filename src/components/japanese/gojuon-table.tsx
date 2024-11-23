'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gojuonData } from "@/data/gojuon";

export function GojuonTable() {
  const [, setHoveredCell] = useState<string | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <Tabs defaultValue="seion" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            <TabsTrigger 
              value="seion" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              Seion
            </TabsTrigger>
            <TabsTrigger 
              value="dakuon" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              Dakuten/Handakuten
            </TabsTrigger>
            <TabsTrigger 
              value="youon" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              Youon
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seion">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="min-w-[320px] p-2">
                  <h3 className="text-center mb-4 font-bold">Hiragana</h3>
                  <table className="w-full text-center">
                    <tbody>
                      {/* 元音行 */}
                      <tr>
                        {gojuonData.seion.vowels.map((char) => (
                          <td 
                            key={char.hiragana}
                            className="p-1.5 sm:p-3 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.hiragana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-sm sm:text-base lg:text-lg">{char.hiragana}</span>
                              <span className="text-[8px] sm:text-xs text-gray-500">{char.romaji}</span>
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
                              className="p-1.5 sm:p-3 hover:bg-gray-100 cursor-pointer"
                              onMouseEnter={() => setHoveredCell(char.hiragana)}
                              onMouseLeave={() => setHoveredCell(null)}
                              onClick={() => speak(char.hiragana)}
                            >
                              <div className="flex flex-col items-center">
                                <span className="text-sm sm:text-base lg:text-lg">{char.hiragana}</span>
                                <span className="text-[8px] sm:text-xs text-gray-500">{char.romaji}</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* 片假名部分 */}
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="min-w-[320px] p-2">
                  <h3 className="text-center mb-4 font-bold">Katakana</h3>
                  <table className="w-full text-center">
                    <tbody>
                      {/* 元音行 */}
                      <tr>
                        {gojuonData.seion.vowels.map((char) => (
                          <td 
                            key={char.katakana}
                            className="p-1.5 sm:p-3 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.katakana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-sm sm:text-base lg:text-lg">{char.katakana}</span>
                              <span className="text-[8px] sm:text-xs text-gray-500">{char.romaji}</span>
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
                              className="p-1.5 sm:p-3 hover:bg-gray-100 cursor-pointer"
                              onMouseEnter={() => setHoveredCell(char.katakana)}
                              onMouseLeave={() => setHoveredCell(null)}
                              onClick={() => speak(char.katakana)}
                            >
                              <div className="flex flex-col items-center">
                                <span className="text-sm sm:text-base lg:text-lg">{char.katakana}</span>
                                <span className="text-[8px] sm:text-xs text-gray-500">{char.romaji}</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
          {/* 浊音内容 */}
          <TabsContent value="dakuon">
            <div className="grid grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div>
                <h3 className="text-center mb-4 font-bold">Hiragana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.dakuon.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.hiragana}
                            className="p-2 md:p-3 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.hiragana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-base md:text-lg">{char.hiragana}</span>
                              <span className="text-[10px] md:text-xs text-gray-500">{char.romaji}</span>
                             </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* 片假名部分 */}
              <div>
                <h3 className="text-center mb-4 font-bold">Katakana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.dakuon.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.katakana}
                            className="p-2 md:p-3 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.katakana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-base md:text-lg">{char.katakana}</span>
                              <span className="text-[10px] md:text-xs text-gray-500">{char.romaji}</span>
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
            <div className="grid grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div>
                <h3 className="text-center mb-4 font-bold">Hiragana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.youon.combinations.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.hiragana}
                            className="p-2 md:p-3 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.hiragana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-base md:text-lg">{char.hiragana}</span>
                              <span className="text-[10px] md:text-xs text-gray-500">{char.romaji}</span>
                             </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* 片假名部分 */}
              <div>
                <h3 className="text-center mb-4 font-bold">Katakana</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.youon.combinations.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.katakana}
                            className="p-2 md:p-3 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.katakana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-base md:text-lg">{char.katakana}</span>
                              <span className="text-[10px] md:text-xs text-gray-500">{char.romaji}</span>
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