"use client";

import { addfunds } from "./balance";

var clicks = 0;

function click() {
    clicks = clicks + 1;
    if (clicks%25 == 0) donation();
    addfunds(1);
    
}

function donation() {
    var random = Math.floor(Math.random() * 100);
    if (random > 45) {
        alert("An adopter came by and gave you a donation.");
        addfunds(45);
    } else {
        alert("Seems like no one came by to adopt a cat, but one of the locals gave a small donation.");
        addfunds(10);
    }
}

export default function Clicker() {
    return (
        addEventListener("click", click)
    )
}