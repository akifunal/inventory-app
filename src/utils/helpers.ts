export const getBaseUrl = () => {
	// During client requests browser should use current path
	if (typeof window !== 'undefined') {
		return '';
	}
	if (process.browser) return '';

	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
