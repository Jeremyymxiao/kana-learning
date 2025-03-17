/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = {
  reactStrictMode: true,
  analytics: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'images.unsplash.com'
    ],
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
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.google.com https://*.googleapis.com https://*.firebaseapp.com https://*.gstatic.com https://*.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://*.googleapis.com;
      img-src 'self' data: https: blob: https://*.google-analytics.com https://*.googletagmanager.com;
      font-src 'self' https://*.gstatic.com;
      frame-src 'self' https://*.google.com https://*.firebaseapp.com https://accounts.google.com;
      connect-src 'self' https://*.googleapis.com https://*.google.com https://*.firebaseapp.com https://*.firebaseio.com https://identitytoolkit.googleapis.com wss://*.firebaseio.com https://*.learnkana.pro https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
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
module.exports = withMDX(nextConfig); 