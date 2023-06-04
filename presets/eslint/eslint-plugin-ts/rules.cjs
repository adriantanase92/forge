module.exports = {
	// enforce camelcase naming convention
	// - disable eslint rule to avoid conflict with typescript rule
	"camelcase": "off",
	// disallow unused variables.
	// - disable eslint rule to avoid conflict with typescript rule
	"no-unused-vars": "off",
	"@typescript-eslint/no-unused-vars": [
		"error",
		// allow by intention when adding underscore at the end
		{
			vars: "all",
			args: "after-used",
			argsIgnorePattern: "_$"
		}
	],
	// disallow usage of the any type.
	"@typescript-eslint/no-explicit-any": "off",
	// bans @ts-<directive> comments from being used or requires
	// descriptions after directive.
	"@typescript-eslint/ban-ts-comment": [
		"error",
		{
			"ts-ignore": "allow-with-description"
		}
	],
	// Enforces naming conventions for everything across a codebase.
	"@typescript-eslint/naming-convention": [
		"error",
		{
			selector: "default",
			trailingUnderscore: "allow",
			format: ["camelCase", "PascalCase", "UPPER_CASE"]
		},
		{
			selector: "variable",
			trailingUnderscore: "allow",
			format: ["camelCase", "UPPER_CASE"]
		},
		{
			selector: "function",
			trailingUnderscore: "allow",
			format: ["camelCase", "PascalCase"]
		},
		{
			selector: "parameter",
			format: ["camelCase"],
			trailingUnderscore: "allow"
		},
		// Enforce enum members to be PascalCase
		{
			selector: ["enumMember"],
			format: ["PascalCase"]
		},
		// Allow all property names that require quotes to use a quoted
		// name that breaks the convention (for example, HTTP headers)
		{
			selector: "property",
			format: null,
			modifiers: ["requiresQuotes"]
		},
		// Allow destructured properties to retain their original name,
		// even if it breaks our naming convention
		{
			selector: "variable",
			modifiers: ["destructured"],
			format: null
		},
		{
			selector: "typeLike",
			format: ["PascalCase"]
		},
		{
			selector: "interface",
			format: ["PascalCase"],
			custom: {
				regex: "^I[A-Z]",
				match: false
			}
		},
		{
			selector: "typeParameter",
			format: ["PascalCase"],
			prefix: ["T"]
		}
	]
};
