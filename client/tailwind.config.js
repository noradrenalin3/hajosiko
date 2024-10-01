/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				bw: {
					950: '#171717',
					925: '#2c2c2c',
					900: '#3d3d3d',
					800: '#454545',
					700: '#4f4f4f',
					600: '#5d5d5d',
					500: '#6d6d6d',
					400: '#888888',
					300: '#b0b0b0',
					200: '#d1d1d1',
					100: '#e7e7e7',
					50: '#f6f6f6',
				},
			},
		},
	},
	darkMode: 'selector',
	plugins: [],
};
