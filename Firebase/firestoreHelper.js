import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { database, storage } from "./firebaseSetup";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

  
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
      // Generate a unique filename for the photo
      const fileName = `${Date.now()}_${dishData.userId}.jpg`;
      const storageRef = ref(storage, `dishes/${fileName}`);
  
      // Convert local photo URI to Blob
      const response = await fetch(photoUri);
      const blob = await response.blob();
  
      // Upload photo to Firebase Storage
      await uploadBytes(storageRef, blob);
  
      // Get the downloadable URL for the uploaded photo
      const photoUrl = await getDownloadURL(storageRef);
  
      // Add the dish data to Firestore, including the photo URL
      const docRef = await addDoc(collection(database, "MyDishes"), {
        ...dishData,
        photoUrl, // Save the photo URL in Firestore
      });
  
      // Return the full dish data with the generated Firestore ID
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
      // Delete the file from Firebase Storage
      const fileRef = ref(storage, `gallery/${filename}`);
      await deleteObject(fileRef);
  
      // Delete the photo's metadata from Firestore
      const photoDoc = doc(database, "Gallery", id);
      await deleteDoc(photoDoc);
      console.log("Photo deleted:", id);
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  }
  
  export async function getPhotos() {
    try {
      const querySnapshot = await getDocs(collection(database, "Gallery"));
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
      const docRef = await addDoc(collection(database, "Reminder"), data);
      console.log("Reminder added:", docRef.id);
      return docRef.id;
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  }
  
  export async function updateReminder(id, data) {
    try {
      await updateDoc(doc(database, "Reminder", id), data);
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
      return reminders;
    } catch (err) {
      console.error("Error fetching reminders:", err);
    }
  }
  