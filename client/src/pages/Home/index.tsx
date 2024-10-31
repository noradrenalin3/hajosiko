import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<>
			<div className=''>
				{!currentUser ? (
					<div className='flex gap-4'>
						<Link
							to='/signup'
							className='
							grow text-center p-1 rounded-lg dark:bg-cinder-800 border-2 border-cinder-800
						'
						>
							Sign up
						</Link>
						<Link
							to='/signin'
							className='box-border grow text-center p-1 rounded-lg border-2 border-cinder-800'
						>
							Sign in
						</Link>
					</div>
				) : null}
				<p className=''>
					Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
					tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
					ea commodi consequat. Quis aute iure reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
					cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
					id est laborum.
				</p>
			</div>
		</>
	);
};

export default Home;
