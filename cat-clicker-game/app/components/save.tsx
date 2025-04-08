import { balance, funds } from "./balance";
import { clickUtil } from "./clicker";
import { clickPower, catIds, shelters, fCost, cCost, sCost, setClickPower, setFCost, setCCost, setSCost, makeCat } from "./upgrade";

const gameState = {
    balance: balance,
    clickPower: clickPower,
    shelters: shelters,
    fCost: fCost,
    cCost: cCost,
    sCost: sCost,
    catIds: Array.isArray(catIds) ? catIds : []
}

export function saveProgress() {
    const gameState = {
        balance: balance,
        clickPower: clickPower,
        shelters: shelters,
        fCost: fCost,
        cCost: cCost,
        sCost: sCost,
        catIds: Array.from(catIds)
    }
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

export function loadProgress(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (fileEvent) {
            const saveState = fileEvent.target?.result;
            
            if (gameState) {
                const gameState = JSON.parse(saveState as string);
                
                funds(gameState.balance - balance);

                setClickPower(gameState.clickPower);
                createShelters (gameState.shelters);
                createCats(gameState.catIds.length);
            
                setFCost(gameState.fCost);
                setCCost(gameState.cCost);
                setSCost(gameState.sCost);
            }
        };
        reader.readAsText(input.files[0]);
    } else {
        alert("No saved game found");
    }
}

function createCats(num: number) {
    for (let i = 0; i < num; i++) {
        const intID = setInterval(() => {
            clickUtil(1);
        }, 1000) as unknown as number;
        catIds.push(intID);
    }
}

function createShelters(num: number) {
    for (let i = 0; i < num; i++) {
        const intID = setInterval(() => {
            makeCat();
        }, 30000) as unknown as number;
    }
}


export function Save() {
    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 `}
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

    function handleLoad(event: Event) {
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
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleLoad(event as unknown as Event)}
            title="Load a saved game."
        >
            <img
                className="dark:invert"
                src="/github.svg"
                alt="Test graphic"
                width={20}
                height={20}
            />
            Better Food
        </button>
        </div>
    )
}
