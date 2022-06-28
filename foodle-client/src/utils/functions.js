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

export const retrieveIngredientList = async (window) => {
  const api = new FoodleAPI();

  const { data } = await api.getIngredientConfig();

  if (window) {
    window.localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_INGREDIENTS_KEY,
      JSON.stringify({ ingredients: data, savedAt: new Date().getTime() })
    );
  }

  return data;
};

export const getAllIngredients = async (window) => {
  if (typeof window !== "undefined") {
    try {
      const local = window.localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_INGREDIENTS_KEY
      );

      const storedObject = JSON.parse(local);

      if (
        new Date(storedObject?.savedAt).getTime() - new Date().getTime() <
        EXPIRY_TIME
      ) {
        return storedObject.ingredients;
      }
    } catch (err) {
      console.error(err);
    }
  }
  return await retrieveIngredientList(window);
};
