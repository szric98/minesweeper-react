import React from "react";
import "../Minesweeper.css";

function DropdownMenu({ onMenuItemClick }) {
  return (
    <div className="dropdown">
      <button className="dropdown-btn">Difficulty</button>
      <div className="dropdown-content">
        <button onClick={() => onMenuItemClick("beginner")}>Beginner</button>
        <button onClick={() => onMenuItemClick("intermediate")}>
          Intermediate
        </button>
        <button onClick={() => onMenuItemClick("advanced")}>Advanced</button>
      </div>
    </div>
  );
}

export default DropdownMenu;
