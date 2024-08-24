import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to retrieve data from storage
export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from storage", error);
    return null;
  }
}

// Function to save data to storage
export async function saveToStorage(key: string, data: object) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to storage", error);
  }
}
