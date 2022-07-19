import Login from '@/components/Layout/Login';
import { useLinks } from '@/context';
import { useIsomorphicLayoutEffect } from '@/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type HeaderProps = {
	defaultLinkStatuses?: Boolean[];
};

const Header = ({ defaultLinkStatuses }: HeaderProps) => {
	const linkStatuses = useLinks();
	const router = useRouter();

	const [show, setshow] = useState(false);
	const [style, setStyle] = useState(defaultLinkStatuses);

	const [dropDown, setDropDown] = useState(true);
	const [text, setText] = useState('');

	const selected = (index: number) => {
		let newArr = [...linkStatuses];
		for (let i = 0; i < newArr.length; i++) {
			newArr[i] = false;
		}
		newArr[index] = true;
		setStyle(newArr);
	};

	const setSelectedText = (txt: string) => {
		setText(txt);
		setDropDown(true);
	};

	useIsomorphicLayoutEffect(() => {
		if (linkStatuses) {
			setStyle(linkStatuses);
		}

		if (router?.pathname === '/') {
			setSelectedText('Products');
		}
		if (router?.pathname === '/categories') {
			setSelectedText('Categories');
		}
	}, [linkStatuses, router?.pathname]);

	return (
		<div className=' rounded bg-white shadow-lg'>
			<nav className='py-5 px-4 md:py-6 md:px-7 2xl:container 2xl:mx-auto'>
				{/* For large and Medium-sized Screen */}
				<div className='flex justify-between '>
					<div className='hidden flex-row items-center space-x-6 md:flex'></div>
					<div className=' flex items-center space-x-3 pr-6 lg:pr-16'>
						<svg
							width={34}
							height={34}
							viewBox='0 0 34 34'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z'
								fill='#1F2937'
							/>
						</svg>
						<h1 className=' text-2xl font-normal leading-6 text-gray-800'>
							Intentory APP
						</h1>
					</div>
					<ul className='hidden flex-auto space-x-2 md:flex'>
						<li
							onClick={() => {
								selected(0);
							}}
							className={`${
								style?.[0]
									? 'bg-indigo-600 text-white'
									: 'border border-white bg-gray-50 text-gray-600'
							} flex cursor-pointer items-center rounded text-xs font-normal leading-3 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2`}
						>
							<Link href='/'>
								<a className='inline-flex h-full items-center px-3 py-2.5'>
									Products
								</a>
							</Link>
						</li>
						<li
							data-testid='categories-desktop'
							onClick={() => selected(1)}
							className={`${
								style?.[1]
									? 'bg-indigo-600 text-white'
									: 'border border-white bg-gray-50 text-gray-600'
							} flex cursor-pointer items-center rounded text-xs font-normal leading-3 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2`}
						>
							<Link href='/categories'>
								<a className='inline-flex h-full items-center px-3 py-2.5'>
									Categories
								</a>
							</Link>
						</li>
					</ul>
					<Login className='hidden md:flex' />
					{/* Burger Icon */}
					<div
						id='bgIcon'
						onClick={() => setshow(!show)}
						className={`cursor-pointer items-center justify-center focus:outline-none  focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 md:hidden`}
					>
						<svg
							className={`${show ? 'hidden' : ''}`}
							width={24}
							height={24}
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								className=' transform duration-150'
								d='M4 6H20'
								stroke='#1F2937'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M4 12H20'
								stroke='#1F2937'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								className=' transform duration-150'
								d='M4 18H20'
								stroke='#1F2937'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<svg
							className={`${show ? 'block' : 'hidden'}`}
							width={24}
							height={24}
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M18 6L6 18'
								stroke='#1F2937'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M6 6L18 18'
								stroke='#1F2937'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</div>
				{/* Mobile and small-screen devices (toggle Menu) */}
				<div
					id='MobileNavigation'
					className={`${
						show ? 'block' : 'hidden'
					} mx-auto mt-4 md:hidden`}
				>
					<Login className='mt-2 flex flex-row justify-end gap-4' />

					<div className='mt-5 block w-full md:hidden '>
						<div
							onClick={() => setDropDown(!dropDown)}
							className='flex w-full cursor-pointer items-center justify-between rounded bg-indigo-600 px-4 py-3 text-white'
						>
							<div className='flex space-x-2'>
								<p
									data-testid='textClicked'
									className='cursor-pointer text-sm font-normal leading-3 duration-100 hover:bg-gray-800 focus:outline-none '
								>
									{text ? text : 'Products'}
								</p>
							</div>
							<svg
								id='ArrowSVG'
								className={`${
									dropDown ? '' : 'rotate-180'
								} transform duration-100`}
								width={24}
								height={24}
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M6 9L12 15L18 9'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
						<div className=' relative'>
							<ul
								id='list'
								className={`${
									dropDown ? 'hidden' : 'block'
								} absolute top-2 w-full rounded text-base  font-normal leading-4 shadow-md`}
							>
								<li
									onClick={() => setSelectedText('Products')}
									className='cursor-pointer border border-gray-50 bg-gray-50 text-xs font-normal leading-3 text-gray-600 duration-100 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
								>
									<Link href='/'>
										<a className='inline-flex h-full w-full items-center px-4 py-3'>
											Products
										</a>
									</Link>
								</li>
								<li
									data-testid='categories'
									onClick={() =>
										setSelectedText('Categories')
									}
									className='cursor-pointer border border-gray-50 bg-gray-50 text-xs font-normal leading-3 text-gray-600 duration-100 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
								>
									<Link href='/categories'>
										<a className='inline-flex h-full w-full items-center px-4 py-3'>
											Categories
										</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
