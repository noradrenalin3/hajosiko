import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import { ReactNode } from 'react';

const Modal = ({
	children,
	isOpen,
	close,
	title,
}: {
	children: ReactNode;
	isOpen: boolean;
	close: () => void;
	title?: string;
}) => {
	if (!isOpen) return null;
	return (
		<>
			<Dialog
				open={isOpen}
				onClose={close}
				className='relative z-50 overflow-y-auto'
			>
				<DialogBackdrop className='fixed inset-0 bg-black/50 backdrop-blur-sm' />
				<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
					<DialogPanel className='w-full max-w-sm space-y-4 bg-cinder-900 p-4 rounded-lg'>
						<div
							className={`
							fixed left-0 bottom-0 w-full rounded-t-lg h-fit
							p-8
							bg-cinder-200 dark:bg-cinder-1000
							sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:rounded-lg
						`}
						>
							{title && (
								<DialogTitle className='flex flex-col w-fit py-2 text-xl font-extrabold'>
									{title}
									<hr className='min-h-0.5 bg-violet-600 w-full rounded-full mt-0.5 border-none' />
								</DialogTitle>
							)}

							{children}
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
};

export default Modal;
