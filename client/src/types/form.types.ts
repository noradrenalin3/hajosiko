import { HTMLInputTypeAttribute } from 'react';

export type FormDefs = {
	type: HTMLInputTypeAttribute;
	name: string;
	placeholder?: string;
	required?: boolean;
	defaultValue?: string;
	min?: string;
	max?: string;
	step?: string;
};
