import { checkAuthState, logOut } from "./auth.js"
import { getTravelEmissionFactors, getElectricityEmissionFactor } from "./database.js"

document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard page loaded")

  // Check if user is authenticated
  checkAuthState((user) => {
    if (!user) {
      console.log("User is not signed in, redirecting to login page")
      window.location.href = "index.html"
    } else {
      console.log("User is signed in:", user)
      // User is signed in, update UI
      const userName = localStorage.getItem("userName") || user.displayName || user.email.split("@")[0]
      updateUserUI(userName)
    }
  })

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await logOut()
        console.log("User logged out successfully")
        window.location.href = "index.html"
      } catch (error) {
        console.error("Logout failed:", error)
      }
    })
  }

  // Existing dashboard functionality
  setupDashboardFunctionality()
})

function updateUserUI(userName) {
  // Update UI with user information
  const userDisplay = document.getElementById("user-display")
  if (userDisplay) {
    userDisplay.textContent = userName
  }
}

function setupDashboardFunctionality() {
  // Appliances
  const addApplianceBtn = document.getElementById("add-appliance")
  if (addApplianceBtn) {
    addApplianceBtn.addEventListener("click", () => {
      const applianceContainer = document.getElementById("appliance-container")
      const newAppliance = document.createElement("div")
      newAppliance.classList.add("appliance-input")
      newAppliance.innerHTML = `
        <label>
          Appliance (Voltage in Watts):
          <input type="number" class="voltage" placeholder="e.g. 60" required />
        </label>
        <label>
          Time Used (in Hours):
          <input type="number" class="hours" placeholder="e.g. 5" required />
        </label>
      `
      applianceContainer.appendChild(newAppliance)
    })
  }

  // Vehicles
  const addVehicleBtn = document.getElementById("add-vehicle")
  if (addVehicleBtn) {
    addVehicleBtn.addEventListener("click", () => {
      const vehicleContainer = document.getElementById("vehicle-container")
      const newVehicle = document.createElement("div")
      newVehicle.classList.add("vehicle-input")
      newVehicle.innerHTML = `
        <label>
          Mode of Transport:
          <select class="vehicle-type" required>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
        </label>
        <label>
          Travel Duration (in Minutes):
          <input type="number" class="travel-time" placeholder="e.g. 30" required />
        </label>
      `
      vehicleContainer.appendChild(newVehicle)
    })
  }

  // Calculate button
  const calcBtn = document.getElementById("calcBtn")
  if (calcBtn) {
    calcBtn.addEventListener("click", async () => {
      // Show loading indicator
      const resultBox = document.getElementById("result")
      resultBox.innerHTML = `<div class="loading-spinner"></div><p>Calculating...</p>`

      try {
        // Fetch emission factors from database
        const travelFactors = await getTravelEmissionFactors()
        const electricityFactor = await getElectricityEmissionFactor()

        console.log("Emission factors loaded:", { travelFactors, electricityFactor })

        let totalEmission = 0

        // Electricity Emissions
        const voltages = document.querySelectorAll(".voltage")
        const hours = document.querySelectorAll(".hours")
        for (let i = 0; i < voltages.length; i++) {
          const watt = Number.parseFloat(voltages[i].value)
          const hour = Number.parseFloat(hours[i].value)
          if (!isNaN(watt) && !isNaN(hour)) {
            const kWh = (watt * hour) / 1000
            totalEmission += kWh * electricityFactor
          }
        }

        // Transport Emissions
        const travelTimes = document.querySelectorAll(".travel-time")
        const vehicleTypes = document.querySelectorAll(".vehicle-type")
        for (let i = 0; i < travelTimes.length; i++) {
          const minutes = Number.parseFloat(travelTimes[i].value)
          const type = vehicleTypes[i].value
          if (!isNaN(minutes)) {
            // Use emission factor from database
            const factor = travelFactors[type] || 0
            totalEmission += minutes * factor
          }
        }

        // Display result
        resultBox.innerHTML = `<h3>Total Estimated CO₂ Emission: ${totalEmission.toFixed(2)} kg</h3>`
      } catch (error) {
        console.error("Calculation error:", error)
        resultBox.innerHTML = `<h3 class="error">Error calculating emissions. Please try again.</h3>`
      }
    })
  }
}
