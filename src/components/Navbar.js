import React from "react";

const Navbar = () => {
  return (
    <div>
      <a
        style={{
          textAlign: "center",
          backgroundColor: "lightgray",
          width: "100%",
          height: "50px",
          fontWeight: "bold",
          fontFamily: "Times New Roman",
          fontSize: "30px",
        }}
        className="navbar-brand"
        href="/"
      >
        Party Game
      </a>
    </div>
  );
};
export default Navbar;
