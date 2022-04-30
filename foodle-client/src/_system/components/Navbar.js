import React from "react";

const Navbar = ({ title, links, homeLink = "/" }) => {
  return (
    <header className="header">
      <a href={homeLink} title={title}>
        {title}
      </a>
      <nav className="navbar">
        <ul>
          {links?.map(({ text, href, title }) => (
            <li>
              <a href={href} title={title || ""}>
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
