import { useBalance } from "./contexts/balanceContext";
import { useUpgrade } from "./contexts/upgradeContext";
import { useReadouts } from "./console";

export function Food() {
    const { fCost, setFCost, clickPower, setClickPower } = useUpgrade();
    const { spendFunds, balance } = useBalance();
    const { displayMessage } = useReadouts();

    const handleUpgrade = () => {
        if (balance >= fCost) {
            spendFunds(fCost);
            setFCost(Math.floor(fCost * 1.1) + 5);
            setClickPower(clickPower+ 1);
            displayMessage("You purchased better food for the cats! (Power: " + clickPower + ")");
        }
    }

    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${balance < fCost ? 'disabled' : ''}`}
            onClick={handleUpgrade}
            disabled={balance < fCost}
            title="Better food for your cats. (Increase money made by 1) "
        >
            <img
                className="dark:invert"
                src="/github.svg"
                alt="Test graphic"
                width={20}
                height={20}
            />
            Upgrade Food
        </button>
            <div className="flex flex-col ml-4">
                <p id="power">Power: {clickPower}</p>
                <p id="fCost">Food Cost: {fCost}</p>
            </div>
        </div>
    )
};

export function Cat() {
    const { cCost, setCCost, catCount, setCatCount } = useUpgrade();
    const { spendFunds, balance } = useBalance();
    const { displayMessage } = useReadouts();

    const handleUpgrade = () => {
        if (balance >= cCost) {
            spendFunds(cCost);
            setCCost(Math.floor(cCost*1.1)+5);
            setCatCount(catCount + 1);
            displayMessage("One of the cats has decided to help you for extra treats! (Cats: " + catCount + ")");
        }
    }
    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${balance < cCost ? 'disabled' : ''}`}
            onClick={handleUpgrade}
            disabled={balance < cCost}
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
                <p id="catHelp">Cats: {catCount}</p>
                <p id="cCost">Cat Cost: {cCost}</p>
            </div>
        </div>
    )
}

export function Shelter() {
    const { sCost, setSCost, shelters, setShelters, catCount, setCatCount } = useUpgrade();
    const { spendFunds, balance } = useBalance();
    const { displayMessage } = useReadouts();

    const handleUpgrade = () => {
        if (balance >= sCost) {
            spendFunds(sCost);
            setSCost(Math.floor(sCost*1.1)+25);
            setShelters(shelters + 1);
            setCatCount(catCount + 5);
            displayMessage("You collaborated with the locals to create a shelter for the cats! (Shelters: " + shelters + ")");
        }
    };

    return (
        <div className="flex items-center">
            <button 
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${balance < sCost ? 'disabled' : ''}`}
            onClick={handleUpgrade}
            disabled={balance < sCost}
            title="Adds 5 more cats."
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

