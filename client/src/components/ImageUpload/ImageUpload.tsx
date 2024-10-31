import { useState } from 'react';
import ImageUploading, {
	ImageListType,
	ImageType,
} from 'react-images-uploading';
import { PiUploadSimple as UploadIcon } from 'react-icons/pi';
import { ImageCropper } from './ImageCropper';
import getCanvasBlob from './getCanvasBlob';

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

const ImageUpload = ({ saveImage }: { saveImage: (image: Blob) => void }) => {
	const [image, setImage] = useState<ImageType[]>([]);
	//	const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
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
						//setCroppedImage(blob);
						setIsOpen(false);
					});
				}}
				containerClassName='relative w-full h-72 bg-cinder-800'
			/>
		</div>
	);
};
//{croppedImage && <img src={croppedImage} alt='' className='w-full'/>}

export { ImageUpload };
