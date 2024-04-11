/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/parkrunclub",
                permanent: false
            },
        ]
    },
};

module.exports = nextConfig
