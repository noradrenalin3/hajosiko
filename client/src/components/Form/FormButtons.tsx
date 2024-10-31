export const FormButtons = ({
	cancelHandler,
	submitLabel,
	children,
}: {
	cancelHandler: () => void;
	submitLabel: string;
	children?: React.ReactNode;
}) => {
	return (
		<div className='flex gap-2 mt-auto h-fit'>
			{children ? children : null}
			<button
				onClick={cancelHandler}
				className='ml-auto bg-cinder-700 font-medium p-2 px-4 rounded-md'
			>
				Cancel
			</button>
			<button
				type='submit'
				className='bg-custom-purple-light font-medium p-2 px-4 rounded-md'
			>
				{submitLabel}
			</button>
		</div>
	);
};
