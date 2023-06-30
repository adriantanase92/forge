module.exports = {
	////////////////////////////////////////////////////////////////////////
	/// POSSIBLE PROBLEMS
	////////////////////////////////////////////////////////////////////////

	// enforce `return` statements in callbacks of array methods
	"array-callback-return": "error",
	// disallow template literal placeholder syntax in regular strings
	"no-template-curly-in-string": "error",
	// disallow unused private class members
	"no-unused-private-class-members": "error",

	////////////////////////////////////////////////////////////////////////
	/// CONSISTENCY
	////////////////////////////////////////////////////////////////////////

	// require braces around arrow function bodies
	"arrow-body-style": ["error", "as-needed"],
	// enforce camelcase naming convention
	"camelcase": "error",
	// require `return` statements to either always or never specify values
	"consistent-return": "error",
	// enforce consistent naming when capturing the current execution
	// context
	"consistent-this": ["error", "self"],
	// enforce consistent brace style for all control statements
	"curly": ["error", "all"],
	// enforce default clauses in switch statements to be last
	"default-case-last": "error",
	// require the use of `===` and `!==`
	"eqeqeq": [
		"error",
		"always",
		{
			null: "ignore"
		}
	],
	// require function names to match the name of the variable or property
	// to which they are assigned
	"func-name-matching": "error",
	// enforce the consistent use of either `function` declarations
	// or expressions
	"func-style": [],
	// require constructor names to begin with a capital letter
	"new-cap": [
		"error",
		{
			capIsNewExceptions: []
		}
	],
	// disallow `Array` constructors
	"no-array-constructor": "error",
	// disallow the use of `arguments.caller` or `arguments.callee`
	"no-caller": "error",
	// disallow empty functions. Make one noop somewhere and that's all.
	"no-empty-function": "error",
	// disallow unnecessary calls to `.bind()`
	"no-extra-bind": "error",
	// disallow unnecessary labels
	"no-extra-label": "error",
	// disallow leading or trailing decimal points in numeric literals
	"no-floating-decimal": "error",
	// disallow shorthand type conversions
	"no-implicit-coercion": "error",
	// disallow declarations in the global scope
	"no-implicit-globals": "error",
	// disallow the use of `eval()`-like methods
	"no-implied-eval": "error",
	// disallow inline comments after code
	"no-inline-comments": "error",
	// disallow the use of the `__iterator__` property
	"no-iterator": "error",
	// disallow labels that share a name with a variable
	"no-label-var": "error",
	// disallow unnecessary nested blocks
	"no-lone-blocks": "error",
	// disallow function declarations that contain unsafe references inside
	// loop statements
	"no-loop-func": "error",
	// disallow use of chained assignment expressions
	"no-multi-assign": "error",
	// disallow multiline strings using \
	"no-multi-str": "error",
	// disallow nested ternary expressions
	"no-nested-ternary": "error",
	// disallow `new` operators with the `Function` object
	"no-new-func": "error",
	// disallow `Object` constructors
	"no-new-object": "error",
	// disallow `new` operators with the `String`, `Number`,
	// and `Boolean` objects
	"no-new-wrappers": "error",
	// disallow reassigning `function` parameters
	"no-param-reassign": "error",
	// disallow the use of the `__proto__` property
	"no-proto": "error",
	// disallow assignment operators in `return` statements
	"no-return-assign": "error",
	// disallow initializing variables to `undefined`
	"no-undef-init": "error",
	// disallow ternary operators when simpler alternatives exist
	"no-unneeded-ternary": "error",
	// disallow unused variables.
	"no-unused-vars": [
		"error",
		// allow by intention when adding underscore at the end
		{
			vars: "all",
			args: "after-used",
			argsIgnorePattern: "_$"
		}
	],
	// disallow unnecessary computed property keys in objects and classes
	"no-useless-computed-key": "error",
	// disallow unnecessary constructors
	"no-useless-constructor": "error",
	// disallow redundant return statements
	"no-useless-return": "error",
	// enforce variables to be declared separately in functions
	"one-var": ["error", "never"],
	// require using arrow functions for callbacks
	"prefer-arrow-callback": "error",
	// require `const` declarations for variables that are never reassigned
	// after declared
	"prefer-const": "error",
	// disallow `parseInt()` and `Number.parseInt()` in favor of binary,
	// octal, and hexadecimal literals
	"prefer-numeric-literals": "error",
	// disallow use of `Object.prototype.hasOwnProperty.call()`
	// and prefer use of `Object.hasOwn()`
	"prefer-object-has-own": "error",
	// require using Error objects as Promise rejection reasons
	"prefer-promise-reject-errors": "error",
	// disallow use of the `RegExp` constructor in favor of regular
	// expression literals
	"prefer-regex-literals": "error",
	// require rest parameters instead of `arguments`
	"prefer-rest-params": "error",
	// require spread operators instead of `.apply()`
	"prefer-spread": "error",
	// require quotes around object literal property names
	"quote-props": ["error", "consistent"],
	// enforce the consistent use of the radix argument when using
	// `parseInt()`
	"radix": "error",
	// disallow async functions which have no `await` expression
	"require-await": "error",
	// enforce consistent spacing after the `//` or `/*` in a comment
	"spaced-comment": [
		"error",
		"always",
		{
			line: {
				markers: ["/"],
				exceptions: ["/"]
			},
			block: {
				markers: ["!"],
				exceptions: ["*"],
				balanced: true
			}
		}
	],
	// require symbol descriptions
	"symbol-description": "error",
	// require or disallow "Yoda" conditions
	"yoda": ["error", "never"],

	////////////////////////////////////////////////////////////////////////
	/// LAYOUT & FORMATTING
	////////////////////////////////////////////////////////////////////////

	"padding-line-between-statements": [
		"error",
		// blank lines after var, let, const
		{
			blankLine: "always",
			prev: ["const", "let", "var"],
			next: "*"
		},
		// keep successive var, let, const grouped without new lines
		{
			blankLine: "any",
			prev: ["const", "let", "var"],
			next: ["const", "let", "var"]
		},
		// blank lines after import
		{
			blankLine: "always",
			prev: ["import"],
			next: "*"
		},
		// keep successive import grouped without new lines
		{
			blankLine: "any",
			prev: ["import"],
			next: ["import"]
		},
		// blank lines before if switch, for, while, do blocks
		{
			blankLine: "always",
			next: ["if", "for", "while", "do", "switch", "function"],
			prev: "*"
		},
		// blank lines after if switch, for, while, do blocks
		{
			blankLine: "always",
			prev: ["if", "for", "while", "do", "switch", "function"],
			next: "*"
		}
	]
};
