import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { de_DE } from "../i18n/de_DE";
import "./../assets/styles/loader.scss";

const sentences = de_DE["loaderSentences"];

const TIMING = 3000;

const Loader = ({ hideText }) => {
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);

  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

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
        <div className={`loader ${isDark && "dark-mode"}`}>
          <div className={`inner-loader ${isDark && "dark-mode"}`}></div>
        </div>
        {!hideText && <p className="loader-text">{currentSentence} ...</p>}
      </div>
    </div>
  );
};

export default Loader;
