export var balance = 0 ;

export function updateDisplay() {
    var bal = document.getElementById("bal");
    if (bal != null) {
        bal.innerHTML = "Balance: " + balance;
    }
}

export async function donation() {
    var random = Math.floor(Math.random() * 100);
    
    if (random > 45) {
        alert("An adopter came by and gave you a donation.");
        funds(45);
    } else {
        alert("Seems like no one came by to adopt a cat, but one of the locals gave a small donation.");
        funds(10);
    }
}

export function funds(val: number) {
    balance+=val;
    updateDisplay();
}