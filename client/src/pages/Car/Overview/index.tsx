import { useNavigate, useParams } from 'react-router-dom';
import { useCar } from '~/hooks/useCars';
import MainLayout from '~/layouts/MainLayout';
import formatKm from '~/utils/formatKm';
import { IoPencil as PencilIcon } from 'react-icons/io5';
import TabBar from '~/pages/Car/TabBar';
import Details from './Details';

import Toolbar, { Title } from '~/components/Toolbar';
import BackButton from '~/components/Button/BackButton';
import EditButton from '~/components/Button/EditButton';

const Section = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col gap-2 sm:grid-cols-2 sm:gap-4'>
			{children}
		</div>
	);
};

const Overview = () => {
	const navigate = useNavigate();

	const { carId } = useParams();
	const { data: car, isLoading, error } = useCar();
	const serviceCount = 0;

	if (error) {
		return <div>{error?.message || 'error'}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!car) {
		return <div>No data</div>;
	}
	return (
		<MainLayout>
			<Toolbar>
				<BackButton url='/cars' />
				<Title text={car.model} />
				<div className='ml-auto'>
					<EditButton onClick={() => ''} />
				</div>
			</Toolbar>

			<TabBar />
			<Details car={car} />
		</MainLayout>
	);
};

export default Overview;
