import { trpc } from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import type { AppType } from 'next/dist/shared/lib/utils';
import '../styles/globals.css';
import LinksContextProvider from '@/context';

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider enableSystem={false} attribute='class'>
				<LinksContextProvider>
					<Component {...pageProps} />
				</LinksContextProvider>
				<Toaster
					position='top-right'
					reverseOrder={true}
					containerStyle={{
						top: 100,
						left: 20,
						bottom: 20,
						right: 20,
					}}
				/>
			</ThemeProvider>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
