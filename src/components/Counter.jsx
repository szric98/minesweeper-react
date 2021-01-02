import React from "react";

const Counter = ({ count, classes }) => {
  return (
    <div className={classes}>
      <span className={`count n${Math.floor(count / 100)}`}></span>
      <span className={`count n${Math.floor(count / 10)}`}></span>
      <span className={`count n${count % 10}`}></span>
    </div>
  );
};

export default Counter;
