export const statusesEnum = {
	values: ["active", "inactive", "blocked", "pending"],
	message: "enum validator failed for path `{PATH}` with value `{VALUE}`"
};

export const prioritiesEnum = {
	values: ["low", "medium", "high"],
	message: "enum validator failed for path `{PATH}` with value `{VALUE}`"
};

export const columnsEnum = {
	values: ["backlog", "to-do", "doing", "done"],
	message: "enum validator failed for path `{PATH}` with value `{VALUE}`"
};
