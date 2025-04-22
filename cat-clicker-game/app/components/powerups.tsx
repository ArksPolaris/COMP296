"use client";

import { catIds, clickPower } from "./upgrade";
import { clickUtil, clicks } from "./clicker";
import { stickyBalance as sBal } from "./balance";

class ClickPowerUp {
    public active: boolean = false;
    private cooldownActive: boolean = false;
    private powerUpCooldown: number = 30; // seconds

    constructor(private originalClickPower: number, public clickPowerFactor: number) {}

    public activate() {
        if (!this.active && !this.cooldownActive) {
            this.active = true;
            
            // Set a timer for deactivation
            setTimeout(() => {
                this.active = false;
                this.startCooldown(this.powerUpCooldown);
            }, 15000);
        }
    }

    private startCooldown(cooldown: number) {
        this.cooldownActive = true;

        // Set a timer for cooldown period
        setTimeout(() => {
            this.cooldownActive = false; // Reset cooldown state
        }, cooldown * 1000);
    }

    public isCooldownActive() {
        return this.cooldownActive;
    }
}

class MegaCat {
    public active: boolean = false;
    private cooldownActive: boolean = false;
    private powerUpCooldown: number = 120;
    private catDuration: number = 60;

    public activate() {
        if (!this.active && !this.cooldownActive) {
            this.active = true;

            for (let i = 0; i < 10; i++) {
                this.spawnCat();
            }

            // Set a timer for deactivation
            setTimeout(() => {
                this.active = false;
                this.startCooldown(this.powerUpCooldown);
            }, this.catDuration * 1000);
        }
    }

    private spawnCat() {
        const intID = setInterval(() => {
            clickUtil(1);
        }, 1000);

        setTimeout(() => {
            clearInterval(intID);
        }, this.catDuration * 1000);
    }

    private startCooldown(cooldown: number) {
        this.cooldownActive = true;

        setTimeout(() => {
            this.cooldownActive = false;
        }, cooldown * 1000);
    }

    public isCooldownActive() {
        return this.cooldownActive;
    }
}

export const clickPowerUp = new ClickPowerUp(clickPower, 2.5);
export const megaCat = new MegaCat();

function ClickUp() {
    return (
        <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${clicks < 50 ? 'disabled' : ''}`}
            onClick={() => clickPowerUp.activate()}
            disabled={clickPowerUp.isCooldownActive()} 
        >
        Clicks Up
        </button>
    );
}

function CatsUp() {
    return (
        <button
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${catIds < 10 ? 'disabled' : ''}`}
            onClick={() => megaCat.activate()}
            disabled={megaCat.isCooldownActive()}
        >
        Cat Brigade
        </button>
    )
}

export function PowerUps() {
    if (sBal >= 1000)
        {
    return (
        <div className="flex flex-col gap-4 row-start-2">
          <p>Power-Ups</p>
          <div className="flex gap-4">
            <ClickUp />
            <CatsUp />
          </div>
        </div>
        )
    }
    else {
        return (<p>To unlock this section, make $1000 dollars during your session.</p>)
    }
}