import { FormDefs } from '~/types/form.types';
import capitalize from '~/utils/capitalize';

export const Field = (props: FormDefs) => {
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
