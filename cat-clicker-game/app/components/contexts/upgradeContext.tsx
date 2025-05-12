'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

type UpgradeContextType = {
    clickPower: number;
    fCost: number;
    cCost: number;
    sCost: number;
    catCount: number;
    shelters: number;
    setClickPower: (val: number) => void;
    setFCost: (val: number) => void;
    setCCost: (val: number) => void;
    setSCost: (val: number) => void;
    setCatCount: (val: number) => void;
    setShelters: (val: number) => void;
    tempCats: (dur: number) => void;
};

const UpgradeContext = createContext<UpgradeContextType | undefined>(undefined);

export const UpgradeProvider = ({ children }: { children: ReactNode }) => {
    const [clickPower, setClickPower] = useState<number>(1);
    const [fCost, setFCost] = useState<number>(25);
    const [cCost, setCCost] = useState<number>(100);
    const [sCost, setSCost] = useState<number>(500);
    const [catCount, setCatCount] = useState<number>(0);
    const [shelters, setShelters] = useState<number>(0);

    const tempCats = (dur: number) => {
        setCatCount(prev => prev + 10);

        setTimeout(() => {
            setCatCount(prev => prev - 10);
        }, dur * 1000);
    };

    return (
        <UpgradeContext.Provider
            value={{
                clickPower,
                fCost,
                cCost,
                sCost,
                catCount,
                shelters,
                setClickPower,
                setFCost,
                setCCost,
                setSCost,
                setCatCount,
                setShelters,
                tempCats,
            }}
        >
            {children}
        </UpgradeContext.Provider>
    );
};

export const useUpgrade = () => {
    const context = useContext(UpgradeContext);
    if (!context) {
        throw new Error("useUpgrade must be used within a UpgradeProvider");
    }
    return context;
};