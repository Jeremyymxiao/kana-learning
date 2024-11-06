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

  return (
    <Card>
      <CardHeader>
        <CardTitle>五十音图</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="seion" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="seion" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              清音
            </TabsTrigger>
            <TabsTrigger 
              value="dakuon" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              浊音/半浊音
            </TabsTrigger>
            <TabsTrigger 
              value="youon" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              拗音
            </TabsTrigger>
          </TabsList>

          {/* 清音内容 */}
          <TabsContent value="seion">
            <div className="grid grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div>
                <h3 className="text-center mb-4 font-bold">平假名</h3>
                <table className="w-full text-center">
                  <tbody>
                    {/* 元音行 */}
                    <tr>
                      {gojuonData.seion.vowels.map((char) => (
                        <td 
                          key={char.hiragana}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onMouseEnter={() => setHoveredCell(char.hiragana)}
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => speak(char.hiragana)}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-lg">{char.hiragana}</span>
                            <span className="text-xs text-gray-500">{char.romaji}</span>
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
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.hiragana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-lg">{char.hiragana}</span>
                              <span className="text-xs text-gray-500">{char.romaji}</span>
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
                <h3 className="text-center mb-4 font-bold">片假名</h3>
                <table className="w-full text-center">
                  <tbody>
                    {/* 元音行 */}
                    <tr>
                      {gojuonData.seion.vowels.map((char) => (
                        <td 
                          key={char.katakana}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onMouseEnter={() => setHoveredCell(char.katakana)}
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => speak(char.katakana)}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-lg">{char.katakana}</span>
                            <span className="text-xs text-gray-500">{char.romaji}</span>
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
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.katakana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-lg">{char.katakana}</span>
                              <span className="text-xs text-gray-500">{char.romaji}</span>
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
            <div className="grid grid-cols-2 gap-8">
              {/* 平假名部分 */}
              <div>
                <h3 className="text-center mb-4 font-bold">平假名</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.dakuon.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.hiragana}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.hiragana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-lg">{char.hiragana}</span>
                              <span className="text-xs text-gray-500">{char.romaji}</span>
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
                <h3 className="text-center mb-4 font-bold">片假名</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.dakuon.consonants.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.katakana}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.katakana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-lg">{char.katakana}</span>
                              <span className="text-xs text-gray-500">{char.romaji}</span>
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
                <h3 className="text-center mb-4 font-bold">平假名</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.youon.combinations.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.hiragana}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.hiragana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.hiragana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-lg">{char.hiragana}</span>
                              <span className="text-xs text-gray-500">{char.romaji}</span>
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
                <h3 className="text-center mb-4 font-bold">片假名</h3>
                <table className="w-full text-center">
                  <tbody>
                    {gojuonData.youon.combinations.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((char) => (
                          <td 
                            key={char.katakana}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() => setHoveredCell(char.katakana)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => speak(char.katakana)}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-lg">{char.katakana}</span>
                              <span className="text-xs text-gray-500">{char.romaji}</span>
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