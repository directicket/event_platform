/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io', 'x8ismcy6r4.ufs.sh', 'api.qrserver.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'x8ismcy6r4.ufs.sh',
                port: ''
            }
        ]
    }
};

export default nextConfig;
