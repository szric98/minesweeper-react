import React from "react";

const Tile = ({ classes, hidden, onClick }) => {
  return (
    <button className={hidden ? "cell" : classes} onClick={onClick}></button>
  );
};

export default Tile;
