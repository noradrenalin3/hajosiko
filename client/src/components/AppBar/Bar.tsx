import { ReactNode } from 'react';
import Nav from '~/components/Nav';

const Bar = ({ children }: { children?: ReactNode }) => {
	return (
		<div className='sticky top-0 flex flex-col'>
			<div
				className={` z-50
				gap-2 p-4 pb-2 justify-between
				flex items-center
				text-cinder-975 dark:text-cinder-50 bg-cinder-50 dark:bg-cinder-1000
			`}
			>
				{children}
			</div>
			<Nav />
		</div>
	);
};

export default Bar;
