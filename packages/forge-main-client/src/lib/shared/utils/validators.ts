import type { FieldsTranslations, TranslationFunctions } from '$i18n/i18n-types';
import { emailRegex, passwordRegex } from './regex';

type textValidatorParams = {
	value: string;
	fieldName: keyof FieldsTranslations;
	minCharacters: number;
	maxCharacters: number;
	t: TranslationFunctions;
};

export const textValidator = ({
	value,
	fieldName,
	minCharacters,
	maxCharacters,
	t
}: textValidatorParams): string | null => {
	if (!value?.length) {
		return t.errors.required({ field: t.fields[fieldName].text() });
	}

	if (value.length < minCharacters) {
		return t.errors.minCharacters({ number: minCharacters });
	}

	if (value.length > maxCharacters) {
		return t.errors.maxCharacters({ number: maxCharacters });
	}

	return null;
};

export const checkboxValidator = (value: boolean, error: string): string | null => {
	return value === false ? error : null;
};

export const emailValidator = (email: string, t: TranslationFunctions): string | null => {
	if (!email?.length) {
		return t.errors.required({ field: t.fields.email.text() });
	}

	return emailRegex.test(email) ? null : t.errors.invalidEmail();
};

export const passwordValidator = (password: string, t: TranslationFunctions): string | null => {
	if (!password?.length) {
		return t.errors.required({ field: t.fields.password.text() });
	}

	return passwordRegex.test(password) ? null : t.errors.invalidPassword();
};

export const selectValidator = (value: string | number, t: TranslationFunctions): string | null => {
	if (typeof value === 'string' && (!value?.length || value === null || value === '')) {
		return t.errors.requiredSelect();
	}

	if (typeof value === 'number' && value === null) {
		return t.errors.requiredSelect();
	}

	return null;
};
