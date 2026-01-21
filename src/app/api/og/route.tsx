import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Learn Japanese Kana';
    const type = searchParams.get('type') || 'home';
    const locale = searchParams.get('locale') || 'en';

    // Different gradient colors for different page types
    const gradients = {
      home: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      quiz: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      converter: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      chart: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      chat: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      article: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    };

    const background = gradients[type as keyof typeof gradients] || gradients.home;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1b2f',
            background: background,
            padding: '60px',
          }}
        >
          {/* Logo/Badge area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '12px 30px',
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '2px',
              }}
            >
              LearnKana.pro
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: 72,
                color: 'white',
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </div>

            {/* Subtitle based on type */}
            <div
              style={{
                fontSize: 32,
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500',
              }}
            >
              {type === 'quiz' && '🎯 Interactive Japanese Learning Quiz'}
              {type === 'converter' && '🔄 Hiragana & Katakana Converter'}
              {type === 'chart' && '📊 Complete Kana Reference Chart'}
              {type === 'chat' && '🤖 AI-Powered Japanese Tutor'}
              {type === 'article' && '📚 Japanese Learning Guide'}
              {type === 'home' && '🎌 Master Hiragana & Katakana'}
            </div>
          </div>

          {/* Language indicator if not English */}
          {locale !== 'en' && (
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                padding: '8px 20px',
                fontSize: 20,
                color: 'white',
                fontWeight: '600',
              }}
            >
              {locale.toUpperCase()}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Error generating OG image:', e);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
}
