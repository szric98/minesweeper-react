import React from "react";
import Counter from "./Counter";
import SmileyButton from "./SmileyButton";
import Timer from "./Timer";

function Indicator({ flags, time, onReset, gameState }) {
  return (
    <div className="indicator">
      <Timer count={time} classes="time" gameState={gameState} />
      <SmileyButton onClick={onReset} gameState={gameState} />
      <Counter count={flags} classes="flags-counter" />
    </div>
  );
}

export default Indicator;
