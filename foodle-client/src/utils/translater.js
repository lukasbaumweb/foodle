import { de_DE } from "../i18n/de_DE";
import { en_GB } from "../i18n/en_GB";

const langCode = process.env.REACT_APP_LANGUAGE || "de_DE";

/**
 * Contains all valid languages to select
 */
export const languages = {
  de_DE: de_DE,
  en_GB: en_GB,
};

/**
 * Selected Language
 */
const defaultLanguage = languages[langCode] || languages["de_DE"];

/**
 * Translates a message based of it's code
 * @param {String} code
 * @param {languages} language
 * @returns translated String
 */
export const translate = (code, language = defaultLanguage) => {
  let result;

  if (code === "unknown-error") {
    return language[code];
  }

  if (code.startsWith("auth-error/")) {
    result = language["auth-error"][code];
  }

  if (code.startsWith("validation-error/")) {
    return language["validation-error"][code];
  }
  return result;
};
