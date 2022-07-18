import Form from '@/components/Form';
import InputWithLabel from '@/components/UI/InputWithLabel';
import Select from '@/components/UI/Select';
import { useState } from 'react';

type ProductFormProps = {
	onAddProduct?: (
		name: string,
		quantity: number,
		categoryName: string
	) => void;
	categories?: string[];
	status?: string;
};

const ProductForm = ({
	categories,
	status,
	onAddProduct,
}: ProductFormProps) => {
	const [categoryName, setCategoryName] = useState(categories?.[0] ?? '');
	const [productName, setProductName] = useState('');
	const [productQuantity, setProductQuantity] = useState(0);

	const handleProductNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setProductName(e.target.value);
	};

	const handleCategoryNameChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCategoryName(e.target.value);
	};

	const handleProductQuantityChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setProductQuantity(Number(e.target.value));
	};

	const handleSubmit = () => {
		if (onAddProduct) {
			onAddProduct(productName, productQuantity, categoryName);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<fieldset className='border-2 border-gray-300 p-3 dark:border-gray-700 md:pb-4'>
				<legend className='text-lg font-semibold capitalize text-gray-700 dark:text-white'>
					Add Product
				</legend>
				<div className='mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
					<InputWithLabel
						id='productname'
						type='text'
						label='Product Name'
						status={status}
						value={productName}
						onChange={handleProductNameChange}
					/>
					<Select
						label='Category Name'
						value={categoryName}
						onChange={handleCategoryNameChange}
						options={categories}
					/>
					<InputWithLabel
						id='quantity'
						type='number'
						label='Quantity'
						status={status}
						value={productQuantity}
						onChange={handleProductQuantityChange}
						min={0}
					/>
					<button
						type='submit'
						className='h-[2.625rem] self-end rounded-md bg-gray-700 px-6 py-2 leading-5 text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
					>
						Save
					</button>
				</div>
			</fieldset>
		</Form>
	);
};

export default ProductForm;
