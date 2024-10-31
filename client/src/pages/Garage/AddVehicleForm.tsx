import { useRef, useState } from 'react';
import Form, { FormButtons } from '~/components/Form';
import { Car, NewCar } from '~/types/car.types';
import { useCreateCar } from '~/hooks/useQuery';
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

	const onSuccess = (car: Car) => {
		if (!imageRef.current) {
			return closeHandler();
		}
		uploadImage(imageRef.current, car.id);
	};

	const {
		mutate: createCar,
		isPending,
		isSuccess,
		isError,
	} = useCreateCar(onSuccess);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);
		const form = e.currentTarget;
		const newCar: NewCar = {
			make: form.make.value,
			model: form.model.value,
			year: Number(form.year.value),
			kilometers: Number(form.kilometers.value),
		};
		createCar(newCar);
	};

	const [preview, setPreview] = useState<string | null>(null);

	const saveImage = (image: Blob) => {
		imageRef.current = image;
		setPreview(URL.createObjectURL(image));
	};
	const deleteImage = () => {
		imageRef.current = null;
		setPreview(null);
	};

	return (
		<Overlay isOpen={isOpen} close={closeHandler}>
			{pending ? (
				<div>Pending...</div>
			) : (
				<Form onSubmit={handleSubmit} fields={fields} title='Create car'>
					<label className='font-semibold'>Image</label>
					{preview ? (
						<Preview src={preview} deleteImage={deleteImage} />
					) : (
						<ImageUpload saveImage={saveImage} />
					)}
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
