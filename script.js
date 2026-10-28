const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
let fromcur = document.querySelector(".from select")
let tocur = document.querySelector(".to select")
const msg = document.querySelector(".msg")
const icon = document.querySelector("i")

for (let select of dropdown) {
    for (let code in countryList) {
        let newoption = document.createElement("option")
        newoption.innerText = code
        newoption.value = code
        if (select.name === "from" && code === "USD") {
            newoption.selected = "selected"
        }
        if (select.name === "to" && code === "INR") {
            newoption.selected = "selected"
        }
        select.append(newoption)
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target)
    })
}

const updateflag = (e) => {
    let curcode = e.value
    let countrycode = countryList[curcode]
    let newimg = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = e.parentElement.querySelector("img")
    img.src = newimg
}

window.addEventListener("load", () => {
    rateexchange()
})

btn.addEventListener("click", (e) => {
    e.preventDefault();
    rateexchange()
})

icon.addEventListener("click", () => {
    let tempCode = fromcur.value;
    fromcur.value = tocur.value;
    tocur.value = tempCode;

    updateflag(fromcur);
    updateflag(tocur);

    rateexchange();
})

const rateexchange = async () => {
    let amount = document.querySelector(".amount input")
    let amtvalue = amount.value
    const fromVal = fromcur.value.toLowerCase();
    const toVal = tocur.value.toLowerCase();
    if (amtvalue <= 0) {
        amtvalue = 1
        amount.value = "1"
    }

    const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromVal}.json`;
    (async function get() {
        const response = await fetch(BASE_URL)
        const data = await response.json();
        const rate = data[fromVal][toVal]
        const final = (rate * amtvalue).toFixed(2)
        msg.innerText = `${amtvalue}${fromcur.value} = ${final}${tocur.value}`
    })()

}