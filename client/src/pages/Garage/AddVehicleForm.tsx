import { useRef, useState } from 'react';
import Form, { FormButtons } from '~/components/Form';
import { Vehicle, NewVehicle } from '@shared/types';
import { useCreateVehicle } from '~/hooks/useQuery';
import ImageUpload from '~/components/ImageUpload';
import Overlay from '~/components/Overlay';
import { FormDefs } from '~/types/form.types';
import useUploadImage from '~/hooks/useUploadImage';
import { toast } from 'react-toastify';
import { PiXBold as XIcon } from 'react-icons/pi';
import Preview from '~/components/ImageUpload/Preview';

const fields: FormDefs[] = [
	{
		type: 'text',
		name: 'make',
		placeholder: 'Make',
		required: true,
	},
	{
		type: 'text',
		name: 'model',
		placeholder: 'Model',
		required: true,
	},
	{
		type: 'number',
		name: 'year',
		placeholder: 'Year',
		required: true,
		min: '1900',
		max: '2099',
		step: '1',
	},
	{
		type: 'number',
		name: 'kilometers',
		placeholder: 'Kilometers',
		required: true,
	},
];

const AddVehicleForm = ({
	isOpen,
	closeHandler,
}: {
	isOpen: boolean;
	closeHandler: () => void;
}) => {
	const [pending, setPending] = useState(false);
	const imageRef = useRef<Blob | null>(null);
	const afterUpload = () => {
		setPending(false);
		toast.success('Success');
		closeHandler();
	};
	const { uploadImage } = useUploadImage(afterUpload);

	const onSuccess = (vehicle: Vehicle) => {
		if (!imageRef.current) {
			return closeHandler();
		}
		uploadImage(imageRef.current, vehicle.id);
	};

	const {
		mutate: createVehicle,
		isPending,
		isSuccess,
		isError,
	} = useCreateVehicle(onSuccess);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);
		const form = e.currentTarget;
		const newVehicle: NewVehicle = {
			make: form.make.value,
			model: form.model.value,
			year: Number(form.year.value),
			kilometers: Number(form.kilometers.value),
		};
		createVehicle(newVehicle);
	};

	return (
		<Overlay isOpen={isOpen} close={closeHandler}>
			{pending ? (
				<div>Pending...</div>
			) : (
				<Form onSubmit={handleSubmit} fields={fields} title='Create vehicle'>
					<label className='font-semibold'>Image</label>
					<ImageUpload imageRef={imageRef} />
					<FormButtons
						cancelHandler={closeHandler}
						submitLabel='Add'
					></FormButtons>
				</Form>
			)}
		</Overlay>
	);
};

export default AddVehicleForm;
