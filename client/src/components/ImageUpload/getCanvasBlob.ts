export default function getCanvasBlob(
	canvas: HTMLCanvasElement,
): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) resolve(blob);
				else {
					reject(new Error('Error converting canvas to blob'));
				}
			},
			'image/jpeg',
			0.85,
		);
	});
}
