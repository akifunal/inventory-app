type FormProps = {
	onSubmit?: () => void;
	children?: React.ReactNode;
};

const Form = ({ children, onSubmit }: FormProps) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (onSubmit) {
			onSubmit();
		}
	};

	return (
		<section id='forms' className='mt-4 p-2'>
			<form onSubmit={handleSubmit}>{children}</form>
		</section>
	);
};

export default Form;
