import { balance as bal, funds } from "./balance";
import { clickUtil } from "./clicker";
import { useReadouts } from "./console";
export var clickPower = 1;
export var fCost = 25;
export var cCost = 100;
export var sCost = 500;
export var catIds = 0;
export var shelters = 0;

export function makeCatUtils() {
    const intID = setInterval(() => {
        clickUtil(1);
    }, 1000) as unknown as number;
    return intID;
}

function upgradeClicks(displayMessage: (msg: string) => void) {
    if (bal >= fCost) {
        funds(-fCost);
        fCost=Math.floor(fCost*1.1)+5;
        clickPower = clickPower + 1;
        updateDisplay("power");
        displayMessage("You purchased better food for the cats! (Power: " + clickPower + ")");
    }
}

function makeCat(displayMessage: (msg: string) => void) {
    if (bal >= cCost) {
        funds(-cCost);
        cCost=Math.floor(cCost*1.1)+5;
        catIds++;
        updateDisplay("catHelp");
        displayMessage("One of the cats has decided to help you for extra treats! (Cats: " + catIds + ")");
    }
}

function makeShelter(displayMessage: (msg: string) => void) {
    if (bal >= sCost) {
        funds(-sCost);
        sCost=Math.floor(sCost*1.1)+25;
        const intID = setInterval(() => {
            makeCatUtils();
        }, 30000);
        shelters++;
        updateDisplay("shelterHelp");
        displayMessage("You collaborated with the locals to create a shelter for the cats! (Shelters: " + shelters + ")");
    }
}
export function updateDisplay(val: string) {
    var display = document.getElementById(val);
    if (display != null && val === "power") {
        display.innerHTML = "Power: " + clickPower;
        var Cost = document.getElementById("fCost");
        if (Cost != null) {
            Cost.innerHTML = "Food Cost: " + fCost;
        }
    }
    if (display != null && val === "catHelp") {
        display.innerHTML = "Cats: " + catIds;
        var Cost = document.getElementById("cCost");
        if (Cost != null) {
            Cost.innerHTML = "Cat Cost: " + cCost;
        }
    }
    if (display != null && val === "shelters") {
        display.innerHTML = "Shelters: " + shelters;
        var Cost = document.getElementById("sCost");
        if (Cost != null) {
            Cost.innerHTML = "Shelter Cost: " + sCost;
        }
    }
}

// WA

export function setClickPower(value: number) {
                clickPower = value;
}

export function setFCost(value: number) {
                fCost = value;
}

export function setCCost(value: number) {
                cCost = value;
}

export function setSCost(value: number) {
                sCost = value;
}


export function Food() {
    const { displayMessage } = useReadouts();

    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${bal < fCost ? 'disabled' : ''}`}
            onClick={() => upgradeClicks(displayMessage)}
            disabled={bal < fCost}
            title="Better food for your cats. (Increase money made by 1) "
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
            <div className="flex flex-col ml-4">
                <p id="power">Power: {clickPower}</p>
                <p id="fCost">Food Cost: {fCost}</p>
            </div>
        </div>
    )
}

export function Cat() {
    const { displayMessage } = useReadouts();

    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${bal < cCost ? 'disabled' : ''}`}
            onClick={() => makeCat(displayMessage)}
            disabled={bal < cCost}
            title="Creates a cat that clicks for you. (1 click per second)"
        >
            <img
                className="dark:invert"
                src="/github.svg"
                alt="Test graphic"
                width={20}
                height={20}
            />
            Cat Helper
        </button>
            <div className="flex flex-col ml-4">
                <p id="catHelp">Cats: {catIds}</p>
                <p id="cCost">Cat Cost: {cCost}</p>
            </div>
        </div>
    )
}

export function Shelter() {
    const { displayMessage } = useReadouts();

    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${bal < sCost ? 'disabled' : ''}`}
            onClick={() => makeShelter(displayMessage)}
            disabled={bal < sCost}
            title="Spawns a cat every 30 seconds."
        >
            <img
                className="dark:invert"
                src="/github.svg"
                alt="Test graphic"
                width={20}
                height={20}
            />
            Cat Helper
        </button>
            <div className="flex flex-col ml-4">
                <p id="shelters">Shelters: {shelters}</p>
                <p id="sCost">Shelter Cost: {sCost}</p>
            </div>
        </div>
    )
}
