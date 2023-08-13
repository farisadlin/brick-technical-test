import { LANGUAGE_COLORS } from "@/constants";

/**
 * Retrieves the associated color for a given programming language.
 * If the language is not found in the `LANGUAGE_COLORS` mapping,
 * it defaults to the color specified for 'default' in `LANGUAGE_COLORS`.
 * 
 * @param {string} language - The name of the programming language.
 * @returns {string} The hexadecimal color code associated with the given language or a default color.
 */
export const getLanguageColor = (language) => {
    return LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
};