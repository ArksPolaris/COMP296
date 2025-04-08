"use client";

import { catIds, clickPower } from "./upgrade";
import { clickUtil, clicks } from "./clicker";

class ClickPowerUp {
    public active: boolean = false;
    private cooldownActive: boolean = false;
    private powerUpCooldown: number = 30; // seconds

    constructor(private originalClickPower: number, public clickPowerFactor: number) {}

    public activate() {
        if (!this.active && !this.cooldownActive) {
            this.active = true;

            // Increment click power
            const pwClickPower = this.originalClickPower * this.clickPowerFactor;

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

export function ClickUp() {
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

export function CatsUp() {
    return (
        <button
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${catIds.length < 10 ? 'disabled' : ''}`}
            onClick={() => megaCat.activate()}
            disabled={megaCat.isCooldownActive()}
        >
        Cat Brigade
        </button>
    )
}