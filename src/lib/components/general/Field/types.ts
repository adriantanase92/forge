export type kind = "input" | "textarea" | "select";

export type type =
	| "text"
	| "email"
	| "password"
	| "search"
	| "hidden"
	| "date"
	| "datetime-local"
	| "number"
	| "tel"
	| "url"
	| "checkbox"
	| "radio";

export interface selectOption {
	value: string | number;
	text: string;
}
