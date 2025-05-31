<<<<<<< HEAD
import { db, doc, getDoc, setDoc, collection } from "./firebase.js"
import { auth } from "./firebase.js"
=======
import { db, doc, getDoc, setDoc } from "./firebase.js"
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63

// Initialize the database with default emission factors if they don't exist
export const initializeDatabase = async () => {
  try {
    // Check if travel emission factors exist
    const travelFactorsRef = doc(db, "emissionFactors", "travel")
    const travelFactorsSnap = await getDoc(travelFactorsRef)

<<<<<<< HEAD
    const defaultTravelFactors = {
      Petrol: 0.19, // kg CO2 per minute
      Diesel: 0.21,
      CNG: 0.14,
      Electric: 0.05,
    }

    if (!travelFactorsSnap.exists()) {
      // Create default travel emission factors
      await setDoc(travelFactorsRef, defaultTravelFactors)
      console.log("Default travel emission factors created")
    } else {
      // Check if all required factors exist, update if needed
      const existingData = travelFactorsSnap.data()
      let needsUpdate = false

      for (const key in defaultTravelFactors) {
        if (existingData[key] === undefined) {
          existingData[key] = defaultTravelFactors[key]
          needsUpdate = true
        }
      }

      if (needsUpdate) {
        await setDoc(travelFactorsRef, existingData)
        console.log("Updated missing travel emission factors")
      }
=======
    if (!travelFactorsSnap.exists()) {
      // Create default travel emission factors
      await setDoc(travelFactorsRef, {
        Petrol: 0.19, // kg CO2 per minute
        Diesel: 0.21,
        CNG: 0.14,
        Electric: 0.05,
      })
      console.log("Default travel emission factors created")
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
    }

    // Check if electricity emission factors exist
    const electricityFactorsRef = doc(db, "emissionFactors", "electricity")
    const electricityFactorsSnap = await getDoc(electricityFactorsRef)

    if (!electricityFactorsSnap.exists()) {
      // Create default electricity emission factors
      await setDoc(electricityFactorsRef, {
        conversionFactor: 0.92, // kg CO2 per kWh
      })
      console.log("Default electricity emission factors created")
    }
<<<<<<< HEAD

    return true
  } catch (error) {
    console.error("Error initializing database:", error)
    return false
=======
  } catch (error) {
    console.error("Error initializing database:", error)
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
  }
}

// Get travel emission factors
export const getTravelEmissionFactors = async () => {
  try {
    const travelFactorsRef = doc(db, "emissionFactors", "travel")
    const travelFactorsSnap = await getDoc(travelFactorsRef)

    if (travelFactorsSnap.exists()) {
      return travelFactorsSnap.data()
    } else {
      console.log("No travel emission factors found, initializing database")
      await initializeDatabase()
      const newSnap = await getDoc(travelFactorsRef)
      return newSnap.data()
    }
  } catch (error) {
    console.error("Error getting travel emission factors:", error)
    // Return default values as fallback
    return {
      Petrol: 0.19,
      Diesel: 0.21,
      CNG: 0.14,
      Electric: 0.05,
    }
  }
}

// Get electricity emission factors
export const getElectricityEmissionFactor = async () => {
  try {
    const electricityFactorsRef = doc(db, "emissionFactors", "electricity")
    const electricityFactorsSnap = await getDoc(electricityFactorsRef)

    if (electricityFactorsSnap.exists()) {
      return electricityFactorsSnap.data().conversionFactor
    } else {
      console.log("No electricity emission factors found, initializing database")
      await initializeDatabase()
      const newSnap = await getDoc(electricityFactorsRef)
      return newSnap.data().conversionFactor
    }
  } catch (error) {
    console.error("Error getting electricity emission factor:", error)
    // Return default value as fallback
    return 0.92
  }
}

<<<<<<< HEAD
// Log emission calculation for debugging
export const logEmissionCalculation = async (calculationData) => {
  try {
    // Get current user
    const user = auth.currentUser
    if (!user) return false

    // Create a new calculation record
    const calculationRef = doc(collection(db, "users", user.uid, "calculations"))
    await setDoc(calculationRef, {
      ...calculationData,
      timestamp: new Date().toISOString(),
    })

    return true
  } catch (error) {
    console.error("Error logging calculation:", error)
    return false
  }
}

=======
>>>>>>> 4b8d2ec7a50cfe0c0b599152f27c183c1687aa63
// Save user data
export const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true })
    return true
  } catch (error) {
    console.error("Error saving user data:", error)
    return false
  }
}

// Get user data
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data()
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting user data:", error)
    return null
  }
}
