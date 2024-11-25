'use client';

import { useState } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a professional Japanese language learning assistant. Help users learn Japanese kana and improve their Japanese skills. When users ask about practicing kana, games, quizzes, or kana conversion, please guide them to use the following features of our website:\n\n- Games: /games\n- Quizzes: /quiz\n- Kana Converter: /converter\n- Kana Tables: /table\n\nPlease provide clear and easy-to-understand responses.'
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: userMessage }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('API Request Error');
      }

      const data = await response.json();
      const aiResponse: Message = {
        role: 'assistant',
        content: data.choices[0].message.content || 'Sorry, I can not answer the question right now.'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout currentTab="chat">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Japanese Learning Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Chat with AI to learn Japanese kana and improve your skills
          </p>
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
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                      Repling...
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
                发送
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}