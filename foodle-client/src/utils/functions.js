import FoodleAPI from "./api";
import CONSTANTS from "./constants";

const EXPIRY_TIME = 1000 * 60 * 60; //1d

export const isObjectEmpty = (obj) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const onShare = async (document, navigator, text, pUrl) => {
  if (!document || !text) throw new Error("parameter are missing");

  const title = document.title;
  const url =
    pUrl ||
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
      localStorageKey = CONSTANTS.LOCAL_STORAGE_INGREDIENTS_KEY;
      innerKey = "ingredients";
      break;
    case Entity.TAG:
      localStorageKey = CONSTANTS.LOCAL_STORAGE_TAGS_KEY;
      innerKey = "tags";
      break;
    default:
      throw Error(`Entity: ${entity} is unkown`);
  }

  try {
    const local = window.localStorage.getItem(localStorageKey);
    const storedObject = JSON.parse(local);

    if (
      new Date(storedObject?.savedAt).getTime() - new Date().getTime() <
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
