import React from "react";
import { useBalance } from "./contexts/balanceContext";
import { useUpgrade } from "./contexts/upgradeContext";
import { AchievementsProvider } from "./contexts/achievementsContext";
import { Stats } from "./contexts/achievementsContext";


export function AchievementsWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const {moneySpent, stickyBalance } = useBalance();
    const { catCount, shelters } = useUpgrade();

    const stats: Stats = {
        moneyMade: stickyBalance,
        catsOwned: catCount,
        sheltersOwned: shelters,
        moneySpent: moneySpent,
    };

    return (
        <AchievementsProvider stats={stats}>
            {children}
        </AchievementsProvider>
    );
}