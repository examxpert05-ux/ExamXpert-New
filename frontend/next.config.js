/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
