import React from "react";
import Counter from "./Counter";
import SmileyButton from "./SmileyButton";
import Timer from "./Timer";

function Indicator({ flags, time, onReset, gameState }) {
  return (
    <div className="indicator">
      <Counter count={flags} classes="flags-counter" />
      <SmileyButton onClick={onReset} gameState={gameState} />
      <Timer count={time} classes="time" gameState={gameState} />
    </div>
  );
}

export default Indicator;
