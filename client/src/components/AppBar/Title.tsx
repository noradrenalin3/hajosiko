import truncate from '~/utils/truncate';

const Title = ({ text }: { text: string }) => (
	<h1 className='text-cinder-975 dark:text-cinder-100 text-center font-semibold py-1.5'>
		{truncate(text)}
	</h1>
);

export default Title;
