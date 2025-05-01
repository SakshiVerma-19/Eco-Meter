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
