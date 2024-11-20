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
      <main
        className="container mx-auto px-4 py-8"
        role="main"
        aria-labelledby="converter-title"
      >
        <header className="mb-8">
          <h1 
            id="converter-title"
            className="text-3xl font-bold text-center"
          >
            Japanese Text Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            Convert Japanese text between different writing systems
          </p>
        </header>

        <section 
          aria-label="Conversion Tool"
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-4">
            <div role="form" aria-label="Text conversion form">
              <label htmlFor="input-text" className="sr-only">
                Input Japanese text
              </label>
              <Textarea
                id="input-text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Japanese text..."
                rows={4}
                aria-label="Input text area"
              />
              <Button 
                onClick={handleConvert}
                disabled={loading || !input}
                className="w-full mt-4"
                aria-busy={loading}
              >
                {loading ? 'Converting...' : 'Convert Text'}
              </Button>
            </div>

            {output && (
              <div role="region" aria-label="Conversion result">
                <label htmlFor="output-text" className="sr-only">
                  Converted text
                </label>
                <Textarea
                  id="output-text"
                  value={output}
                  readOnly
                  rows={4}
                  className="bg-gray-50"
                  aria-label="Converted text output"
                />
              </div>
            )}
          </div>
        </section>

        <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>Click the convert button to transform your text</p>
        </footer>
      </main>
    </MainLayout>
  );
}