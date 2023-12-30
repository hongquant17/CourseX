/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "utfs.io",
            "avatars.githubusercontent.com"
        ]
    },
    reactStrictMode: true, 
    eslint: { 
      ignoreDuringBuilds: true, 
    }, 
}

module.exports = nextConfig
