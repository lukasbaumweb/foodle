export const CONFIG = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_FOODLE_PROD_API_URL
      : process.env.REACT_APP_FOODLE_TEST_API_URL,
  LOCAL_STORAGE_USER_METADATA: "foodleData",
  LOCAL_STORAGE_SESSION_KEY: "foodleSession",
  SESSION_EXPIRED: "session expired",
  SESSION_EXPIRED_ABBR: "se",
  LOCAL_STORAGE_INGREDIENTS_KEY: "ingredients",
  LOCAL_STORAGE_TAGS_KEY: "tags",
  LOCAL_STORAGE_COOKIE_KEY: "yummy",
  TYPES: {
    CARD: "card",
  },
};
