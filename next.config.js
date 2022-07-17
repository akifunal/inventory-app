/** @type {import('next').NextConfig} */

const { env } = require('./src/server/env');

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	output: 'standalone',
};

module.exports = nextConfig;
