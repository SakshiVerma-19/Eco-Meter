// ====== SAFETY CHECKS FOR PAGE-SPECIFIC ELEMENTS ======

// Appliances (dashboard page only)
const addApplianceBtn = document.getElementById('add-appliance');
if (addApplianceBtn) {
  addApplianceBtn.addEventListener('click', function () {
    const applianceContainer = document.getElementById('appliance-container');
    const newAppliance = document.createElement('div');
    newAppliance.classList.add('appliance-input');
    newAppliance.innerHTML = `
      <label>Appliance (Voltage in Watts):</label>
      <input type="number" class="voltage" placeholder="e.g. 60" required />
      <label>Time Used (in Hours):</label>
      <input type="number" class="hours" placeholder="e.g. 5" required />
    `;
    applianceContainer.appendChild(newAppliance);
  });
}

// Vehicles (dashboard page only)
const addVehicleBtn = document.getElementById('add-vehicle');
if (addVehicleBtn) {
  addVehicleBtn.addEventListener('click', function () {
    const vehicleContainer = document.getElementById('vehicle-container');
    const newVehicle = document.createElement('div');
    newVehicle.classList.add('vehicle-input');
    newVehicle.innerHTML = `
      <label>Mode of Transport:</label>
      <select class="vehicle-type" required>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="CNG">CNG</option>
        <option value="Electric">Electric</option>
      </select>
      <label>Travel Duration (in Minutes):</label>
      <input type="number" class="travel-time" placeholder="e.g. 30" required />
    `;
    vehicleContainer.appendChild(newVehicle);
  });
}

// ====== MODAL FUNCTIONALITY (WORKS ON ALL PAGES) ======
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("signupModal");
  const openBtnNav = document.getElementById("openModalNav");
  const openBtnCard = document.getElementById("openModalCard");
  const closeBtn = document.querySelector(".close");

  if (modal) {
    if (openBtnNav) openBtnNav.onclick = () => (modal.style.display = "flex");
    if (openBtnCard) openBtnCard.onclick = () => (modal.style.display = "flex");
    if (closeBtn) closeBtn.onclick = () => (modal.style.display = "none");

    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };
  }
});
// new
const calcBtn = document.getElementById("calcBtn");
if (calcBtn) {
  calcBtn.addEventListener("click", () => {
    let totalEmission = 0;

    // Electricity Emissions
    const voltages = document.querySelectorAll(".voltage");
    const hours = document.querySelectorAll(".hours");
    for (let i = 0; i < voltages.length; i++) {
      const watt = parseFloat(voltages[i].value);
      const hour = parseFloat(hours[i].value);
      if (!isNaN(watt) && !isNaN(hour)) {
        const kWh = (watt * hour) / 1000;
        totalEmission += kWh * 0.92;
      }
    }

    // Transport Emissions
    const travelTimes = document.querySelectorAll(".travel-time");
    const vehicleTypes = document.querySelectorAll(".vehicle-type");
    for (let i = 0; i < travelTimes.length; i++) {
      const minutes = parseFloat(travelTimes[i].value);
      const type = vehicleTypes[i].value;
      if (!isNaN(minutes)) {
        let factor = 0;
        switch (type) {
          case "Petrol":
            factor = 0.19;
            break;
          case "Diesel":
            factor = 0.21;
            break;
          case "CNG":
            factor = 0.14;
            break;
          case "Electric":
            factor = 0.05;
            break;
        }
        totalEmission += minutes * factor;
      }
    }

    // Display result
    const resultBox = document.getElementById("result");
    resultBox.innerHTML = `<h3>Total Estimated CO₂ Emission: ${totalEmission.toFixed(2)} kg</h3>`;
  });
}
// ====== RANDOM FOOTER QUOTE (Dashboard Page Only) ======
document.addEventListener("DOMContentLoaded", () => {
  const footerQuote = document.getElementById("footer-quote");
  if (footerQuote) {
    const quotes = [
      "Track your impact, grow a greener future.",
      "Track It. Cut It .Live Clean.",
      "Ecometer : Your Eco-Conscience in code."
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    footerQuote.innerHTML = `<strong>"${quotes[randomIndex]}"</strong>`;
  }
});

