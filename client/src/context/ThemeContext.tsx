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

const getStorage = () => {
	const setting = localStorage.getItem('prefersDark');
	if (setting === undefined || setting === null) {
		return undefined;
	} else {
		return JSON.parse(setting);
	}
};
const setStorage = (isDark: boolean) => {
	localStorage.setItem('prefersDark', JSON.stringify(isDark));
};

export const ThemeProvider = ({ children }: ContextProviderProps) => {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const initial = getStorage() !== undefined ? getStorage() : prefersDark;
	const [dark, setDark] = useState(initial);

	useLayoutEffect(() => {
		applyTheme();
	}, [dark]);

	const applyTheme = () => {
		const body = document.getElementsByTagName('body')[0];
		if (dark) {
			body.classList.add('dark');
			body.classList.remove('light');
		} else {
			body.classList.add('light');
			body.classList.remove('dark');
		}
	};
	const toggle = () => {
		const body = document.getElementsByTagName('body')[0];
		body.style.cssText = 'transition: background .25s ease';

		if (dark) {
			setDark(false);
			setStorage(false);
		} else {
			setDark(true);
			setStorage(true);
		}
	};

	return (
		<ThemeContext.Provider value={{ dark, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
};
