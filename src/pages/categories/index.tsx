import Header from '@/components/Layout/Header';
import { useLinksHandler } from '@/context';
import CategoryForm from '@/feature/Category/CategoryForm';
import CategoryTable from '@/feature/Category/CategoryTable';
import { useIsomorphicLayoutEffect } from '@/hooks';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const Categories: NextPage = () => {
	const utils = trpc.useContext();
	const [status, setStatus] = useState('');
	const linksHandler = useLinksHandler();

	const sucessNotify = (message: string) => toast.success(message);
	const errorNotify = (error: string) => toast.error(error);

	const categories = trpc.proxy.category.getAll.useQuery();

	const categoryNames = useMemo(() => {
		if (!categories.data) {
			return [];
		}
		return categories.data.map((category) => category.name);
	}, [categories.data]);

	const { mutateAsync: addCategory } = trpc.proxy.category.create.useMutation(
		{
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
				sucessNotify(`${name} category added`);

				// refetches categories after a category is added
				await utils.invalidateQueries('category.getAll');
			},
		}
	);

	const handleAddCategory = async (categoryName: string) => {
		await addCategory({
			name: categoryName,
		});
	};

	useIsomorphicLayoutEffect(() => {
		if (linksHandler) linksHandler([false, true]);
	}, [linksHandler]);

	return (
		<>
			<Head>
				<title>Inventory App</title>
			</Head>
			<Header />
			<div className='2xl:container 2xl:mx-auto'>
				<CategoryForm
					onAddCategory={handleAddCategory}
					categories={categoryNames}
					status={status}
				/>
				{categories?.data && <CategoryTable data={categories.data} />}
			</div>
		</>
	);
};

export default Categories;
