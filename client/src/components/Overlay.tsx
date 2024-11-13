import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import { ReactNode } from 'react';

const Overlay = ({
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
				<div className='fixed inset-0 flex w-screen items-center justify-center'>
					<DialogPanel className='w-full h-full space-y-4 bg-cinder-200 dark:bg-cinder-1000 p-4'>
						<div
							className={`
								bg-cinder-200 dark:bg-cinder-1000
								overflow-y-auto fixed left-0 bottom-0 w-full min-h-full p-8
								top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-screen-sm
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

export default Overlay;
