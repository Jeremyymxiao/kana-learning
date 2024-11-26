import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const headers = {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://learnkana.pro',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const body = await request.json();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000);

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: body.messages,
          temperature: 0.7,
          stream: true, // 启用流式响应
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API response error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const stream = new TransformStream({
        async transform(chunk, controller) {
          const text = decoder.decode(chunk);
          const lines = text.split('\n');
          const parsedLines = lines
            .map(line => line.replace(/^data: /, '').trim())
            .filter(line => line !== '' && line !== '[DONE]')
            .map(line => {
              try {
                return JSON.parse(line);
              } catch {
                return undefined;
              }
            })
            .filter(line => line);

          for (const parsedLine of parsedLines) {
            const content = parsedLine.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
        }
      });

      return new Response(response.body?.pipeThrough(stream), {
        headers: {
          ...headers,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('API error:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: '请求超时，请稍后重试' },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { error: '处理请求时出错，请稍后重试' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
}