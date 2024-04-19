"use strict";
const doSomething = getIP();
async function getIP() {
    const element_ip = document.getElementById("vd_ip") || new HTMLElement();
    const promise = await fetch("//ipinfo.io/json");
    const data = await promise.json();
    element_ip.innerHTML = data.ip + " | " + data.hostname + " | " + data.city + " | " + data.country;
    return data;
}
