const rulesESlint = require("./eslint-plugin/rules.cjs");
const rulesESlintTS = require("./eslint-plugin-ts/rules.cjs");
const rules = {
	...rulesESlint,
	...rulesESlintTS
};

module.exports = {
	rules
};
