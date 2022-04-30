import React from "react";

const Button = ({ variant, children }) => {
  const classes = ["button"];

  switch (variant) {
    case "outline":
      classes.push("outline");
      break;

    default:
      break;
  }

  return <button className={classes.join(" ")}>{children}</button>;
};

export default Button;
