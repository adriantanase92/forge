const rulesStylelintConfig = require("./stylelint-config/rules.cjs");
const rulesStylelintConfigSCSS = require("./stylelint-config-scss/rules.cjs");
const rules = {
	...rulesStylelintConfig,
	...rulesStylelintConfigSCSS
};

module.exports = {
	rules
};
