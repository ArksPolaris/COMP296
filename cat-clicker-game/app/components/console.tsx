import React, { createContext, useContext, useState, ReactNode } from "react";

type ReadoutsContextType = {
  readouts: string[];
  displayMessage: (msg: string) => void;
};

const ReadoutsContext = createContext<ReadoutsContextType | undefined>(
  undefined
);

export function ReadoutsProvider({ children }: { children: ReactNode }) {
  const [readouts, setReadouts] = useState([
    "Welcome to the Cat Shelter",
    "",
    "",
    "",
    "",
  ]);

  function displayMessage(msg: string) {
    setReadouts((prevState) => [
      msg,
      prevState[0],
      prevState[1],
      prevState[2],
      prevState[3],
    ]);
  }

  return (
    <ReadoutsContext.Provider value={{ readouts, displayMessage }}>
      {children}
    </ReadoutsContext.Provider>
  );
}

export function useReadouts() {
  const context = useContext(ReadoutsContext);
  if (!context) {
    throw new Error("useReadouts must be used within a ReadoutsProvider");
  }
  return context;
}

export function Console() {
  const { readouts } = useReadouts();

  return (
    <div className="flex flex-col gap-4">
      <p className="consoleOld">
        <span>&nbsp;.&nbsp;</span>
        <span id="readout5">{readouts[4]}</span>
        <br />
        <span>&nbsp;.&nbsp;</span>
        <span id="readout4">{readouts[3]}</span>
        <br />
        <span>&nbsp;.&nbsp;</span>
        <span id="readout3">{readouts[2]}</span>
        <br />
        <span>&nbsp;.&nbsp;</span>
        <span id="readout2">{readouts[1]}</span>
        <br />
      </p>
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
