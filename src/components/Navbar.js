import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-gray-200 w-full p-4">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Party Game
          </a>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
