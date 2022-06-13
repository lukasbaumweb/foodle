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
