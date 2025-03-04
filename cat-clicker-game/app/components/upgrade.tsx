import { balance as bal, funds } from "./balance";
import { clickCat } from "./clicker";
export var clickPower = 1;
var fCost = 25;
var cCost = 100;
let catIDs = [];

function upgradeClicks() {
    if (bal >= fCost) {
        funds(-fCost);
        clickPower = clickPower + 1;
        updateDisplay("power");
        fCost+=1;
    }
}

function makeCat() {
    if (bal >= cCost) {
        funds(-cCost);
        cCost+=5;
        const intID = setInterval(() => {
            clickCat();
        }, 1000);

        catIDs.push(intID);
        updateDisplay("catHelp");
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
        display.innerHTML = "Cats: " + catIDs.length;
        var Cost = document.getElementById("cCost");
        if (Cost != null) {
            Cost.innerHTML = "Cat Cost: " + fCost;
        }
    }
}

export function Food() {
    return (
        <div>
            <button 
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={upgradeClicks}
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
        <p id="power">Power: {clickPower}</p>
        <p id="fCost">Food Cost: {fCost}</p>
        </div>
    )
}

export function Cat() {
    return (
        <div>
            <button 
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={makeCat}
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
        <p id="catHelp">Cats: {catIDs.length + 1}</p>
        <p id="cCost">Cat Cost: {cCost}</p>
        </div>
    )
}