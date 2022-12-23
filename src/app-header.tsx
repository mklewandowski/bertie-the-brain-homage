import React from "react";
import brain from "./brain.png";

import "./app-header.css";

export const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <img className="app-header-image" src={brain} alt="bertie the brain" />
    </header>
  );
}
