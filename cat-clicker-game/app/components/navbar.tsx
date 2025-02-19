"use client";

import { useState } from "react";

const navgateBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    return (
      <nav>
        <button onClick={toggle}>Cat-alog</button>
        <div className={isOpen ? "open" : ""}>
          <h1>HI</h1>
        </div>
        <button onClick={toggle}>Settings</button>
      </nav>
    );
  }

export default navgateBar;