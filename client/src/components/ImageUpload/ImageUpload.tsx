import { useState } from 'react';
import ImageUploading, {
	ImageListType,
	ImageType,
} from 'react-images-uploading';
import { PiUploadSimple as UploadIcon } from 'react-icons/pi';
import { ImageCropper } from './ImageCropper';
import getCanvasBlob from './getCanvasBlob';
import Preview from './Preview';

const ImageUploadButton = ({
	value,
	onChange,
	...props
}: {
	value: ImageType[];
	onChange: (value: ImageListType) => void;
}) => {
	return (
		<div className=''>
			<ImageUploading value={value} onChange={onChange}>
				{({ onImageUpload, onImageUpdate, isDragging, dragProps, errors }) => (
					<div
						className='border-2 border-cinder-800 p-12 rounded-lg font-medium cursor-pointer flex flex-col justify-center items-center font-semibold dark:text-cinder-300'
						onClick={value ? onImageUpload : () => onImageUpdate(0)}
						{...dragProps}
						{...props}
					>
						<UploadIcon className='text-3xl text-cinder-400' />
						{isDragging ? 'Drop here' : 'Click or drop files here'}
					</div>
				)}
			</ImageUploading>
		</div>
	);
};

const ImageUpload = ({
	imageRef,
}: {
	imageRef: React.MutableRefObject<Blob | null>;
}) => {
	const [image, setImage] = useState<ImageType[]>([]);
	const [isOpen, setIsOpen] = useState(false);
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
		<div className=''>
			{preview ? (
				<Preview src={preview} deleteImage={deleteImage} />
			) : (
				<>
					<ImageUploadButton
						value={image}
						onChange={(newImage) => {
							setIsOpen(true);
							setImage(newImage);
						}}
					/>
					<ImageCropper
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						image={(image.length > 0 && image[0].dataURL) || ''}
						onComplete={(imagePromise) => {
							imagePromise.then(async (canvas) => {
								const blob = await getCanvasBlob(canvas);
								saveImage(blob);
								setIsOpen(false);
							});
						}}
						containerClassName='relative w-full h-72 bg-cinder-800'
					/>
				</>
			)}
		</div>
	);
};

export { ImageUpload };
