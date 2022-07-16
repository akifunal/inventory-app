import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const hello = trpc.proxy.example.hello.useQuery({ text: 'from tRPC' });
	const users = trpc.proxy.example.getAll.useQuery();

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='flex min-h-screen w-screen flex-col items-center justify-center overflow-y-scroll p-4 font-lato'>
				<h2 className='text-[3rem] font-extrabold text-gray-700 md:text-[5rem] lg:text-[5rem]'>
					Create <span className='text-purple-300'>T3</span> App
				</h2>
				<p className='text-2xl text-gray-700'>This stack uses</p>
				<div className='mt-3 grid w-full grid-cols-1 grid-rows-3 items-center justify-center gap-3 pt-3 md:w-full md:grid-cols-2 md:grid-rows-2 lg:w-2/3 lg:grid-cols-2 lg:grid-rows-2'>
					<div className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-gray-500 p-6 text-center shadow-xl duration-500 hover:scale-105'>
						<h2 className='text-lg text-gray-700'>NextJS</h2>
						<p className='text-sm text-gray-600'>
							The React framework for production
						</p>
						<a
							className='mt-3 cursor-pointer text-sm text-violet-500 underline decoration-dotted underline-offset-2'
							href='https://nextjs.org/'
							target='_blank'
							rel='noreferrer'
						>
							Documentation
						</a>
					</div>
					<div className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-gray-500 p-6 text-center shadow-xl duration-500 hover:scale-105'>
						<h2 className='text-lg text-gray-700'>TypeScript</h2>
						<p className='text-sm text-gray-600'>
							Strongly typed programming language that builds on
							JavaScript, giving you better tooling at any scale
						</p>
						<a
							className='mt-3 cursor-pointer text-sm text-violet-500 underline decoration-dotted underline-offset-2'
							href='https://www.typescriptlang.org/'
							target='_blank'
							rel='noreferrer'
						>
							Documentation
						</a>
					</div>
					<div className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-gray-500 p-6 text-center shadow-xl duration-500 hover:scale-105'>
						<h2 className='text-lg text-gray-700'>TailwindCSS</h2>
						<p className='text-sm text-gray-600'>
							Rapidly build modern websites without ever leaving
							your HTML
						</p>
						<a
							className='mt-3 cursor-pointer text-sm text-violet-500 underline decoration-dotted underline-offset-2'
							href='https://tailwindcss.com/'
							target='_blank'
							rel='noreferrer'
						>
							Documentation
						</a>
					</div>
					<div className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-gray-500 p-6 text-center shadow-xl duration-500 hover:scale-105'>
						<h2 className='text-lg text-gray-700'>tRPC</h2>
						<p className='text-sm text-gray-600'>
							End-to-end typesafe APIs made easy
						</p>
						<a
							className='mt-3 cursor-pointer text-sm text-violet-500 underline decoration-dotted underline-offset-2'
							href='https://trpc.io/'
							target='_blank'
							rel='noreferrer'
						>
							Documentation
						</a>
					</div>
				</div>
				<div className='flex w-full items-center justify-center pt-6 text-2xl text-blue-500'>
					{hello.data ? (
						<p>{hello.data.greeting}</p>
					) : (
						<p>Loading..</p>
					)}
					{users.data ? (
						<p>&nbsp;{users.data[0]?.name}</p>
					) : (
						<p>Loading..</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
