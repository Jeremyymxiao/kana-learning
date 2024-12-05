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
    targetTypes: ['hiragana'],
    romajiSystem: 'hepburn'
  });

  const handleConvert = async () => {
    setLoading(true);
    try {
      console.log('发送请求数据:', { text: input, options });
      
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: input,
          options 
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('收到响应数据:', data);
      
      if (data.results && Array.isArray(data.results)) {
        setOutputs(data.results);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        console.error('API 响应格式不正确:', data);
        throw new Error('响应格式不正确');
      }
    } catch (error) {
      console.error('转换失败:', error);
      alert('转换失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout currentTab="converter">
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Japanese Text Converter</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Convert between different Japanese writing systems
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Input Section */}
          <Card>
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
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Conversion Options</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="kana"
                      checked={options.targetTypes.includes('hiragana')}
                      onCheckedChange={(checked) => {
                        const newTypes = checked 
                          ? ['hiragana', 'katakana']
                          : options.targetTypes.filter(t => !['hiragana', 'katakana'].includes(t));
                        setOptions({...options, targetTypes: newTypes});
                      }}
                    />
                    <label htmlFor="kana">Hiragana & Katakana</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="romaji"
                      checked={options.targetTypes.includes('romaji')}
                      onCheckedChange={(checked) => {
                        const newTypes = checked 
                          ? [...options.targetTypes.filter(t => !['romaji'].includes(t)), 'romaji']
                          : options.targetTypes.filter(t => t !== 'romaji');
                        setOptions({...options, targetTypes: newTypes});
                      }}
                    />
                    <label htmlFor="romaji">Romaji</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleConvert}
            disabled={loading || !input}
            className="w-full"
          >
            {loading ? 'Converting...' : 'Convert Text'}
          </Button>

          {/* Results Section */}
          {outputs?.length > 0 && (
            <Card>
              <CardContent className="p-6 space-y-4">
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
      </main>
    </MainLayout>
  );
}