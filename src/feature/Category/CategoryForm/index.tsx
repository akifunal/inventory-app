import Form from '@/components/Form';
import InputWithLabel from '@/components/UI/InputWithLabel';
import { useState } from 'react';
import toast from 'react-hot-toast';

type ProductFormProps = {
	onAddCategory?: (categoryName: string) => void;
	categories: string[];
	status?: string;
};

const CategoryForm = ({
	categories,
	status,
	onAddCategory,
}: ProductFormProps) => {
	const [categoryName, setCategoryName] = useState('');
	const errorNotify = (error: string) => toast.error(error);

	const handleCategoryNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCategoryName(e.target.value);
	};

	const handleSubmit = () => {
		if (categories.length > 0 && categories.includes(categoryName)) {
			errorNotify(`${categoryName} category already exists`);
			return;
		}

		if (onAddCategory) {
			onAddCategory(categoryName);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<fieldset className='border-2 border-gray-300 p-3 dark:border-gray-700 md:pb-4'>
				<legend className='text-lg font-semibold capitalize text-gray-700 dark:text-white'>
					Add Category
				</legend>
				<div className='mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
					<InputWithLabel
						id='categoryName'
						type='text'
						label='Category Name'
						status={status}
						value={categoryName}
						onChange={handleCategoryNameChange}
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

export default CategoryForm;
