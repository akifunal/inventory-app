export type InputProps = {
	id?: string;
	value?: string | number;
	type?: string;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	required?: boolean;
	min?: number;
	max?: number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
	return (
		<input
			id={props.id}
			type={props.type || 'text'}
			onChange={props.onChange}
			onClick={props.onClick}
			value={props.value}
			placeholder={props.placeholder}
			min={props.min}
			max={props.max}
			className='block w-full rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-700 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-500'
		/>
	);
};

export default Input;
