import type { TranslationFunctions } from '$i18n/i18n-types';
import type { Address } from '.';
import type { SelectOptionType } from '../components/general/form/types';

export const capitalize = (text: string = ''): string =>
	text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : '';

export const clickOutside = (node: Node) => {
	const handleClick = (event: Event) => {
		const { target } = event;
		if (!node.contains(target as HTMLElement)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const formatObjectFromTable = (obj: Record<string, { value: unknown }>) => {
	const simplified: Record<string, unknown> = {};

	for (const key in obj) {
		if (
			Object.prototype.hasOwnProperty.call(obj, key) &&
			typeof obj[key] === 'object' &&
			'value' in obj[key]
		) {
			simplified[key] = obj[key].value;
		}
	}

	return simplified;
};

export const escapeString = (str: string): string => {
	return (
		str
			.replace(/[&]/g, '&amp;')
			.replace(/[<]/g, '&lt;')
			.replace(/[>]/g, '&gt;')
			.replace(/["]/g, '&quot;')
			.replace(/[']/g, '&#039;')
			.replace(/[/]/g, '&#x2F;')
			.replace(/[\\]/g, '&#x5C;')
			.replace(/[-]/g, '&#x2D;')
			// eslint-disable-next-line no-useless-escape
			.replace(/[\`]/g, '&#96;')
	);
};

export const formatDateTime = (dateString: Date): { date: string; time: string } => {
	const date = new Date(dateString);

	const optionsDate: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};
	const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);

	const optionsTime: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	};
	const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

	return {
		date: formattedDate,
		time: formattedTime
	};
};

export const getNameInitials = ({
	firstName,
	lastName
}: {
	firstName: string;
	lastName: string;
}): string => {
	// Get the first letter of the first name and last name, and make them uppercase.
	const firstInitial = firstName.charAt(0).toUpperCase();
	const lastInitial = lastName.charAt(0).toUpperCase();

	// Combine the initials and return them.
	return `${firstInitial}${lastInitial}`;
};

export const formatArrayToOptionsArray = <T>({
	array,
	textProp,
	valueProp
}: {
	array: T[];
	textProp: keyof T;
	valueProp: keyof T;
}): SelectOptionType[] =>
	array.map((item) => ({
		text: String(item[textProp]),
		value: String(item[valueProp])
	}));

export const convertSnakeCaseToCamelCase = (str: string): string => {
	return str
		.split('_')
		.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
		.join('');
};

export const getErrorTranslationFromKey = (t: TranslationFunctions, errorKey: string) => {
	const camelCaseErrorKey = convertSnakeCaseToCamelCase(errorKey);

	// Cast t.errors to the ErrorFunctions type
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const errors = t.errors as any;

	// Now you can safely access the error function using the dynamic key
	const errorFunction = errors[camelCaseErrorKey];

	if (typeof errorFunction === 'function') {
		return errorFunction();
	} else {
		console.error(`Error function for key '${errorKey}' not found.`);
		return undefined; // or a default error message
	}
};

export const getAddressString = (address: Address): string => {
	// Filter the entries of the address object to keep only those with defined values
	const definedEntries = Object.entries(address).filter(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		([key, value]) => value !== undefined
	);

	// Map the entries to their string representation and join them
	const addressParts = definedEntries.map(([key, value]) => `${key}: ${value}`);
	return addressParts.join(', ');
};
