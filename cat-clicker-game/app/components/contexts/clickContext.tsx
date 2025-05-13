import React, { createContext, useContext, useState, ReactNode } from "react";

type ClickContextType = {
    totalClicks: number;
    increment: () => void;
    setTotalClicks: (val: number) => void;
};

const ClickContext = createContext<ClickContextType | undefined>(undefined);

export const ClickProvider = ({ children }: { children: ReactNode }) => {
    const [totalClicks, setTotalClicks] = useState<number>(0);

    const increment = () => {
        setTotalClicks((prev) => prev + 1);
    };



    return (
        <ClickContext.Provider
            value={{
                totalClicks,
                increment,
                setTotalClicks,
            }}
        >
            {children}
        </ClickContext.Provider>
    );
};

export const useClick = () => {
    const context = useContext(ClickContext);
    if (!context) {
        throw new Error("useClick must be used within a ClickProvider");
    }
    return context;
};