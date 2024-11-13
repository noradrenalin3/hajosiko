import { FormDefs } from '~/types/form.types';
import { Field } from './Field';

export const Form = ({
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
		<form
			onSubmit={onSubmit}
			className='w-full sm:max-w-screen-sm min-h-full flex flex-col gap-4'
		>
			{title ? (
				<>
					<h2 className='flex flex-col w-fit py-2 text-xl font-extrabold'>
						{title}
						<hr className='min-h-0.5 bg-violet-600 w-full rounded-full mt-0.5 border-none' />
					</h2>
				</>
			) : null}
			{fields.map((field) => (
				<Field key={field.name} {...field} />
			))}
			<div className='flex flex-col gap-4 grow'>{children}</div>
		</form>
	);
};
