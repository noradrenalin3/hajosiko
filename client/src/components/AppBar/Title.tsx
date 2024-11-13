import truncate from '~/utils/truncate';

const Title = ({ text }: { text: string }) => (
	<h1 className='text-cinder-975 dark:text-cinder-50 text-center font-semibold text-lg p-1.5'>
		{text}
	</h1>
);

export default Title;
