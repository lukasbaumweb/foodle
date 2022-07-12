import FoodleAPI from "./api";
import { CONFIG } from "./config";

/**
 * Determines when localstorage cache should
 * be expired (currently: 1 day)
 */
const EXPIRY_TIME = 1000 * 60 * 60;

/**
 * Checks whether object is empty
 * @param {Object} obj custom object
 * @returns true if object is empty
 */
export const isObjectEmpty = (obj) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

/**
 * Checks if email corresponds with common email format (name@domain.tld)
 * @param {String} email common email string
 * @returns true if email correspnds with format
 */
export const validateEmail = (email) => {
  /* eslint-disable no-useless-escape */
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

/**
 * Shares custom text and url with navigator url
 * @param {*} text to be shown in shared media
 * @param {*} customUrl to be shared
 */
export const onShare = async (text, customUrl) => {
  if (!text) throw new Error("text is missing");

  const title = document.title;
  const url =
    customUrl ||
    (document.querySelector("link[rel=canonical]")
      ? document.querySelector("link[rel=canonical]").href
      : document.location.href);
  try {
    await navigator.share({
      title,
      url,
      text,
    });
  } catch (err) {
    console.warning(`Couldn't share ${err}`);
  }
};

/**
 * Capitalizes any string
 * @param {String} word custom string
 * @returns word as capitalized string
 */
export const capitalize = (word) => {
  return `${word.charAt(0).toUpperCase()}${word.substring(1, word.length)}`;
};

/**
 * @enum { String }
 */
export const Entity = {
  INGREDIENT: "ingredient",
  TAG: "tag",
};

/**
 * Retrieves entity values from database or localstorage if values are stored in cache
 * @param {Object} window
 * @param {Entity} entity
 * @returns entity values from database or cache (depends on expiry time)
 */
export const getLocalStorage = async (entity) => {
  let localStorageKey = "",
    innerKey = "";

  switch (entity) {
    case Entity.INGREDIENT:
      localStorageKey = CONFIG.LOCAL_STORAGE_INGREDIENTS_KEY;
      innerKey = "ingredients";
      break;
    case Entity.TAG:
      localStorageKey = CONFIG.LOCAL_STORAGE_TAGS_KEY;
      innerKey = "tags";
      break;
    default:
      throw Error(`Entity: ${entity} is unkown`);
  }

  try {
    const local = window.localStorage.getItem(localStorageKey);
    const storedObject = JSON.parse(local);

    if (
      new Date().getTime() - new Date(storedObject?.savedAt).getTime() <
      EXPIRY_TIME
    ) {
      return storedObject[innerKey];
    }
  } catch (err) {
    console.error(err);
  }

  const api = new FoodleAPI();

  const { data } = await api.getConfig(entity);

  if (data)
    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({ [innerKey]: data, savedAt: new Date().getTime() })
    );

  return data;
};
