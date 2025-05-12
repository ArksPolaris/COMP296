import { useBalance } from "./contexts/balanceContext";
import { useUpgrade } from "./contexts/upgradeContext";
import { useClick } from "./contexts/clickContext";

export function Stats() {
  const { moneySpent, stickyBalance } = useBalance();
  const { catCount, shelters } = useUpgrade();
  const { totalClicks } = useClick();
  return (
  <div className="stats">
    <h1>Stats</h1>
    <p> Money Made Total: {stickyBalance}</p>
    <p>Total Clicks: {totalClicks}</p>
    <p>Total Cats: {catCount}</p>
    <p>Total Shelters: {shelters}</p>
    <p>Total Money Spent: {moneySpent}</p>
  </div>
);
}