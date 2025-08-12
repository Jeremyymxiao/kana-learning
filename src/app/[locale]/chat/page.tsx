'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageSquare, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
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
              content: 'You are a professional Japanese language learning assistant. Help users learn Japanese kana and improve their Japanese skills. Always respond in English unless specifically asked to use another language. When users ask about practicing kana or need guidance, please direct them to these features of our website:\n\n- Learning Materials: /learn\n- Practice Quizzes: /quiz\n- Kana Converter: /converter\n- Visual Charts: /chart\n\nPlease provide clear, well-organized responses in English to help users effectively learn Japanese.'
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: userMessage }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // 创建一个新的消息用于流式更新
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              currentMessage += data.content;
              // 更新最后一条消息
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: currentMessage
                };
                return newMessages;
              });
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'An error occurred. Please try again later.'
      }]);
    }
    
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-white dark:bg-[#1A1B2F]">
        {/* 全屏装饰背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 左上角大块 */}
          <div className="absolute top-0 left-0 w-full h-[70%] bg-[#4F46E5] transform -skew-y-6 opacity-10"></div>
          {/* 右侧珊瑚色块 */}
          <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-[#FF6B6B] transform rotate-12 opacity-10"></div>
          {/* 左下角圆形 */}
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#4ADE80] rounded-full opacity-10"></div>
          {/* 右下角装饰 */}
          <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#4F46E5] transform -rotate-12 opacity-10"></div>
          {/* 中间点缀 */}
          <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-[#FF6B6B] rounded-full blur-3xl opacity-5"></div>
        </div>

        {/* 内容区域 */}
        <div className="relative">
          {/* Header Section */}
          <div className="container mx-auto px-4 pt-20 pb-12">
            <header className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] to-[#FF6B6B] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Japanese Learning Assistant</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                Chat with AI to learn Japanese kana and improve your skills
              </p>
              <Button
                onClick={clearHistory}
                variant="outline"
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Chat History
              </Button>
            </header>
          </div>

          {/* Chat Section */}
          <div className="container mx-auto px-4 pb-12">
            <Card className="max-w-3xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-xl">
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
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-[#4F46E5] to-[#FF6B6B] text-white shadow-md'
                              : 'bg-gray-50 dark:bg-gray-800 shadow-sm'
                          }`}
                        >
                          {message.role === 'assistant' ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  a: (props) => (
                                    <a {...props} className="text-[#4F46E5] hover:text-[#FF6B6B] transition-colors" />
                                  ),
                                  ul: (props) => (
                                    <ul {...props} className="list-disc pl-4 my-2" />
                                  ),
                                  li: (props) => (
                                    <li {...props} className="my-1" />
                                  ),
                                  strong: (props) => (
                                    <strong {...props} className="font-semibold" />
                                  ),
                                  p: (props) => (
                                    <p {...props} className="my-2" />
                                  ),
                                }}
                              >
                                {message.content || '▊'}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <div>{message.content}</div>
                          )}
                        </div>
                      </div>
                    ))}
                    {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                      <div className="flex justify-start">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-2 shadow-sm">
                          Waiting for response...
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
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gradient-to-r from-[#4F46E5] to-[#FF6B6B] hover:opacity-90 rounded-xl text-white shadow-md"
                  >
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}