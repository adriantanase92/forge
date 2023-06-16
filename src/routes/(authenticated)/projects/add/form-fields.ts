export const addFormFields = (clients: any) => {
	return [
		{
			label: "Name",
			id: "name",
			classes: "variant-form-material"
		},
		{
			label: "Image URL",
			type: "url",
			id: "imageUrl",
			classes: "variant-form-material"
		},
		{
			label: "Management Type",
			kind: "select",
			selectOptions: [
				{ value: "external", text: "External" },
				{ value: "internal", text: "Internal" }
			],
			id: "managementToolType",
			classes: "variant-form-material"
		},
		{
			label: "Status",
			kind: "select",
			selectOptions: [
				{ value: "active", text: "Active" },
				{ value: "pending", text: "Pending" },
				{ value: "inactive", text: "Inactive" }
			],
			id: "status",
			classes: "variant-form-material"
		},
		{
			label: "Client",
			kind: "select",
			selectOptions: [...clients],
			id: "client",
			classes: "variant-form-material"
		},
		{
			label: "Labels",
			kind: "select",
			selectOptions: [
				{ value: "planning", text: "planning" },
				{ value: "designing", text: "designing" },
				{ value: "researching", text: "researching" },
				{ value: "on-discussions", text: "on-discussions" },
				{ value: "on-negociating", text: "on-negociating" },
				{ value: "waiting-for-client", text: "waiting-for-client" }
			],
			multiple: true,
			id: "labels",
			classes: "variant-form-material"
		}
	];
};
