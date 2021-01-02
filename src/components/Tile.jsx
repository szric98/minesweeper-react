import React from "react";

const Tile = ({ classes, hidden, onClick, gameState }) => {
  return (
    <button
      className={hidden ? "cell" : classes}
      onClick={onClick}
      disabled={gameState}
    ></button>
  );
};

export default Tile;
