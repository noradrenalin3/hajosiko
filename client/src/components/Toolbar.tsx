import { ReactNode } from 'react';

export const Title = ({ text }: { text: string }) => (
	<h1 className='text-cinder-975 dark:text-cinder-100 text-center text-xl font-semibold'>
		{text}
	</h1>
);

const Toolbar = ({
	children,
}: {
	children?: ReactNode;
}) => {
	return (
		<div
			className={`
			sticky top-0
			gap-2 justify-center
			grid grid-cols-3 items-center
			text-cinder-975 dark:text-cinder-50 dark:bg-cinder-1000
		`}
		>
			{children}
		</div>
	);
};

export default Toolbar;
