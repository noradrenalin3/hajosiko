import { AuthError } from 'firebase/auth';
import Form from '~/components/Form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '~/firebase/firebase';
import { FormDefs } from '~/types/form.types';

const fields: FormDefs[] = [
	{
		type: 'email',
		name: 'email',
		placeholder: 'Enter your email',
		required: true,
	},
	{
		type: 'password',
		name: 'password',
		placeholder: 'Enter your password',
		required: true,
	},
];

const SignUp = () => {
	const [error, setError] = useState<string | undefined>(undefined);
	const navigate = useNavigate();

	const handleError = (err: AuthError) => {
		switch (err.code) {
			case 'auth/wrong-password':
				setError('Invalid password');
				break;
			case 'auth/user-not-found':
				setError('User not found');
				break;
			case 'auth/email-already-in-use':
				setError('Email already in use');
				break;
		}
	};

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const email = form.email.value;
		const password = form.password.value;

		const res = await signUpUser(email, password).catch(handleError);
		if (!res) {
			throw new Error('Error');
		}

		const token = await res.user.getIdToken();

		createUser(token)
			.then(() => {
				navigate('/');
			})
			.catch((err) => {
				setError(err.message);
				console.log(err.message);
			});
	};
	const createUser = async (token: string) => {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		if (!response.ok) {
			console.log(response.status);
		} else {
			const result = await response.json();
			console.log(result);
		}
	};

	return (
		<div className='flex flex-col items-center p-4'>
			<Form onSubmit={handleSignUp} fields={fields} title='Sign up'>
				<button
					type='submit'
					className='grow bg-violet-600 font-medium rounded-lg py-2'
				>
					Sign up
				</button>
				<span className='flex justify-center gap-2 font-medium mt-2 text-sm'>
					<p>Already have an account?</p>
					<Link to='/signin' className='text-blue-500'>
						Login now
					</Link>
				</span>
			</Form>
		</div>
	);
};

export default SignUp;
