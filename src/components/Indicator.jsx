import React from "react";
import Counter from "./Counter";
import SmileyButton from "./SmileyButton";

function Indicator({ flags, time, onReset }) {
  return (
    <div className="indicator">
      <Counter count={time} classes="time" />
      <SmileyButton onClick={onReset} />
      <Counter count={flags} classes="flags-counter" />
    </div>
  );
}

export default Indicator;
