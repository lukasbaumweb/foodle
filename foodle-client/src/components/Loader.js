import React, { useState, useEffect } from "react";
import { de_DE } from "../i18n/de_DE";
import "./../assets/styles/loader.scss";

const sentences = de_DE["loaderSentences"];

const TIMING = 2500;

const Loader = ({ hideText }) => {
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);

  useEffect(() => {
    let timer;
    if (!hideText) {
      timer = setInterval(() => {
        const randIndex = Math.floor(Math.random() * sentences.length);
        setCurrentSentence(sentences[randIndex]);
      }, TIMING);
    }

    return () => {
      timer && window?.clearInterval(timer);
    };
  }, [hideText]);

  return (
    <div className="full-size">
      <div className="center">
        <div className="loader">
          <div className="inner-loader"></div>
        </div>
        {!hideText && <p className="loader-text">{currentSentence} ...</p>}
      </div>
    </div>
  );
};

export default Loader;
