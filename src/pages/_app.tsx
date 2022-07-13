import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import superjson from 'superjson';

import { url } from '@/constants';
import type { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from '../server/router';
import '../styles/globals.css';

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider enableSystem={true} attribute='class'>
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	);
};

export default withTRPC<AppRouter>({
	config({ ctx }) {
		return {
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp);
