import { useEffect } from "react";
import { useBalance } from "./contexts/balanceContext";
import { useUpgrade } from "./contexts/upgradeContext";

export function AutoClickingTool() {
    const { catCount } = useUpgrade();
    const { addFunds } = useBalance();

    useEffect(() => {
        if (catCount > 0) {
            const intID = setInterval(() => {
                addFunds(catCount);
            }, 1000);

            return () => clearInterval(intID);
        }
    }, [catCount, addFunds]);

    return null;
}