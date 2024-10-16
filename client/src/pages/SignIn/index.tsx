import { Link, useNavigate } from 'react-router-dom';
import Form from '~/components/Form';
import { FormDefs } from '~/types/form.types';
import { signInUser } from '~/firebase/firebase';
import MainLayout from '~/layouts/MainLayout';
import Toolbar from '~/components/Toolbar';
import BackButton from '~/components/Button/BackButton';

const SignIn = () => {
	const navigate = useNavigate();

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

	const handleSignIn = (email: string, password: string) => {
		signInUser(email, password)
			.then((userCred) => {
				if (userCred) {
					console.log('Signed in successfully');
					navigate('/');
				}
			})
			.catch((error) => {
				console.log('Sign in failed', error.message);
			});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const email = form.email.value;
		const password = form.password.value;

		handleSignIn(email, password);
	};

	return (
		<MainLayout>
			<Toolbar>
				<BackButton />
			</Toolbar>
			<div className='p-4 rounded-lg'>
				<Form onSubmit={handleSubmit} fields={fields} title='Log in'>
					<button
						type='submit'
						className='grow bg-custom-purple-light font-medium rounded-lg py-2'
					>
						Sign in
					</button>
					<span className='flex justify-center gap-2 font-medium mt-2'>
						<p>Don't have an account?</p>
						<Link to='/signup' className='text-blue-500'>
							Sign up now
						</Link>
					</span>
				</Form>
			</div>
		</MainLayout>
	);
};

export default SignIn;
