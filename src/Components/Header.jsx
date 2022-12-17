import React from "react";
import "./Body.css"

const Header = ({logo}) => {
  return (
    <header className="App-header">
      <h3><img src={logo} alt=""/></h3>
    </header>
  );
};

export default Header;