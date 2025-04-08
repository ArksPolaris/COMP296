var readoutElement1 = document.getElementById("readout1");
var readoutElement2 = document.getElementById("readout2");
var readoutElement3 = document.getElementById("readout3");
var readoutElement4 = document.getElementById("readout4");
var readoutElement5 = document.getElementById("readout5");



export function displayMessage(msg: string) {
        readoutElement5.innerHTML = readoutElement4.innerHTML;
        readoutElement4.innerHTML = readoutElement3.innerHTML;
        readoutElement3.innerHTML = readoutElement2.innerHTML;
        readoutElement2.innerHTML = readoutElement1.innerHTML;
        readoutElement1.innerHTML = msg;
}