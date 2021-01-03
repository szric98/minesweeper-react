import React from "react";

const Tile = ({
  classes,
  hidden,
  onClick,
  gameState,
  onContextMenu,
  hasFlag,
}) => {
  return (
    <button
      className={getClasses(hidden, classes, hasFlag)}
      onClick={onClick}
      disabled={gameState === "win" || gameState === "dead"}
      onContextMenu={onContextMenu}
    ></button>
  );
};

const getClasses = (hidden, classes, hasFlag) => {
  if (hasFlag && hidden) return "cell flag";
  if (!hidden) return classes;
  return "cell";
};

export default Tile;
