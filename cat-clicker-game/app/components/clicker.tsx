"use client";

import { addfunds } from "./balance";

var clicks = 0;

function click() {
    clicks = clicks + 1;
    if (clicks%25 == 0) donation();
    addfunds(1);
    
}

function donation() {
    var random = Math.floor(Math.random() * 100);
    if (random > 45) {
        alert("An adopter came by and gave you a donation.");
        addfunds(45);
    } else {
        alert("Seems like no one came by to adopt a cat, but one of the locals gave a small donation.");
        addfunds(10);
    }
}

export default function Clicker() {
    return (
        <button 
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={click}
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