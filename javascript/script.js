document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     LENGTH CONVERTER
  ========================= */
  const lengthValue = document.getElementById("lengthValue");
  const lengthFrom = document.getElementById("fromUnit");
  const lengthTo = document.getElementById("toUnit");
  const lengthResult = document.getElementById("lengthResult");

  if (lengthValue && lengthFrom && lengthTo && lengthResult) {

    const lengthFactors = {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34
    };

    function convertLength() {
      let value = parseFloat(lengthValue.value);
      if (isNaN(value)) return lengthResult.innerText = "0";

      let meters = value * lengthFactors[lengthFrom.value];
      let result = meters / lengthFactors[lengthTo.value];

      lengthResult.innerText = result.toFixed(6);
    }

    lengthValue.addEventListener("input", convertLength);
    lengthFrom.addEventListener("change", convertLength);
    lengthTo.addEventListener("change", convertLength);
  }


  /* =========================
     MASS CONVERTER
  ========================= */
  const massValue = document.getElementById("massValue");
  const massFrom = document.getElementById("fromUnit");
  const massTo = document.getElementById("toUnit");
  const massResult = document.getElementById("massResult");

  if (massValue && massFrom && massTo && massResult) {

    const massFactors = {
      mg: 0.000001,
      g: 0.001,
      kg: 1,
      ton: 1000,
      oz: 0.0283495,
      lb: 0.453592
    };

    function convertMass() {
      let value = parseFloat(massValue.value);
      if (isNaN(value)) return massResult.innerText = "0";

      let kg = value * massFactors[massFrom.value];
      let result = kg / massFactors[massTo.value];

      massResult.innerText = result.toFixed(6);
    }

    massValue.addEventListener("input", convertMass);
    massFrom.addEventListener("change", convertMass);
    massTo.addEventListener("change", convertMass);
  }


  /* =========================
     AREA CONVERTER
  ========================= */
  const areaValue = document.getElementById("areaValue");
  const areaFrom = document.getElementById("fromUnit");
  const areaTo = document.getElementById("toUnit");
  const areaResult = document.getElementById("areaResult");

  if (areaValue && areaFrom && areaTo && areaResult) {

    const areaFactors = {
      sq_mm: 0.000001,
      sq_cm: 0.0001,
      sq_m: 1,
      sq_km: 1000000,
      sq_in: 0.00064516,
      sq_ft: 0.092903,
      sq_yd: 0.836127,
      acres: 4046.86,
      hectares: 10000
    };

    function convertArea() {
      let value = parseFloat(areaValue.value);
      if (isNaN(value)) return areaResult.innerText = "0";

      let sqm = value * areaFactors[areaFrom.value];
      let result = sqm / areaFactors[areaTo.value];

      areaResult.innerText = result.toFixed(6);
    }

    areaValue.addEventListener("input", convertArea);
    areaFrom.addEventListener("change", convertArea);
    areaTo.addEventListener("change", convertArea);
  }


  /* =========================
     VOLUME CONVERTER
  ========================= */
  const volumeValue = document.getElementById("volumeValue");
  const volumeFrom = document.getElementById("fromUnit");
  const volumeTo = document.getElementById("toUnit");
  const volumeResult = document.getElementById("volumeResult");

  if (volumeValue && volumeFrom && volumeTo && volumeResult) {

    const volumeFactors = {
      ml: 0.000001,
      liters: 0.001,
      fl_oz: 0.0000295735,
      gallons: 0.00378541,
      cu_ft: 0.0283168,
      cu_yd: 0.764555,
      cu_m: 1
    };

    function convertVolume() {
      let value = parseFloat(volumeValue.value);
      if (isNaN(value)) return volumeResult.innerText = "0";

      let m3 = value * volumeFactors[volumeFrom.value];
      let result = m3 / volumeFactors[volumeTo.value];

      volumeResult.innerText = result.toFixed(6);
    }

    volumeValue.addEventListener("input", convertVolume);
    volumeFrom.addEventListener("change", convertVolume);
    volumeTo.addEventListener("change", convertVolume);
  }


  /* =========================
     TEMPERATURE CONVERTER
  ========================= */
  const tempValue = document.getElementById("tempValue");
  const tempFrom = document.getElementById("fromUnit");
  const tempTo = document.getElementById("toUnit");
  const tempResult = document.getElementById("tempResult");

  if (tempValue && tempFrom && tempTo && tempResult) {

    function convertTemp() {
      let value = parseFloat(tempValue.value);
      if (isNaN(value)) return tempResult.innerText = "0";

      let celsius;

      switch (tempFrom.value) {
        case "celsius": celsius = value; break;
        case "fahrenheit": celsius = (value - 32) * 5/9; break;
        case "kelvin": celsius = value - 273.15; break;
      }

      let result;

      switch (tempTo.value) {
        case "celsius": result = celsius; break;
        case "fahrenheit": result = celsius * 9/5 + 32; break;
        case "kelvin": result = celsius + 273.15; break;
      }

      tempResult.innerText = result.toFixed(2);
    }

    tempValue.addEventListener("input", convertTemp);
    tempFrom.addEventListener("change", convertTemp);
    tempTo.addEventListener("change", convertTemp);
  }

});

// Currency
let liveRates = {};

// Fetch live rates from a reliable API
async function fetchRates() {
  try {
    const response = await fetch("https://api.exchangerate.host/latest");
    const data = await response.json();
    liveRates = data.rates;
    console.log("Live rates loaded:", liveRates);
  } catch (error) {
    console.error("Failed to load rates:", error);
  }
}

// Convert function
let rates = {};
let baseCurrency = "EUR"; // default from API

// Fetch live rates
async function fetchRates() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest');
    const data = await res.json();
    rates = data.rates;
    baseCurrency = data.base; // usually EUR
    console.log("Rates loaded:", rates);
  } catch (err) {
    console.error("Error fetching rates:", err);
  }
}

// Convert currency
function convertCurrency() {
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!rates[from] || !rates[to]) {
    document.getElementById("result").innerText = "Loading rates...";
    return;
  }

  if (isNaN(amount)) {
    document.getElementById("result").innerText = "0";
    return;
  }

  // Convert from "from" to base, then to "to"
  const amountInBase = amount / rates[from];
  const converted = amountInBase * rates[to];

  document.getElementById("result").innerText = converted.toFixed(2);
}

// Event listeners
document.getElementById("amount").addEventListener("input", convertCurrency);
document.getElementById("fromCurrency").addEventListener("change", convertCurrency);
document.getElementById("toCurrency").addEventListener("change", convertCurrency);

// Initialize
fetchRates();
// NAV BAR

$(document).ready(function(){

  $(".card").hover(function(){
    $(this).css("transform","translateY(-10px)");
  });

  $(".card").mouseleave(function(){
    $(this).css("transform","translateY(0px)");
  });

});

// COUNTER ANIMATION
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerText = '0'; 

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target'); 
    const count = +counter.innerText;
    const increment = target / 200; 

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCounter, 10); 
    } else {
      counter.innerText = target; 
    }
  };

  updateCounter();
});

// swap
const swapBtn = document.getElementById("swapBtn");

if (swapBtn && fromUnit && toUnit) {
  swapBtn.addEventListener("click", function () {

    let temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;

    fromUnit.dispatchEvent(new Event("change"));

  });
}

