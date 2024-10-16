import { ReactNode } from 'react';

const Modal = ({
	children,
	isOpen,
	close,
}: {
	children: ReactNode;
	isOpen: boolean;
	close: React.MouseEventHandler;
}) => {
	if (!isOpen) return null;
	return (
		<>
			<div
				onClick={close}
				className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50'
			/>
			<div
				className={`
				fixed left-0 bottom-0 w-full rounded-t-lg h-fit
				p-8 z-50
				bg-cinder-200 dark:bg-cinder-1000
				sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-xl sm:rounded-lg
			`}
			>
				{children}
			</div>
		</>
	);
};

export default Modal;
