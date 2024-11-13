import { useState } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import clsx from 'clsx';
import { options } from '~/constants/imageOptions';

const createImage = (url: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.src = url;
	});
};

async function resizeCanvas(
	canvas: HTMLCanvasElement,
): Promise<HTMLCanvasElement> {
	if (options.maxWidth > canvas.width || options.maxHeight > canvas.height) {
		return canvas;
	}
	const newCanvas = document.createElement('canvas');
	const ratio = Math.min(
		options.maxWidth / canvas.width,
		options.maxHeight / canvas.height,
	);
	const newWidth = (canvas.width * ratio + 0.5) | 0;
	const newHeight = (canvas.height * ratio + 0.5) | 0;
	newCanvas.width = newWidth;
	newCanvas.height = newHeight;

	const ctx = newCanvas.getContext('2d');
	if (!ctx) {
		throw new Error('Error resizing image');
	}
	ctx.drawImage(
		canvas,
		0,
		0,
		canvas.width,
		canvas.height,
		0,
		0,
		newWidth,
		newHeight,
	);

	return newCanvas;
}

async function getCroppedImg(
	imageSrc: string,
	pixelCrop: Area,
): Promise<HTMLCanvasElement> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	const maxSize = Math.max(image.width, image.height);
	const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

	canvas.width = safeArea;
	canvas.height = safeArea;

	if (!ctx) throw new Error('Canvas context is null');
	ctx.drawImage(
		image,
		safeArea / 2 - image.width * 0.5,
		safeArea / 2 - image.height * 0.5,
	);
	const data = ctx.getImageData(0, 0, safeArea, safeArea);

	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	ctx.putImageData(
		data,
		Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
		Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
	);

	return await resizeCanvas(canvas);
}

async function cropImage(
	image: string,
	croppedAreaPixels: Area,
	onError: (err: Error) => void,
): Promise<HTMLCanvasElement> {
	try {
		const croppedImage = await getCroppedImg(image, croppedAreaPixels);
		return croppedImage;
	} catch (err: unknown) {
		if (err instanceof Error) {
			onError(err);
		}
		throw new Error('Error cropping image');
	}
}

export const ImageCropper = ({
	isOpen,
	onClose,
	image,
	onComplete,
	containerClassName,
	...props
}: {
	isOpen: boolean;
	onClose: () => void;
	image: string;
	onComplete: (image: Promise<HTMLCanvasElement>) => void;
	containerClassName: string;
}) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	return (
		<Dialog open={isOpen} onClose={onClose} className='relative z-50'>
			<DialogBackdrop className='fixed inset-0 bg-black/50' />
			<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
				<DialogPanel className='w-full max-w-sm space-y-4 bg-cinder-900 p-4 rounded-lg'>
					<DialogTitle className='flex flex-col w-fit py-2 text-lg font-extrabold'>
						Crop image
						<hr className='min-h-0.5 bg-violet-600 w-full rounded-full mt-0.5 border-none' />
					</DialogTitle>

					<div className={containerClassName}>
						<Cropper
							classes={{
								containerClassName: '',
								mediaClassName: '',
								cropAreaClassName: '',
							}}
							image={image}
							crop={crop}
							zoom={zoom}
							aspect={16 / 9}
							//objectFit='cover'
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={(_, croppedAreaPixels) => {
								setCroppedAreaPixels(croppedAreaPixels);
							}}
							{...props}
						/>
					</div>
					<div className='flex flex-col'>
						<label htmlFor='zoom' className='font-semibold'>
							Zoom
						</label>
						<input
							id='zoom'
							type='range'
							value={zoom}
							min={1}
							max={3}
							step={0.01}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setZoom(Number(e.target.value))
							}
							className={clsx('my-4 w-full h-2 rounded-full')}
						/>

						<div className='flex gap-2 justify-end font-medium'>
							<button
								className='py-2 px-4 bg-cinder-600 rounded-lg'
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								className='py-2 px-4 bg-violet-600 rounded-lg'
								onClick={() => {
									if (!image || !croppedAreaPixels)
										return console.error('error');
									onComplete(cropImage(image, croppedAreaPixels, console.log));
								}}
							>
								Crop
							</button>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};
