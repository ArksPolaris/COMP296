"use client";

import { useBalance } from "./contexts/balanceContext";
import { useClick } from "./contexts/clickContext";
import { useUpgrade } from "./contexts/upgradeContext";
import { usePowerUp } from "./contexts/powerupsContext";

export function Clicker() {
    const { addFunds } = useBalance();
    const { totalClicks, increment } = useClick();
    const { clickPower } = useUpgrade();

    const { clickPowerActive, powerFactor } = usePowerUp();
    
    const handleClick = () => {
        increment();
        if (totalClicks % (Math.floor(Math.random() * 100) + (totalClicks / 10)) == 0) addFunds(10);
        const eClickPower = clickPowerActive ? powerFactor * clickPower : clickPower;
        addFunds(eClickPower);
    };

    return (
        <button 
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={handleClick}
        >
            <img
                className="dark:invert"
                src="/petbowl.svg"
                alt="Petbowl graphic"
                width={20}
                height={20}
            />
            Food
        </button>
    )
}
