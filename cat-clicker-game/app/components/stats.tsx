import { moneySpent, stickyBalance } from "./balance";
import { clicks } from "./clicker";
import { catIds, shelters } from "./upgrade";

export function Stats() {
  return (
  <div className="stats">
    <h1>Stats</h1>
    <p> Money Made Total: {stickyBalance}</p>
    <p>Total Clicks: {clicks}</p>
    <p>Total Cats: {catIds}</p>
    <p>Total Shelters: {shelters}</p>
    <p>Total Money Spent: {moneySpent}</p>
  </div>
);
}