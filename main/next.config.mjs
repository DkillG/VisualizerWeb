/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				pathname: '/**',
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			},
		],
	},
};

export default nextConfig;
