import { FormDefs } from '~/types/form.types';
import capitalize from '~/utils/capitalize';

const Field = (props: FormDefs) => {
	const { name, type, placeholder, defaultValue } = props;
	return (
		<div className='flex flex-col gap-2'>
			<label className='font-semibold' htmlFor={name}>
				{capitalize(name)}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className='grow font-medium bg-cinder-100 dark:bg-cinder-1000 py-2 px-4 rounded-lg border-2 dark:border-cinder-900 placeholder-cinder-500 dark:placeholder-cinder-400'
			/>
		</div>
	);
};

const Form = ({
	fields,
	onSubmit,
	children,
	title,
}: {
	fields: FormDefs[];
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	children?: React.ReactNode;
	title?: string;
}) => {
	return (
		<form onSubmit={onSubmit} className='max-w-md mx-auto flex flex-col gap-4'>
			{title ? (
				<>
					<h2 className='flex flex-col w-fit py-2 text-xl font-extrabold'>
						{title}
						<hr className='min-h-0.5 bg-blue-500 w-full rounded-full mt-0.5 border-none' />
					</h2>
				</>
			) : null}
			{fields.map((field) => (
				<Field key={field.name} {...field} />
			))}
			<div className='flex flex-col gap-4 py-8'>{children}</div>
		</form>
	);
};

export default Form;
