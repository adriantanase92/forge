import type { type } from "../Field/types.js";

export interface ModalProps {
	modalId: string;
	form: {
		data: any;
		id: string;
		action: string;
		schema: any;
		dataToAppend?: undefined | any[];
		fields: [
			{
				id: string;
				type: type;
				placeholder: string;
				labelText: string;
				name: string;
				valueData?: undefined | any;
			}
		];
		messages: {
			success: string;
			error: string;
		};
	};
}
