/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Enable SWC minification
  swcMinify: true,
  // Optimize bundle analyzer
  webpack: (config, { dev, isServer }) => {
    // Enable tree shaking
    config.optimization.usedExports = true;
    
    // Code splitting optimization
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Animation libraries chunk
          animations: {
            name: 'animations',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](framer-motion|@framer|lottie)[\\/]/,
            priority: 30,
          },
        },
      };
    }
    
    return config;
  },
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: true,
  // Enable static optimization
  trailingSlash: false,
}

export default nextConfig
