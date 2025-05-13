'use client';
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
    setReadouts((prevState) => [msg, ...prevState.slice(0,4)]);
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
