import firebaseConfig from '~/firebase/firebase-config';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	UserCredential,
	User,
	NextOrObserver,
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInUser = async (
	email: string,
	password: string,
): Promise<UserCredential | undefined> => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpUser = async (email: string, password: string) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const userStateListener = (callback: NextOrObserver<User>) => {
	return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => await signOut(auth);
