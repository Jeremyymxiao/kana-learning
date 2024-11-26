'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load history messages from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatHistory');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Save messages to localStorage when updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Add retry mechanism
    const maxRetries = 3;
    let currentTry = 0;

    while (currentTry < maxRetries) {
      try {
        console.log(`Attempt ${currentTry + 1} of ${maxRetries}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // Increase timeout to 60 seconds

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'You are a professional Japanese language learning assistant. Help users learn Japanese kana and improve their Japanese skills. Always respond in English unless specifically asked to use another language. When users ask about practicing kana or need guidance, please direct them to these features of our website:\n\n- Learning Materials: /learn\n- Practice Quizzes: /quiz\n- Kana Converter: /converter\n- Visual Charts: /chart\n\nPlease provide clear, well-organized responses in English to help users effectively learn Japanese.'
              },
              ...messages.map(msg => ({ role: msg.role, content: msg.content })),
              { role: 'user', content: userMessage }
            ],
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId); // Clear timeout if request completes

        if (!response.ok) {
          if (response.status === 504) {
            // If it's a timeout error, try again
            currentTry++;
            if (currentTry === maxRetries) {
              throw new Error('Request timeout. Please try again later.');
            }
            continue;
          }
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response data:', data);

        if (!data.choices?.[0]?.message?.content) {
          console.error('Invalid API response format:', data);
          throw new Error('Invalid API response format');
        }

        const aiResponse: Message = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        
        setMessages(prev => [...prev, aiResponse]);
        break; // If successful, exit retry loop
      } catch (error: any) {
        console.error('Request failed:', error);
        if (error.name === 'AbortError') {
          if (currentTry === maxRetries - 1) {
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: 'Request timed out. Please try sending a shorter message or try again later.'
            }]);
          }
        } else {
          if (currentTry === maxRetries - 1) {
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: 'An error occurred. Please try again later.'
            }]);
          }
        }
        currentTry++;
      }
    }
    setLoading(false);
  };

  return (
    <MainLayout currentTab="chat">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Japanese Learning Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Chat with AI to learn Japanese kana and improve your skills
          </p>
          <Button
            onClick={clearHistory}
            variant="outline"
            className="mt-2"
          >
            Clear Chat History
          </Button>
        </header>

        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <ScrollArea className="h-[500px] pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              a: ({ node, ...props }) => (
                                <a {...props} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul {...props} className="list-disc pl-4 my-2" />
                              ),
                              li: ({ node, ...props }) => (
                                <li {...props} className="my-1" />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong {...props} className="font-semibold" />
                              ),
                              p: ({ node, ...props }) => (
                                <p {...props} className="my-2" />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div>{message.content}</div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                      Replying...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Please input your question here..."
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}