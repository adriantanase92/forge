import type { size } from './types';

export const getSizeBasedClasses = (size: size) => {
	let classes = '';

	if (size === 'sm') {
		classes = 'w-[90%] sm:w-[30%] max-w-[400px]';
	} else if (size === 'lg') {
		classes = 'w-[90%] md:w-[80%] max-w-[900px]';
	} else {
		classes = 'w-[90%] sm:w-[50%] max-w-[600px]';
	}

	return classes;
};

export const formatEntityForModal = ({
	modalType,
	entity,
	itemName
}: {
	modalType: 'edit' | 'delete';
	entity: string;
	itemName: string;
}) =>
	`<span class='${
		modalType === 'delete' ? 'text-error font-bold' : 'text-cobalt'
	}'>${itemName}</span> ${entity}`;
