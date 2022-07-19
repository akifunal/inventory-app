import Header from '@/components/Layout/Header';
import { useLinksHandler } from '@/context';
import ProductForm from '@/feature/Product/ProductForm';
import ProductTable from '@/feature/Product/ProductTable';
import { useIsomorphicLayoutEffect } from '@/hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const utils = trpc.useContext();
	const [status, setStatus] = useState('');
	const linksHandler = useLinksHandler();

	const sucessNotify = (message: string) => toast.success(message);
	const errorNotify = (error: string) => toast.error(error);

	const products = trpc.proxy.product.getAll.useQuery();

	const categories = trpc.proxy.category.getAll.useQuery();

	const categoryNames = useMemo(() => {
		if (!categories.data) {
			return [];
		}
		return categories.data.map((category) => category.name);
	}, [categories.data]);

	const { mutateAsync: addProduct } = trpc.proxy.product.create.useMutation({
		async onError(error: any) {
			setStatus('error');

			if (error.message.includes('[\n')) {
				const parsedError = JSON.parse(error.message);
				errorNotify(parsedError[0].message);
				return;
			}

			errorNotify(error.message);
		},

		async onSuccess({ name }) {
			sucessNotify(`${name} added to inventory`);

			// refetches categories after a category is added
			await utils.invalidateQueries('product.getAll');
		},
	});

	const handleAddProduct = async (
		name: string,
		quantity: number,
		categoryName: string
	) => {
		await addProduct({
			name,
			quantity,
			categoryName,
		});
	};

	useIsomorphicLayoutEffect(() => {
		if (linksHandler) linksHandler([true, false]);
	}, [linksHandler]);

	return (
		<>
			<Head>
				<title>Inventory App</title>
			</Head>
			<Header />
			<div className='2xl:container 2xl:mx-auto'>
				<ProductForm
					onAddProduct={handleAddProduct}
					categories={categoryNames}
					status={status}
				/>
				{products?.data && <ProductTable data={products.data} />}
			</div>
		</>
	);
};

export default Home;
