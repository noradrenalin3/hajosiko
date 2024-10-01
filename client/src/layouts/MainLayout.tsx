import { ReactNode } from 'react';
//import Navbar from '~/components/Navbar';
//import Sidebar from '~/components/Sidebar';

const MainLayout = ({ children }: {children: ReactNode}) => {
	return (
		<div className='flex flex-1 basis-full min-h-screen'>
			<div className='flex-1 basis-full flex flex-col'>
				<div className='flex flex-col gap-4 p-8 border-t border-bw-100 dark:border-bw-925'>
					{children}
				</div>
			</div>
		</div>
	);
};
export default MainLayout;

