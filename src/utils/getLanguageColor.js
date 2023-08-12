import { LANGUAGE_COLORS } from "@/constants";

export const getLanguageColor = (language) => {
    return LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
};