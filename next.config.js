/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/chart',
        destination: '/hiragana-katakana-chart',
        permanent: true,
      },
      {
        source: '/quiz',
        destination: '/hiragana-katakana-quiz',
        permanent: true,
      },
      {
        source: '/converter',
        destination: '/hiragana-katakana-converter',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.dat\.gz$/,
      use: 'file-loader',
    });
    return config;
  },
}

module.exports = nextConfig 