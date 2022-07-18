import React from 'react';

type SelectProps = {
	value?: string;
	label?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	options?: string[];
};

const Select = ({
	options,
	label,
	value,
	onChange,
	onMouseEnter,
	onMouseLeave,
}: SelectProps) => {
	return (
		<div>
			<label
				htmlFor='countries'
				className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'
			>
				{label}
			</label>
			<select
				id='countries'
				value={value}
				onChange={onChange}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
			>
				{options?.map((value) => (
					<option value={value} key={value}>
						{value}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
