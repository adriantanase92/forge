module.exports = {
	///////////////////////////////////////////////////////////////////////////
	/// Avoid errors
	///////////////////////////////////////////////////////////////////////////

	/// Color /////////////////////////////////////////////////////////////////

	// Disallow invalid hex colors.
	"color-no-invalid-hex": true,

	/// Font family ///////////////////////////////////////////////////////////

	// Disallow duplicate font family names.
	"font-family-no-duplicate-names": true,
	// Disallow missing generic families in lists of font family names.
	"font-family-no-missing-generic-family-keyword": true,

	/// Named grid areas /////////////////////////////////////////////////////

	// Disallow invalid named grid areas.
	"named-grid-areas-no-invalid": true,

	/// Function //////////////////////////////////////////////////////////////

	// Disallow an unspaced operator within calc functions.
	"function-calc-no-unspaced-operator": true,
	// Disallow direction values in linear-gradient() calls that are not valid
	// according to the standard syntax.
	"function-linear-gradient-no-nonstandard-direction": true,
	// Disallow unknown functions (rule disabled for scss).
	"function-no-unknown": true,

	/// String ////////////////////////////////////////////////////////////////

	// Disallow (unescaped) newlines in strings.
	"string-no-newline": true,

	/// Unit //////////////////////////////////////////////////////////////////

	// Disallow unknown units.
	"unit-no-unknown": true,

	/// Custom properties /////////////////////////////////////////////////////

	// Disallow missing var function for custom properties.
	"custom-property-no-missing-var-function": true,

	/// Property //////////////////////////////////////////////////////////////

	// Disallow unknown properties.
	"property-no-unknown": true,

	/// Keyframe declaration //////////////////////////////////////////////////

	// Disallow !important within keyframe declarations.
	"keyframe-declaration-no-important": true,

	/// Declaration block /////////////////////////////////////////////////////

	// Disallow duplicate custom properties within declaration blocks.
	"declaration-block-no-duplicate-custom-properties": true,
	// Disallow duplicate properties within declaration blocks.
	"declaration-block-no-duplicate-properties": true,
	// Disallow shorthand properties that override related longhand properties.
	"declaration-block-no-shorthand-property-overrides": true,

	/// Block /////////////////////////////////////////////////////////////////

	// Disallow empty blocks.
	"block-no-empty": true,

	/// Selectors /////////////////////////////////////////////////////////////

	// Disallow unknown pseudo-class selectors.
	"selector-pseudo-class-no-unknown": [
		true,
		{
			// Svelte add global pseudo class selector.
			ignorePseudoClasses: ["global"]
		}
	],
	// Disallow unknown pseudo-element selectors.
	"selector-pseudo-element-no-unknown": true,
	// Selectors - Disallow unknown type selectors.
	"selector-type-no-unknown": true,

	/// Media feature /////////////////////////////////////////////////////////

	// Disallow unknown media feature names.
	"media-feature-name-no-unknown": true,

	/// At rule ///////////////////////////////////////////////////////////////

	// Disallow unknown at-rules (rule disabled for scss).
	"at-rule-no-unknown": true,

	/// General / Sheet ///////////////////////////////////////////////////////

	// Disallow selectors of lower specificity from coming after overriding
	// selectors of higher specificity.
	"no-descending-specificity": null,
	// Disallow duplicate @import rules within a stylesheet.
	"no-duplicate-at-import-rules": true,
	// Disallow duplicate selectors within a stylesheet.
	"no-duplicate-selectors": true,
	"no-empty-source": true,
	// Disallow double-slash comments (rule disabled for scss).
	"no-invalid-double-slash-comments": true,
	// Disallow invalid position @import rules within a stylesheet.
	"no-invalid-position-at-import-rule": true,

	///////////////////////////////////////////////////////////////////////////
	/// Enforce conventions
	///////////////////////////////////////////////////////////////////////////

	/// Alpha-value ///////////////////////////////////////////////////////////

	// Specify percentage or number notation for alpha-values (Autofixable).
	"alpha-value-notation": "percentage",

	/// Hue ///////////////////////////////////////////////////////////////////

	// Specify number or angle notation for degree hues (Autofixable).
	"hue-degree-notation": "angle",

	/// Color /////////////////////////////////////////////////////////////////

	// Specify modern or legacy notation for applicable color-functions
	// (Autofixable).
	"color-function-notation": "modern",
	// Require or disallow alpha channel for hex colors.
	"color-hex-alpha": "never",
	// Specify `short` or `long` notation for hex colors (Autofixable).
	"color-hex-length": "long",
	// Require (where possible) or disallow named colors.
	"color-named": null,
	// Disallow hex colors.
	"color-no-hex": null,

	/// Length ////////////////////////////////////////////////////////////////

	// Disallow units for zero lengths (Autofixable).
	"length-zero-no-unit": true,

	/// Font family ///////////////////////////////////////////////////////////

	// Specify whether or not quotation marks should be used around font family
	// names (Autofixable).
	"font-family-name-quotes": "always-where-recommended",

	/// Function //////////////////////////////////////////////////////////////

	// Disallow scheme-relative urls.
	"function-url-no-scheme-relative": true,
	// Require or disallow quotes for urls.
	"function-url-quotes": "always",

	/// Number ////////////////////////////////////////////////////////////////

	// Limit the number of decimal places allowed in numbers.
	"number-max-precision": 5,

	/// Shorthand property ////////////////////////////////////////////////////

	// Disallow redundant values in shorthand properties (Autofixable).
	"shorthand-property-no-redundant-values": true,

	// Limit the number of declarations within a single-line declaration block.
	"declaration-block-single-line-max-declarations": 1,

	///////////////////////////////////////////////////////////////////////////
	/// Stylistic issues (Not handled by pretty printers)
	///////////////////////////////////////////////////////////////////////////

	// Specify lowercase or uppercase for type selectors.
	"selector-type-case": "lower",
	// Require or disallow an empty line before at-rules (Autofixable).
	"at-rule-empty-line-before": [
		"always",
		{
			except: ["blockless-after-same-name-blockless", "first-nested"],
			ignore: ["after-comment"],
			ignoreAtRules: ["else"]
		}
	]
};
