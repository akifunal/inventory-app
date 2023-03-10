import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap'
					rel='stylesheet'
				/>
				<meta name='description' content='Intentory App' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
