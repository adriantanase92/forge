export type inputType =
	| 'text'
	| 'email'
	| 'password'
	| 'search'
	| 'hidden'
	| 'number'
	| 'tel'
	| 'url';

export type Message = { status: 'error' | 'success' | 'warning'; text: string };

export type SelectOptionType = { text: string; value: string };
