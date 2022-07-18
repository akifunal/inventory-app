/** @type {import('next').NextConfig} */

const { env } = require('./src/server/env');

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	output: 'standalone',
	images: {
		domains: ['avatars.githubusercontent.com', 'static-cdn.jtvnw.net'],
	},
};

module.exports = nextConfig;
