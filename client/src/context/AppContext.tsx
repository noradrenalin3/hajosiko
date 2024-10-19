import { createContext, useState, Dispatch, SetStateAction } from 'react';

type ContextType = {
	carId: number | undefined;
	setCarId: Dispatch<SetStateAction<number | undefined>>;
};

export const AppContext = createContext<ContextType>({
	carId: undefined,
	setCarId: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [carId, setCarId] = useState<number | undefined>(() => {
		const localData = localStorage.getItem('carId');
		return localData ? Number(JSON.parse(localData)) : undefined;
	});
	const value = {
		carId,
		setCarId,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
