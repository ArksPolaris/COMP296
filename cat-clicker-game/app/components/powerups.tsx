import { usePowerUp, useClickPowerUp, useMegaCat } from "./contexts/powerupsContext";
import { useBalance } from "./contexts/balanceContext";
import { useReadouts } from "./contexts/ReadoutsContext";

export function PowerUps() {
    const { stickyBalance } = useBalance();
    const { clickPower } = usePowerUp();
    const { displayMessage } = useReadouts();

    const {
        active: clickPowerUpActive,
        cooldown: clickPowerUpCooldown,
        activate: clickPowerUpActivate,
    }= useClickPowerUp(clickPower, 2.5);
    const megaCat = useMegaCat();

    const handleClick = () => {
        if (!clickPowerUpActive && !clickPowerUpCooldown) {
            clickPowerUpActivate();
            displayMessage("Power Up Activated! (Power: " + clickPower + ")");
        }
    }

    const handleCat = () => {
        if (!megaCat.cooldown) {
            megaCat.activate();
            displayMessage("Cat Brigade Activated!");
        }
    }

    if (stickyBalance < 1000) {
        return (
            <div className='flex flex-col gap-4 row-start-2' style = {{ }}>
              <p>Power-Ups</p>
              <div className="flex gap-4">
                <button
                    onClick={handleClick}
                    className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${clickPowerUpActive ? '' : 'disabled'}`}
                    disabled={clickPowerUpActive || stickyBalance < 1000}
                    title="Clicks up by 2.5x"
                >
                    Clicks Up
                </button>
                <button
                    onClick={handleCat}
                    className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#aaa] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${megaCat.active ? '' : 'disabled'}`}
                    disabled={megaCat.active || stickyBalance < 1000}
                    title="Cat Brigade"
                >
                    Cat Brigade
                </button>
              </div>
            </div>
        );
    }

    else {
        return (<p> To use power-ups, you must have made at least 1000 dollars. </p>)
    }
}
