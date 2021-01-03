import React, { useState } from "react";
import Minesweeper from "./components/Minesweeper";
import DropdownMenu from "./components/DropdownMenu";
import "./Minesweeper.css";

const levels = {
  beginner: {
    mines: 10,
    size: { x: 9, y: 9 },
    count: 81,
  },
  intermediate: {
    mines: 40,
    size: { x: 16, y: 16 },
    count: 256,
  },
  advanced: {
    mines: 99,
    size: { x: 16, y: 32 },
    count: 512,
  },
};

function App() {
  const [difficulty, setDifficulty] = useState(levels.intermediate);

  const handleMenuItemClick = (id) => {
    if (id === "beginner") {
      setDifficulty(levels.beginner);
    } else if (id === "intermediate") {
      setDifficulty(levels.intermediate);
    } else if (id === "advanced") {
      setDifficulty(levels.advanced);
    }
    console.log(difficulty);
  };

  return (
    <React.Fragment>
      <DropdownMenu onMenuItemClick={handleMenuItemClick} />
      <Minesweeper key={difficulty} difficulty={difficulty} />
    </React.Fragment>
  );
}

export default App;
