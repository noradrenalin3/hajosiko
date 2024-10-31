import { ReactNode } from 'react';

const Bar = ({ children }: { children?: ReactNode }) => {
	return (
		<div
			className={`
			sticky top-0
			gap-2 p-4 justify-between
			flex items-center
			text-cinder-975 dark:text-cinder-50 dark:bg-cinder-1000
		`}
		>
			{children}
		</div>
	);
};

export default Bar;
