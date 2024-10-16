import { useState, useEffect, ReactNode } from 'react';
import { MainNav } from '~/components/Nav/Mobile';

const MainLayout = ({ children }: { children: ReactNode }) => {
	const mobileMediaQuery = '(max-width: 639px)';
	const [isMobile, setIsMobile] = useState(
		window.matchMedia(mobileMediaQuery).matches,
	);
	useEffect(() => {
		const query = window.matchMedia(mobileMediaQuery);
		const handleQueryChange = (queryEvent: MediaQueryListEvent) => {
			setIsMobile(queryEvent.matches);
		};

		query.addEventListener('change', handleQueryChange);

		return () => {
			query.removeEventListener('change', handleQueryChange);
		};
	}, []);

	return (
		<div className={'min-h-screen flex flex-col'}>
			<div className='flex flex-col gap-4 p-4 sm:p-8 grow'>{children}</div>
			<MainNav />
		</div>
	);
};
export default MainLayout;
