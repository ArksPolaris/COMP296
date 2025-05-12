'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

type BalanceContextType = {
    balance: number;
    stickyBalance: number;
    moneySpent: number;
    addFunds: (val: number) => void;
    spendFunds: (val: number) => void;
    addStickyFunds: (val: number) => void;
    setBalance: (val: number) => void;
    setMoneySpent: (val: number) => void;
    setStickyBalance: (val: number) => void;
};

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number>(0);
    const [stickyBalance, setStickyBalance] = useState<number>(0);
    const [moneySpent, setMoneySpent] = useState<number>(0);

    const addFunds = (amount: number) => {
        setBalance((prev) => prev + amount);
        if (amount > 0) {
            setStickyBalance((prev) => prev + amount);
        }
    };

    const spendFunds = (amount: number) => {
        setBalance((prev) => prev - amount);
        if (amount < 0) {
            setMoneySpent((prev) => prev + Math.abs(amount));
        }
    };

    const addStickyFunds = (amount: number) => {
        setStickyBalance((prev) => prev + amount);
    };

    return (
        <BalanceContext.Provider
            value={{
                balance,
                stickyBalance,
                moneySpent,
                addFunds,
                spendFunds,
                addStickyFunds,
                setBalance,
                setMoneySpent,
                setStickyBalance,
            }}
        >
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error("useBalance must be used within a BalanceProvider");
    }
    return context;
};