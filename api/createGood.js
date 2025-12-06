import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";


export async function createGood(data) {
  try {
    const docRef = await addDoc(collection(db, "goods"), data);
    console.log("Order created:", docRef.id);
  } catch (err) {
    console.error("Ты не админ, дружок:", err);
  }
}
