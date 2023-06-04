const { rules } = require("./presets/stylelint/index.cjs");

module.exports = {
	extends: ["stylelint-config-html", "stylelint-scss"],
	customSyntax: require("postcss-scss"),
	plugins: ["stylelint-scss"],
	overrides: [
		{
			files: ["**/*.svelte"],
			customSyntax: "postcss-html"
		}
	],
	ignoreFiles: [
		"**/node_modules/**",
		"**/coverage/**",
		"**/reports/**",
		"**/dist/**",
		"**/generated/**"
	],
	rules
};
