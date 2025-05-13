import React, { useEffect } from "react";
import { useReadouts } from "./contexts/ReadoutsContext";

export function Console() {
    const { readouts } = useReadouts();
    
    const displayedReadouts = readouts.slice(0,5);

    return (
      <div className="flex flex-col gap-4">
        {displayedReadouts.map((msg,index) => (
          <p key={index} className={index === 0 ? "console" : "consoleOld"}>
            <span>&nbsp;.&nbsp;</span>
            <span id={`readout${5-index}`}>{msg}</span>
            <br />
          </p>
        ))}
        <p className="console">
          <span>&nbsp;&gt;&nbsp;</span>
          <span id="readout1">{readouts[0]}</span>
          <span id="cursor" className="pulsate">
            |
          </span>
        </p>
      </div>
    );
  }