import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDocs, 
  updateDoc 
} from "firebase/firestore";
import { 
  getDownloadURL, 
  ref, 
  uploadBytes, 
  deleteObject 
} from "firebase/storage";
import { database, storage } from "./firebaseSetup";
import { auth } from "./firebaseSetup"; // Import auth for user ID

// Helper function to format date to local timezone
function formatDateToLocal(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}

// MyIngredients CRUD
export async function addIngredient(data) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const docRef = await addDoc(collection(database, `users/${userId}/ingredients`), data);
    console.log("Ingredient added:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error adding ingredient:", err);
  }
}

export async function updateIngredient(id, data) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    await updateDoc(doc(database, `users/${userId}/ingredients/${id}`), data);
    console.log("Ingredient updated:", id);
  } catch (err) {
    console.error("Error updating ingredient:", err);
  }
}

export async function deleteIngredient(id) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    await deleteDoc(doc(database, `users/${userId}/ingredients/${id}`));
    console.log("Ingredient deleted:", id);
  } catch (err) {
    console.error("Error deleting ingredient:", err);
  }
}

export async function getIngredients() {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const querySnapshot = await getDocs(collection(database, `users/${userId}/ingredients`));
    const ingredients = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return ingredients;
  } catch (err) {
    console.error("Error fetching ingredients:", err);
  }
}

// Gallery CRUD with Firebase Storage integration
export async function addDishWithPhoto(photoUri, dishData) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const fileName = `${Date.now()}_${userId}.jpg`;
    const storageRef = ref(storage, `users/${userId}/dishes/${fileName}`);

    const response = await fetch(photoUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    const photoUrl = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(database, `users/${userId}/dishes`), {
      ...dishData,
      photoUrl,
    });

    return { id: docRef.id, ...dishData, photoUrl };
  } catch (error) {
    console.error("Error adding dish with photo:", error);
    throw new Error("Failed to upload photo or add dish data.");
  }
}

export async function deletePhoto(id, filename) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const fileRef = ref(storage, `users/${userId}/dishes/${filename}`);
    await deleteObject(fileRef);

    const photoDoc = doc(database, `users/${userId}/dishes/${id}`);
    await deleteDoc(photoDoc);
    console.log("Photo deleted:", id);
  } catch (err) {
    console.error("Error deleting photo:", err);
  }
}

export async function getPhotos() {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const querySnapshot = await getDocs(collection(database, `users/${userId}/dishes`));
    const photos = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    console.log("Fetched photos:", photos);
    return photos;
  } catch (err) {
    console.error("Error fetching photos:", err);
  }
}

// Reminder CRUD
export async function addReminder(data) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const formattedDate = formatDateToLocal(new Date(data.date));

    const docRef = await addDoc(collection(database, `users/${userId}/reminders`), {
      ...data,
      date: formattedDate, // Store as local timezone date
    });
    console.log("Reminder added:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error adding reminder:", err);
  }
}

export async function updateReminder(id, data) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const formattedDate = formatDateToLocal(new Date(data.date));
    await updateDoc(doc(database, `users/${userId}/reminders/${id}`), { ...data, date: formattedDate });
    console.log("Reminder updated:", id);
  } catch (err) {
    console.error("Error updating reminder:", err);
  }
}

export async function deleteReminder(id) {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    await deleteDoc(doc(database, `users/${userId}/reminders/${id}`));
    console.log("Reminder deleted:", id);
  } catch (err) {
    console.error("Error deleting reminder:", err);
  }
}

export async function getReminders() {
  try {
    if (!auth.currentUser) throw new Error("User not authenticated");
    const userId = auth.currentUser.uid; // User-specific path
    const querySnapshot = await getDocs(collection(database, `users/${userId}/reminders`));
    const reminders = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    console.log("Fetched reminders from Firestore:", reminders);
    return reminders;
  } catch (err) {
    console.error("Error fetching reminders:", err);
  }
}
