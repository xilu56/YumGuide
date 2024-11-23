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
    const docRef = await addDoc(collection(database, "MyIngredients"), data);
    console.log("Ingredient added:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error adding ingredient:", err);
  }
}

export async function updateIngredient(id, data) {
  try {
    await updateDoc(doc(database, "MyIngredients", id), data);
    console.log("Ingredient updated:", id);
  } catch (err) {
    console.error("Error updating ingredient:", err);
  }
}

export async function deleteIngredient(id) {
  try {
    await deleteDoc(doc(database, "MyIngredients", id));
    console.log("Ingredient deleted:", id);
  } catch (err) {
    console.error("Error deleting ingredient:", err);
  }
}

export async function getIngredients() {
  try {
    const querySnapshot = await getDocs(collection(database, "MyIngredients"));
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
    const fileName = `${Date.now()}_${dishData.userId}.jpg`;
    const storageRef = ref(storage, `dishes/${fileName}`);

    const response = await fetch(photoUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    const photoUrl = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(database, "MyDishes"), {
      ...dishData,
      photoUrl,
    });

    return { id: docRef.id, ...dishData, photoUrl };
  } catch (error) {
    console.error("Error adding dish with photo:", error);
    throw new Error("Failed to upload photo or add dish data.");
  }
}

export async function updatePhoto(id, updatedData) {
  try {
    const photoDoc = doc(database, "Gallery", id);
    await updateDoc(photoDoc, updatedData);
    console.log("Photo metadata updated:", id);
  } catch (err) {
    console.error("Error updating photo:", err);
  }
}

export async function deletePhoto(id, filename) {
  try {
    const fileRef = ref(storage, `gallery/${filename}`);
    await deleteObject(fileRef);

    const photoDoc = doc(database, "Gallery", id);
    await deleteDoc(photoDoc);
    console.log("Photo deleted:", id);
  } catch (err) {
    console.error("Error deleting photo:", err);
  }
}

export async function getPhotos() {
  try {
    const querySnapshot = await getDocs(collection(database, "MyDishes"));
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
    // Format the date to local timezone before saving
    const formattedDate = formatDateToLocal(new Date(data.date));

    const docRef = await addDoc(collection(database, "Reminders"), {
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
    const formattedDate = formatDateToLocal(new Date(data.date));
    await updateDoc(doc(database, "Reminder", id), { ...data, date: formattedDate });
    console.log("Reminder updated:", id);
  } catch (err) {
    console.error("Error updating reminder:", err);
  }
}

export async function deleteReminder(id) {
  try {
    await deleteDoc(doc(database, "Reminder", id));
    console.log("Reminder deleted:", id);
  } catch (err) {
    console.error("Error deleting reminder:", err);
  }
}

export async function getReminders() {
  try {
    const querySnapshot = await getDocs(collection(database, "Reminder"));
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

// Get Unique Reminders
export async function getUniqueReminders() {
  try {
    const reminders = await getReminders();
    const uniqueReminders = reminders.filter(
      (reminder, index, self) =>
        index ===
        self.findIndex(
          (r) =>
            r.description === reminder.description &&
            r.time === reminder.time &&
            r.title === reminder.title
        )
    );
    console.log("Unique reminders:", uniqueReminders);
    return uniqueReminders;
  } catch (err) {
    console.error("Error fetching unique reminders:", err);
  }
}
