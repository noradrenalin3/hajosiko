import { createContext, useState, Dispatch, SetStateAction } from 'react';

type ContextType = {
	vehicleId: number | undefined;
	setVehicleIdState: Dispatch<SetStateAction<number | undefined>>;
	setVehicleId: (id: number | undefined) => void;
};

export const AppContext = createContext<ContextType>({
	vehicleId: undefined,
	setVehicleIdState: () => {},
	setVehicleId: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [vehicleId, setVehicleIdState] = useState<number | undefined>(() => {
		const localData = localStorage.getItem('vehicleId');
		return localData ? Number(JSON.parse(localData)) : undefined;
	});
	const setVehicleId = (id: number | undefined) => {
		setVehicleIdState(id);
		if (id !== undefined) {
			localStorage.setItem('vehicleId', JSON.stringify(id));
		}
	};
	const value = {
		vehicleId,
		setVehicleIdState,
		setVehicleId,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
