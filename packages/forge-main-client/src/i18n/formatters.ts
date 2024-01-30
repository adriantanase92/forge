import type { FormattersInitializer } from 'typesafe-i18n';
import type { Formatters, Locales } from './i18n-types';

export const initFormatters = ((locale_: Locales) => {
    const formatters: Formatters = {
        // add your formatter functions here
    };

    return formatters;
}) satisfies FormattersInitializer<Locales, Formatters>;
