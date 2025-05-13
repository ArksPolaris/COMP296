'use client';
import { useBalance } from "./contexts/balanceContext";
import { useAchievements } from "./contexts/achievementsContext";
import { useUpgrade } from "./contexts/upgradeContext";
import { useEffect } from "react";
import { useClick } from "./contexts/clickContext";

function useAutoSave() {
    const {unlocked} = useAchievements();
    const { balance, moneySpent, stickyBalance } = useBalance();
    const { clickPower, fCost, cCost, sCost, catCount, shelters } = useUpgrade();
    const { totalClicks } = useClick();

    const autoSave = () => {
    
        const gameState = {
        totalClicks: totalClicks,
        stickyBalance: stickyBalance,
        moneySpent: moneySpent,
        balance: balance,
        clickPower: clickPower,
        shelters: shelters,
        fCost: fCost,
        cCost: cCost,
        sCost: sCost,
        catCount: catCount,
        unlockedAchievements: Array.from(unlocked),
    };
    
    localStorage.setItem("gameState", JSON.stringify(gameState));
    };
    
    return { autoSave };
}

export function Auto() {
    const { autoSave } = useAutoSave();
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        autoSave();
      }, 120000); // 2 minutes
  
      return () => clearInterval(intervalId);
    }, [autoSave]);
  
    return null; 
  }

export function Save() {
    const { unlocked } = useAchievements();
    const { balance, moneySpent, stickyBalance } = useBalance();
    const { clickPower, fCost, cCost, sCost, catCount, shelters } = useUpgrade();
    const { totalClicks } = useClick();

    function saveProgress() {
        const gameState = {
            totalClicks: totalClicks,
            stickyBalance: stickyBalance,
            moneySpent: moneySpent,
            balance: balance,
            clickPower: clickPower,
            shelters: shelters,
            fCost: fCost,
            cCost: cCost,
            sCost: sCost,
            catCount: catCount,
            unlockedAchievements: Array.from(unlocked),
        };
        localStorage.setItem("gameState", JSON.stringify(gameState));
    
        const json = JSON.stringify(gameState);
    
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "gameState.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    

    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 `}
            title="The save button will save your progress to local storage as well as a file."
            onClick={saveProgress}
        >
            <img
                className="dark:invert"
                src="/github.svg"
                alt="Test graphic"
                width={20}
                height={20}
            />
            Save
        </button>
        </div>
    )
}

export function Load() {
    const { restoreAchievements } = useAchievements();
    const { setBalance, setMoneySpent, setStickyBalance } = useBalance();
    const { setClickPower, setFCost, setCCost, setSCost, setCatCount, setShelters } = useUpgrade();
    const { setTotalClicks } = useClick();

    function loadProgress(event: Event) {
        const input = event.target as HTMLInputElement;
    
        if (input.files && input.files[0]) {
            const file = input.files[0];

            const validExt = /\.json$/i.test(file.name);
            const validMime = file.type === "application/json" || file.type === "";

            if (!validExt || !validMime) {
                alert("Invalid file type. Please select a .json file.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (fileEvent) {
                const saveState = fileEvent.target?.result;
                
                if (saveState) {
                    const gameState = JSON.parse(saveState as string);

                    setTotalClicks(gameState.totalClicks);
                    
                    setStickyBalance(gameState.stickyBalance);
                    setBalance(gameState.balance);
                    setMoneySpent(gameState.moneySpent);
    
                    setClickPower(gameState.clickPower);
                    setShelters (gameState.shelters);
                    setCatCount(gameState.catCount);
                
                    setFCost(gameState.fCost);
                    setCCost(gameState.cCost);
                    setSCost(gameState.sCost);
    
                    if (gameState.unlockedAchievements) {
                        restoreAchievements(gameState.unlockedAchievements);
                    }
                }
            };
            reader.readAsText(input.files[0]);
        } else {
            alert("No saved game found");
        }
    }

    function handleLoad() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.addEventListener("change", loadProgress);
        input.click();
    }

    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 `}
            onClick={handleLoad}
            title="Load a saved game from file."
        >
            <img
                className="dark:invert"
                src="/github.svg"
                alt="Test graphic"
                width={20}
                height={20}
            />
            Load (Via File)
        </button>
        </div>
    )
}

