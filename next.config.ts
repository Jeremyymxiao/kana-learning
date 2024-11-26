/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

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
              img-src 'self' data: blob:;
              font-src 'self';
              connect-src 'self' https://api.deepseek.com;
            `.replace(/\s{2,}/g, ' ').trim()
          },
          // 添加 Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
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
  },

  // webpack 配置
  webpack: (config: any) => {
    // 现有的静态资源处理
    config.module.rules.push({
      test: /\.(woffcss)$/,
      type: 'asset/resource',
    });

    // 添加 Markdown 处理
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
};

// 使用 withMDX 包装配置
module.exports = withMDX(nextConfig);