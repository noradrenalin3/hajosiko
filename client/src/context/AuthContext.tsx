import { User } from 'firebase/auth';
import { signOutUser, userStateListener } from '~/firebase/firebase';
import { createContext, useState, useEffect, ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

export const AuthContext = createContext({
	currentUser: {} as User | null,
	setCurrentUser: (_user: User) => {},
	signOut: () => {},
});

export const AuthProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = userStateListener((user) => {
			if (user) {
				console.log(user);
				setCurrentUser(user);
			}
		});
		return unsubscribe;
	}, [setCurrentUser]);

	const signOut = () => {
		signOutUser();
		setCurrentUser(null);
		console.log('logged out');
	};

	const value = {
		currentUser,
		setCurrentUser,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
