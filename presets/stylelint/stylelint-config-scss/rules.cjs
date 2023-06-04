module.exports = {
	// Overrides conflicting rules
	"function-no-unknown": null,
	"at-rule-no-unknown": null,
	"no-invalid-double-slash-comments": null,

	///////////////////////////////////////////////////////////////////////////
	/// Scss specifics rules
	///////////////////////////////////////////////////////////////////////////
	"scss/at-rule-no-unknown": true,
	"scss/at-function-pattern": [
		"^([-])?([a-z][a-z0-9]*)(([-]|[_]){1,2}[a-z0-9]+)*$",
		{
			message: "Expected function name to be BEM compliant"
		}
	],
	"scss/at-mixin-pattern": [
		"^([-])?([a-z][a-z0-9]*)(([-]|[_]){1,2}[a-z0-9]+)*$",
		{
			message: "Expected mixin name to be BEM compliant"
		}
	],
	"scss/dollar-variable-pattern": [
		"^([-])?([a-z][a-z0-9]*)(([-]|[_]){1,2}[a-z0-9]+)*$",
		{
			message: "Expected variable to be BEM compliant"
		}
	],
	"scss/percent-placeholder-pattern": [
		"^([-])?([a-z][a-z0-9]*)(([-]|[_]){1,2}[a-z0-9]+)*$",
		{
			message: "Expected placeholder to be BEM compliant"
		}
	]
};
