import React from "react";

const Tile = ({ classes, hidden, onClick, gameState }) => {
  return (
    <button
      className={hidden ? "cell" : classes}
      onClick={onClick}
      disabled={gameState === "win" || gameState === "dead"}
    ></button>
  );
};

export default Tile;
