// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['avatars.githubusercontent.com', 'static-cdn.jtvnw.net'],
	},
	// i18n: {
	// 	locales: ['en'],
	// 	defaultLocale: 'en',
	// },
};

if (!!process.env.DOCKER) config.output = 'standalone';

export default config;
