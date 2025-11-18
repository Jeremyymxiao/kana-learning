/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
    images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'images.unsplash.com'
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Allow ads.txt to be served from public directory
        {
          source: '/ads.txt',
          destination: '/ads.txt',
        },
        // Rewrite root English routes to /en routes
        {
          source: '/hiragana-katakana-converter',
          destination: '/en/hiragana-katakana-converter',
        },
        {
          source: '/hiragana-katakana-quiz',
          destination: '/en/hiragana-katakana-quiz',
        },
        {
          source: '/hiragana-katakana-chart',
          destination: '/en/hiragana-katakana-chart',
        },
        {
          source: '/chat',
          destination: '/en/chat',
        },
        {
          source: '/learn',
          destination: '/en/learn',
        },
        {
          source: '/learn/:slug',
          destination: '/en/learn/:slug',
        },
        {
          source: '/about',
          destination: '/en/about',
        },
        {
          source: '/contact-us',
          destination: '/en/contact-us',
        },
        {
          source: '/privacy-policy',
          destination: '/en/privacy-policy',
        },
        {
          source: '/terms-of-service',
          destination: '/en/terms-of-service',
        },
        {
          source: '/cookie-policy',
          destination: '/en/cookie-policy',
        },
        {
          source: '/auth',
          destination: '/en/auth',
        },
        {
          source: '/login',
          destination: '/en/login',
        },
        {
          source: '/register',
          destination: '/en/register',
        },
        {
          source: '/profile',
          destination: '/en/profile',
        },
        {
          source: '/settings',
          destination: '/en/settings',
        },
      ],
    };
  },
  async redirects() {
    return [
      // Redirect /chart to /hiragana-katakana-chart
      {
        source: '/chart',
        destination: '/hiragana-katakana-chart',
        permanent: true,
      },
      // Redirect locale-specific /chart routes
      {
        source: '/(de|fr|pt|es)/chart',
        destination: '/$1/hiragana-katakana-chart',
        permanent: true,
      },
      // Redirect /learn/katakana-guide to /learn/hiragana-vs-katakana
      {
        source: '/learn/katakana-guide',
        destination: '/learn/hiragana-vs-katakana',
        permanent: true,
      },
      // Redirect locale-specific /learn/katakana-guide routes
      {
        source: '/(de|fr|pt|es)/learn/katakana-guide',
        destination: '/$1/learn/hiragana-vs-katakana',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  // 临时禁用 CSP 配置
  /*
  headers: async () => {
    const cspConfig = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.google.com https://*.googleapis.com https://*.firebaseapp.com https://*.gstatic.com https://*.googletagmanager.com https://*.clarity.ms;
      style-src 'self' 'unsafe-inline' https://*.googleapis.com;
      img-src 'self' data: https: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://*.clarity.ms https://*.bing.com https://*.bing.net;
      font-src 'self' https://*.gstatic.com;
      frame-src 'self' https://*.google.com https://*.firebaseapp.com https://accounts.google.com;
      connect-src 'self' https://*.googleapis.com https://*.google.com https://*.firebaseapp.com https://*.firebaseio.com https://identitytoolkit.googleapis.com wss://*.firebaseio.com https://*.learnkana.pro https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://*.clarity.ms https://*.bing.com https://*.bing.net;
      media-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      upgrade-insecure-requests;
    `;

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Content-Security-Policy',
            value: cspConfig.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  }
  */
};

// 使用 withMDX 包装配置
module.exports = withNextIntl(withMDX(nextConfig)); 