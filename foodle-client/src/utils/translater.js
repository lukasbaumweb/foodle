import { de_DE } from "../i18n/de_DE";

/**
 * Checks if language is set in .ENV.local file
 */
const langCode = process.env.REACT_APP_LANGUAGE || "de_DE";

/**
 * Prefixes
 */
export const CODES = {
  AUTH_ERROR: "auth-error/",
  VALIDATION_ERROR: "validation-error/",
  FOOD_UNITS: "food-unit/",
  INGREDIENT_NAME: "ingredient/",
};

/**
 * Contains all selectable languages to select
 */
export const languages = {
  de_DE: de_DE,
};

/**
 * Selected Language
 */
const defaultLanguage = languages[langCode] || languages["de_DE"];

/**
 * Translates a message based on code
 * @param {String} code
 * @param {languages} language
 * @returns translated string
 */
export const translate = (
  code = "unknown-error",
  value,
  language = defaultLanguage
) => {
  try {
    if (code === "unknown-error") {
      return language[code] || value;
    }

    if (code?.startsWith(CODES.AUTH_ERROR)) {
      return language["auth-error"][code] || value;
    }

    if (code?.startsWith(CODES.VALIDATION_ERROR)) {
      return language["validation-error"][code] || value;
    }

    if (code === CODES.FOOD_UNITS) {
      return language["foodUnits"][value] || value;
    }

    if (code === CODES.INGREDIENT_NAME) {
      return language["ingredients"][value] || value;
    }

    return language[code] || language["unknown-error"];
  } catch (err) {
    console.error(err);
    return value;
  }
};

export const getLanguage = (language = defaultLanguage) => {
  return language;
};
