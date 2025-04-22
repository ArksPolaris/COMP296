import { useReadouts } from "./console";

export var balance = 0 ;
export var stickyBalance = 0;
export var moneySpent = 0;

export function updateDisplay() {
    var bal = document.getElementById("bal");
    if (bal != null) {
        bal.innerHTML = "Balance: " + balance;
    }
}

export async function donation() {
    const { displayMessage } = useReadouts();
    
    var random = Math.floor(Math.random() * 100);
    
    if (random > 45) {
        displayMessage("An adopter came by and gave you a donation.");
        funds(random);
    } else {
        displayMessage("Seems like no one came by to adopt a cat, but one of the locals gave a small donation.");
        funds(10);
    }
}

export function funds(val: number) {
    balance+=val;
    if (val > 0) {stickyBalance+=val;}
    if (val < 0) {moneySpent+=Math.abs(val);}
    updateDisplay();
}