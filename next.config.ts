/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
import { Configuration } from 'webpack';
import { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  
  // 环境变量配置
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    YOUDAO_APP_KEY: process.env.YOUDAO_APP_KEY,
    YOUDAO_APP_SECRET: process.env.YOUDAO_APP_SECRET,
  },

  // 页面扩展名配置
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // 安全头配置
  headers: async () => {
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
          // 添加 Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              connect-src 'self' https://api.deepseek.com;
            `.replace(/\s+/g, ' ').trim(),
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
  },

  // 添加跨域配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // 启用实验性功能以支持 TypeScript
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '10mb',
      timeout: 60000, // 60 seconds
    },
  },

  // webpack 配置
  webpack: (config: Configuration) => {
    // 现有的静态资源处理
    config.module!.rules!.push({
      test: /\.(woffcss)$/,
      type: 'asset/resource',
    });

    // 添加 Markdown 处理
    config.module!.rules!.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    config.plugins!.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_PUBLIC_APP_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    );

    return config;
  },
};

// 使用 withMDX 包装配置
module.exports = withMDX(nextConfig);