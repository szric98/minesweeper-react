import React, { useState, useEffect } from "react";
import Counter from "./Counter";

const Timer = ({ gameState }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (gameState === "") setSeconds(0);
    if (gameState === "dead" || gameState === "win") return;
    const interval = setInterval(() => {
      if (gameState === "started") setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  return <Counter count={seconds} classes={"time"} />;
};

export default Timer;
