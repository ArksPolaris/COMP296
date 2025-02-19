var balance = 0 ;



export function updateDisplay() {
    var bal = document.getElementById("bal");
    if (bal != null) {
        bal.innerHTML = "Balance: " + balance;
    }
}

export function addfunds(val: number) {
    balance+=val;
    updateDisplay();
}