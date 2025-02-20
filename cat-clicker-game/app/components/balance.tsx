var balance = 0 ;



export function updateDisplay() {
    var bal = document.getElementById("bal");
    if (bal != null) {
        bal.innerHTML = "Balance: " + balance;
    }
}

export function donation() {
    var random = Math.floor(Math.random() * 100);
    if (random > 45) {
        alert("An adopter came by and gave you a donation.");
        addfunds(45);
    } else {
        alert("Seems like no one came by to adopt a cat, but one of the locals gave a small donation.");
        addfunds(10);
    }
}

export function addfunds(val: number) {
    balance+=val;
    updateDisplay();
}