import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useUpgrade } from './upgradeContext';

type PowerUpContextType = {
    clickPower: number;
    clickPowerActive: boolean;
    powerFactor: number;
    activateClickPower: () => void;
    setPowerFactor: (val: number) => void;
};

const PowerUpContext = createContext<PowerUpContextType | undefined>(undefined);

export function PowerUpProvider({ children }: { children: ReactNode }) {
    const { clickPower } = useUpgrade();
    const [clickPowerActive, setClickPowerActive] = useState(false);
    const [powerFactor, setPowerFactor] = useState(clickPower);

    const activateClickPower = () => {
        if (!clickPowerActive) {
            setClickPowerActive(true);
            // Deactivate after 15 seconds
            setTimeout(() => {
                setClickPowerActive(false);
                startCooldown(120);
            }, 15000);
        }
    };

    const startCooldown = (seconds: number) => {
        setTimeout(() => {
            setClickPowerActive(false);
        }, seconds * 1000);
    };

    return (
        <PowerUpContext.Provider
            value={{
                clickPower,
                clickPowerActive,
                powerFactor,
                activateClickPower,
                setPowerFactor,
            }}
        >
            {children}
        </PowerUpContext.Provider>
    );
}

export function usePowerUp() {
    const context = useContext(PowerUpContext);
    if (!context) {
        throw new Error("usePowerUp must be used within a PowerUpProvider");
    }
    return context;
}

export function useClickPowerUp(initialPower: number, cooldownSeconds = 120) {
  const [active, setActive] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [powerFactor, setPowerFactor] = useState(initialPower);

  const activate = () => {
    if (!active && !cooldown) {
      setActive(true);
      // Deactivate after 15 seconds
      setTimeout(() => {
        setActive(false);
        startCooldown(cooldownSeconds);
      }, 15000);
    }
  };

  const startCooldown = (seconds: number) => {
    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
    }, seconds * 1000);
  };

  return {
    active,
    cooldown,
    activate,
    powerFactor,
    setPowerFactor,
  };
}

export function useMegaCat(cooldownSeconds = 120, durationSeconds = 60) {
    const [active, setActive] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const { tempCats } = useUpgrade();
  
    const activate = () => {
      if (!active && !cooldown) {
        setActive(true);
        // Spawn cats for durationSeconds
        tempCats(durationSeconds);
        setTimeout(() => {
          setActive(false);
          startCooldown(cooldownSeconds);
        }, durationSeconds * 1000);
      }
    };
  
    const startCooldown = (seconds: number) => {
      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
      }, seconds * 1000);
    };
  
    return {
      active,
      cooldown,
      activate,
    };
  }
  