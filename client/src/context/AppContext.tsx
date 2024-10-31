import { createContext, useState, Dispatch, SetStateAction } from 'react';

type ContextType = {
	carId: number | undefined;
	setCarIdState: Dispatch<SetStateAction<number | undefined>>;
	setCarId: (id: number | undefined) => void;
};

export const AppContext = createContext<ContextType>({
	carId: undefined,
	setCarIdState: () => {},
	setCarId: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [carId, setCarIdState] = useState<number | undefined>(() => {
		const localData = localStorage.getItem('carId');
		return localData ? Number(JSON.parse(localData)) : undefined;
	});
	const setCarId = (id: number | undefined) => {
		setCarIdState(id);
		if (id !== undefined) {
			localStorage.setItem('carId', JSON.stringify(id));
		}
	};
	const value = {
		carId,
		setCarIdState,
		setCarId,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
