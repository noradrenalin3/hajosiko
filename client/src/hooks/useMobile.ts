import { useEffect, useState } from 'react';

const useMobile = () => {
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

	return { isMobile };
};

export default useMobile;
