"use client";

import { funds, useDonation } from "./balance";
import { clickPower as power } from "./upgrade";
import { clickPowerUp } from "./powerups";
export let clicks = 0;

function useClick() {
    const { donate } = useDonation();

    const click = () => {
        clicks = clicks + 1;
        if (clicks%(Math.floor(Math.random() * 100) + (clicks/10)) == 0) donate();
        
        const eClickPower = clickPowerUp.active ? clickPowerUp.clickPowerFactor * power : power;
    
        funds(eClickPower);
        
        updateDisplay();
    };
    
    return { click };
}

export function clickUtil(x: number) {
    funds(x);
}

export default function Clicker() {
    return (
        <button 
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={useClick().click}
        >
            <img
                className="dark:invert"
                src="/petbowl.svg"
                alt="Petbowl graphic"
                width={20}
                height={20}
            />
            Star
        </button>
    )
}

export function updateDisplay() {
    const click = document.getElementById("click");
    if (click != null) {
        click.innerHTML = "Clicks: " + clicks;
    }
}