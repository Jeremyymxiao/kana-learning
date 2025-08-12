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
    const { wrongAnswers } = body;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000);

    try {
      // 构建提示语
      const prompt = `As a friendly Japanese language learning assistant, please help analyze the following mistakes in kana learning:

${wrongAnswers.map((q: any, index: number) => `
${index + 1}. Kana: ${q.kana}
   Correct Answer: ${q.romaji}
   User's Answer: ${q.userAnswer}
`).join('\n')}

Please analyze from the following aspects:
1. Error Analysis: Analyze common patterns and possible reasons for these mistakes
2. Correct Usage: Explain the correct pronunciation and usage scenarios for these kana
3. Memory Tips: Provide practical memorization methods, incorporating examples from daily life
4. Practice Suggestions: Give specific practice recommendations based on these errors

Please respond in a friendly and encouraging tone to help the learner feel supported.`;

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          stream: true,
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

// OPTIONS 请求处理 CORS 预检请求
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://learnkana.pro',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 