import { trpc } from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import type { AppType } from 'next/dist/shared/lib/utils';
import '../styles/globals.css';

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider enableSystem={true} attribute='class'>
				<Component {...pageProps} />
				<Toaster />
			</ThemeProvider>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
