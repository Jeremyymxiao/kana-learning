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
    
    console.log('Sending request to Deepseek API with headers:', {
      ...headers,
      'Authorization': 'Bearer [HIDDEN]'
    });

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: body.messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Deepseek API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Deepseek API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500, headers }
    );
  }
}