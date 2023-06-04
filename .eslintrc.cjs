const { rules } = require("./presets/eslint/index.cjs");

module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
		tsconfigRootDir: __dirname
	},
	plugins: ["@typescript-eslint", "svelte3"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	env: {
		es6: true,
		browser: true,
		es2020: true,
		node: true
	},
	rules: {
		...rules,
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-inferrable-types": 0,
		"no-prototype-builtins": 0
	},
	globals: {
		svelte: true
	},
	ignorePatterns: ["*.cjs"],
	overrides: [
		{
			files: ["*.svelte"],
			env: {
				browser: true
			},
			processor: "svelte3/svelte3",
			rules: {
				"no-undef-init": "off"
			}
		}
	],
	settings: {
		"svelte3/typescript": () => require("typescript")
	}
};
