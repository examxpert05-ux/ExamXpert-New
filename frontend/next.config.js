/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add the database folder to the resolve modules
        config.resolve.modules.push(require('path').resolve(__dirname, '../database'))

        // Exclude API routes from static build (they don't work on GitHub Pages)
        if (!dev && !isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@/app/api': false,
            }
        }

        return config
    },
}

module.exports = nextConfig
