import React from "react";

function SmileyButton({ onClick, gameState }) {
  return <button className={`smiley ${gameState}`} onClick={onClick} />;
}

export default SmileyButton;
