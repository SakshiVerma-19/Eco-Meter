import { checkAuthState, logOut } from "./auth.js"
<<<<<<< HEAD
import { getTravelEmissionFactors, getElectricityEmissionFactor, logEmissionCalculation } from "./database.js"
=======
import { getTravelEmissionFactors, getElectricityEmissionFactor } from "./database.js"
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63

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

<<<<<<< HEAD
// Function to update appliance numbers
function updateApplianceNumbers() {
  const applianceInputs = document.querySelectorAll(".appliance-input")
  applianceInputs.forEach((input, index) => {
    const header = input.querySelector(".section-header")
    if (header) {
      const numberSpan = header.querySelector(".item-number")
      if (numberSpan) {
        numberSpan.textContent = (index + 1).toString()
      }
    }
  })
}

// Function to update vehicle numbers
function updateVehicleNumbers() {
  const vehicleInputs = document.querySelectorAll(".vehicle-input")
  vehicleInputs.forEach((input, index) => {
    const header = input.querySelector(".section-header")
    if (header) {
      const numberSpan = header.querySelector(".item-number")
      if (numberSpan) {
        numberSpan.textContent = (index + 1).toString()
      }
    }
  })
}

=======
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
function setupDashboardFunctionality() {
  // Appliances
  const addApplianceBtn = document.getElementById("add-appliance")
  if (addApplianceBtn) {
    addApplianceBtn.addEventListener("click", () => {
      const applianceContainer = document.getElementById("appliance-container")
<<<<<<< HEAD
      const applianceCount = applianceContainer.querySelectorAll(".appliance-input").length + 1
      const newAppliance = document.createElement("div")
      newAppliance.classList.add("appliance-input")
      newAppliance.innerHTML = `
        <div class="section-header">
          <span>Appliance <span class="item-number">${applianceCount}</span></span>
        </div>
=======
      const newAppliance = document.createElement("div")
      newAppliance.classList.add("appliance-input")
      newAppliance.innerHTML = `
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
        <label>
          Appliance (Voltage in Watts):
          <input type="number" class="voltage" placeholder="e.g. 60" required />
        </label>
        <label>
          Time Used (in Hours):
          <input type="number" class="hours" placeholder="e.g. 5" required />
        </label>
<<<<<<< HEAD
        <label>
          Quantity:
          <input type="number" class="quantity" placeholder="e.g. 1" value="1" min="1" required />
        </label>
        <button type="button" class="remove-btn">✕</button>
      `
      applianceContainer.appendChild(newAppliance)

      // Add event listener for the remove button
      const removeBtn = newAppliance.querySelector(".remove-btn")
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          newAppliance.remove()
          updateApplianceNumbers()
        })
      }
    })
  }

  // Add remove buttons to existing appliances
  const existingApplianceInputs = document.querySelectorAll(".appliance-input")
  existingApplianceInputs.forEach((input, index) => {
    // Add header if it doesn't exist
    if (!input.querySelector(".section-header")) {
      const header = document.createElement("div")
      header.className = "section-header"
      header.innerHTML = `<span>Appliance <span class="item-number">${index + 1}</span></span>`
      input.prepend(header)
    }

    // Add remove button if it doesn't exist
    if (!input.querySelector(".remove-btn")) {
      const removeBtn = document.createElement("button")
      removeBtn.type = "button"
      removeBtn.className = "remove-btn"
      removeBtn.textContent = "✕"
      removeBtn.addEventListener("click", () => {
        input.remove()
        updateApplianceNumbers()
      })
      input.appendChild(removeBtn)
    }
  })

=======
      `
      applianceContainer.appendChild(newAppliance)
    })
  }

>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
  // Vehicles
  const addVehicleBtn = document.getElementById("add-vehicle")
  if (addVehicleBtn) {
    addVehicleBtn.addEventListener("click", () => {
      const vehicleContainer = document.getElementById("vehicle-container")
<<<<<<< HEAD
      const vehicleCount = vehicleContainer.querySelectorAll(".vehicle-input").length + 1
      const newVehicle = document.createElement("div")
      newVehicle.classList.add("vehicle-input")
      newVehicle.innerHTML = `
        <div class="section-header">
          <span>Vehicle <span class="item-number">${vehicleCount}</span></span>
        </div>
=======
      const newVehicle = document.createElement("div")
      newVehicle.classList.add("vehicle-input")
      newVehicle.innerHTML = `
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
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
<<<<<<< HEAD
        <label>
          Number of Trips:
          <input type="number" class="trip-count" placeholder="e.g. 1" value="1" min="1" required />
        </label>
        <button type="button" class="remove-btn">✕</button>
      `
      vehicleContainer.appendChild(newVehicle)

      // Add event listener for the remove button
      const removeBtn = newVehicle.querySelector(".remove-btn")
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          newVehicle.remove()
          updateVehicleNumbers()
        })
      }
    })
  }

  // Add remove buttons to existing vehicles
  const existingVehicleInputs = document.querySelectorAll(".vehicle-input")
  existingVehicleInputs.forEach((input, index) => {
    // Add header if it doesn't exist
    if (!input.querySelector(".section-header")) {
      const header = document.createElement("div")
      header.className = "section-header"
      header.innerHTML = `<span>Vehicle <span class="item-number">${index + 1}</span></span>`
      input.prepend(header)
    }

    // Add remove button if it doesn't exist
    if (!input.querySelector(".remove-btn")) {
      const removeBtn = document.createElement("button")
      removeBtn.type = "button"
      removeBtn.className = "remove-btn"
      removeBtn.textContent = "✕"
      removeBtn.addEventListener("click", () => {
        input.remove()
        updateVehicleNumbers()
      })
      input.appendChild(removeBtn)
    }
  })

=======
      `
      vehicleContainer.appendChild(newVehicle)
    })
  }

>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
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

<<<<<<< HEAD
        // Display the emission factors being used
        console.log("Using emission factors:", { travelFactors, electricityFactor })

        // Add emission factors to the tips section for transparency
        const tipsBox = document.querySelector(".tips-box")
        if (tipsBox) {
          const factorsHTML = `
            <div class="emission-factors">
              <h4>Emission Factors Used:</h4>
              <p>Electricity: ${electricityFactor} kg CO₂/kWh</p>
              <p>Petrol: ${travelFactors.Petrol} kg CO₂/min</p>
              <p>Diesel: ${travelFactors.Diesel} kg CO₂/min</p>
              <p>CNG: ${travelFactors.CNG} kg CO₂/min</p>
              <p>Electric: ${travelFactors.Electric} kg CO₂/min</p>
            </div>
          `

          // Check if we already added the factors
          const existingFactors = tipsBox.querySelector(".emission-factors")
          if (existingFactors) {
            existingFactors.innerHTML = factorsHTML
          } else {
            const factorsDiv = document.createElement("div")
            factorsDiv.className = "emission-factors"
            factorsDiv.innerHTML = factorsHTML
            tipsBox.appendChild(factorsDiv)
          }
        }

=======
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
        let totalEmission = 0

        // Electricity Emissions
        const voltages = document.querySelectorAll(".voltage")
        const hours = document.querySelectorAll(".hours")
<<<<<<< HEAD
        const quantities = document.querySelectorAll(".quantity")

        // Validate if inputs exist
        if (voltages.length === 0 || hours.length === 0) {
          throw new Error("Please add at least one appliance")
        }

        // Prepare calculation data for logging
        const calculationData = {
          electricityEmissions: [],
          travelEmissions: [],
          totalEmission: 0,
          timestamp: new Date().toISOString(),
        }

        let electricityTotal = 0
        for (let i = 0; i < voltages.length; i++) {
          const watt = Number.parseFloat(voltages[i].value)
          const hour = Number.parseFloat(hours[i].value)
          const quantity = Number.parseInt(quantities[i].value) || 1 // Default to 1 if not specified
          if (!isNaN(watt) && !isNaN(hour) && !isNaN(quantity)) {
            const kWh = (watt * hour * quantity) / 1000
            const emission = kWh * electricityFactor
            electricityTotal += emission

            calculationData.electricityEmissions.push({
              watt,
              hour,
              quantity,
              kWh,
              emission,
            })
          }
        }

        totalEmission += electricityTotal

        // Transport Emissions
        const travelTimes = document.querySelectorAll(".travel-time")
        const vehicleTypes = document.querySelectorAll(".vehicle-type")
        const tripCounts = document.querySelectorAll(".trip-count")

        let travelTotal = 0
        for (let i = 0; i < travelTimes.length; i++) {
          const minutes = Number.parseFloat(travelTimes[i].value)
          const type = vehicleTypes[i].value
          const tripCount = Number.parseInt(tripCounts[i].value) || 1 // Default to 1 if not specified
          if (!isNaN(minutes) && !isNaN(tripCount)) {
            // Use emission factor from database
            const factor = travelFactors[type] || 0
            const emission = minutes * factor * tripCount
            travelTotal += emission

            calculationData.travelEmissions.push({
              minutes,
              type,
              tripCount,
              factor,
              emission,
            })
          }
        }

        totalEmission += travelTotal
        calculationData.totalEmission = totalEmission

        // Log the calculation
        logEmissionCalculation(calculationData).catch(console.error)

        // Display detailed result
        let resultHTML = `
          <h3>Total Estimated CO₂ Emission: ${totalEmission.toFixed(2)} kg</h3>
          <div class="emission-breakdown">
        `

        // Add breakdown if there are emissions
        if (calculationData.electricityEmissions.length > 0) {
          resultHTML += `<p>Electricity: ${electricityTotal.toFixed(2)} kg</p>`
        }

        if (calculationData.travelEmissions.length > 0) {
          resultHTML += `<p>Travel: ${travelTotal.toFixed(2)} kg</p>`
        }

        resultHTML += `</div>`

        // Display result
        resultBox.innerHTML = resultHTML
      } catch (error) {
        console.error("Calculation error:", error)
        resultBox.innerHTML = `<h3 class="error">Error: ${error.message || "Error calculating emissions. Please try again."}</h3>`
=======
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
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
      }
    })
  }
}
