import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOutUser, userStateListener } from '~/firebase/firebase';
import { createContext, useState, useEffect, ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

export const AuthContext = createContext({
	currentUser: {} as User | null,
	setCurrentUser: (_user: User) => {},
	signOut: () => {},
	isLoading: true,
});

export const AuthProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = userStateListener((user) => {
			if (user) {
				setIsLoading(false);
				setCurrentUser(user);
			}
		});
		return unsubscribe;
	}, [setCurrentUser]);

	const signOut = () => {
		signOutUser();
		setCurrentUser(null);
		navigate('/');
	};

	const value = {
		currentUser,
		setCurrentUser,
		signOut,
		isLoading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
