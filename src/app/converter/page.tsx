'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function ConverterPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input })
      });
      const data = await response.json();
      setOutput(data.result);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'gojuon') {
      router.push('/');
    } else if (tab === 'test') {
      router.push('/test');
    }
  };

  return (
    <MainLayout 
      currentTab="converter"
      onTabChange={handleTabChange}
    >
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Kanji to Hiragana Converter</h1>
        <div className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入汉字..."
            rows={4}
          />
          <Button 
            onClick={handleConvert}
            disabled={loading || !input}
            className="w-full"
          >
            {loading ? 'Converting...' : 'Convert'}
          </Button>
          {output && (
            <Textarea
              value={output}
              readOnly
              rows={4}
              className="bg-gray-50"
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}