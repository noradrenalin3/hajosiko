import { useState, ReactNode, useLayoutEffect, createContext } from 'react';

type ContextProviderProps = {
	children?: ReactNode;
};

type ContextType = {
	dark: boolean;
	toggle: () => void;
};

export const ThemeContext = createContext<ContextType>({
	dark: false,
	toggle: () => {},
});

export const ThemeProvider = ({ children }: ContextProviderProps) => {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [dark, setDark] = useState(prefersDark);

	useLayoutEffect(() => {
		applyTheme();
	}, [dark]);

	const applyTheme = () => {
		const body = document.getElementsByTagName('body')[0];
		if (dark) {
			body.classList.add('dark-theme');
			body.classList.remove('light-theme');
		} else {
			body.classList.add('light-theme');
			body.classList.remove('dark-theme');
		}
	};
	const toggle = () => {
		const body = document.getElementsByTagName('body')[0];
		body.style.cssText = 'transition: background .25s ease';

		setDark(!dark);
	};

	return (
		<ThemeContext.Provider value={{ dark, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
};
