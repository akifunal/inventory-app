import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Login = ({ className }: { className: string }) => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<div className={`${className} flex-row space-x-4`}>
				<p>Validating session ...</p>
			</div>
		);
	}

	if (!session) {
		return (
			<div className={`${className} flex-row space-x-4`}>
				<Link href='/api/auth/signin'>
					<a className='flex h-10 w-24 items-center justify-center space-x-2 rounded-md bg-indigo-700 text-sm font-normal leading-3 text-white duration-150 hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2'>
						Sign In
					</a>
				</Link>
			</div>
		);
	}

	return (
		<div className={`${className} flex-row items-center space-x-4`}>
			<Image
				className='h-10 w-10 rounded-full object-cover'
				src={session?.user?.image as string}
				width={32}
				height={32}
				alt='user avatar'
			/>
			<p className='ml-2 hidden text-left text-xs sm:block'>
				<strong className='block font-medium'>
					{session?.user?.name}
				</strong>
				<span className='text-gray-500'> {session?.user?.email} </span>
			</p>

			<button onClick={() => signOut()}>
				<a className='flex h-10 w-24 items-center justify-center space-x-2 rounded-md bg-indigo-700 text-sm font-normal leading-3 text-white duration-150 hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2'>
					Log out
				</a>
			</button>
		</div>
	);
};

export default Login;
