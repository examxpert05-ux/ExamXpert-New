/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add the database folder to the resolve modules
        config.resolve.modules.push(require('path').resolve(__dirname, '../database'))

        return config
    },

    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // Enable SWC minification for better performance
    swcMinify: true,
    // Optimize fonts
    optimizeFonts: true,
}

module.exports = nextConfig
