import React from "react";

function DropdownMenu({ onMenuItemClick }) {
  return (
    <div className="dropdown-menu">
      <button
        className="dropdown-item"
        onClick={() => onMenuItemClick("beginner")}
      >
        Beginner
      </button>
      <button
        className="dropdown-item"
        onClick={() => onMenuItemClick("intermediate")}
      >
        Intermediate
      </button>
      <button
        className="dropdown-item"
        onClick={() => onMenuItemClick("advanced")}
      >
        Advanced
      </button>
    </div>
  );
}

export default DropdownMenu;
