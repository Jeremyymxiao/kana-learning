'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

interface ConversionOptions {
  sourceType: string;
  targetTypes: string[];
  romajiSystem: 'hepburn';
}

export default function ConverterPage() {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<{type: string; text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ConversionOptions>({
    sourceType: 'kanji',
    targetTypes: ['hiragana', 'katakana'],
    romajiSystem: 'hepburn'
  });

  const handleConvert = async () => {
    if (!input.trim()) {
      alert('请输入要转换的文本');
      return;
    }

    if (options.targetTypes.length === 0) {
      alert('请选择至少一种转换类型');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: input.trim(),
          options 
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      if (data.results && Array.isArray(data.results)) {
        setOutputs(data.results);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('响应格式不正确');
      }
    } catch (error) {
      console.error('转换失败:', error);
      alert(error instanceof Error ? error.message : '转换失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout currentTab="converter">
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* 全屏装饰背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 左上角大块 */}
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#10B981] transform -skew-y-6 opacity-10"></div>
          {/* 右侧色块 */}
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#34D399] transform rotate-12 opacity-10"></div>
          {/* 左下角圆形 */}
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#6EE7B7] rounded-full opacity-10"></div>
          {/* 右下角装饰 */}
          <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#059669] transform -rotate-12 opacity-10"></div>
          {/* 中间点缀 */}
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#A7F3D0] rounded-full blur-3xl opacity-5"></div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-transparent bg-clip-text">
                Japanese Text Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
                Convert between different Japanese writing systems
              </p>
            </header>

            <div className="max-w-3xl mx-auto space-y-6">
              {/* Input Section */}
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100 dark:border-gray-800 shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Select
                        value={options.sourceType}
                        onValueChange={(value) => 
                          setOptions({...options, sourceType: value})
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="选择输入类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hiragana">Hiragana</SelectItem>
                          <SelectItem value="katakana">Katakana</SelectItem>
                          <SelectItem value="kanji">Kanji</SelectItem>
                          <SelectItem value="romaji">Romaji</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter text to convert..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Options Section */}
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100 dark:border-gray-800 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-[#1A1B2F] dark:text-white">Conversion Options</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="kana"
                          checked={options.targetTypes.includes('hiragana') || options.targetTypes.includes('katakana')}
                          onCheckedChange={(checked) => {
                            const newTypes = new Set(options.targetTypes);
                            if (checked) {
                              newTypes.add('hiragana');
                              newTypes.add('katakana');
                            } else {
                              newTypes.delete('hiragana');
                              newTypes.delete('katakana');
                            }
                            setOptions({...options, targetTypes: Array.from(newTypes)});
                          }}
                        />
                        <label htmlFor="kana">Hiragana & Katakana</label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="romaji"
                          checked={options.targetTypes.includes('romaji')}
                          onCheckedChange={(checked) => {
                            const newTypes = new Set(options.targetTypes);
                            if (checked) {
                              newTypes.add('romaji');
                            } else {
                              newTypes.delete('romaji');
                            }
                            setOptions({...options, targetTypes: Array.from(newTypes)});
                          }}
                        />
                        <label htmlFor="romaji">Romaji</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Convert Button */}
              <Button 
                onClick={handleConvert}
                disabled={loading || !input}
                className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:opacity-90 transition-opacity"
              >
                {loading ? 'Converting...' : 'Convert Text'}
              </Button>

              {/* Results Section */}
              {outputs?.length > 0 && (
                <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100 dark:border-gray-800 shadow-xl">
                  <CardContent className="p-6">
                    {outputs.map((output, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{output.type}</h4>
                        <Textarea
                          value={output.text}
                          readOnly
                          rows={2}
                          className="bg-gray-50"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}