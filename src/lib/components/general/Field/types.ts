export type kind = "input" | "textarea" | "select";

export type type =
	| "text"
	| "checkbox"
	| "radio"
	| "email"
	| "password"
	| "search"
	| "hidden"
	| "date"
	| "datetime-local"
	| "month"
	| "number"
	| "time"
	| "week"
	| "tel"
	| "url";

export interface selectOption {
	value: string | number;
	text: string;
}
