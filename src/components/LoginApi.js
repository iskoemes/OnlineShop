import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.js";

export async function loginUser(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  const snap = await getDoc(doc(db, "users", user.uid));
  const profile = snap.exists() ? snap.data() : {};

  return {
    uid: user.uid,
    email: user.email,
    name: profile.name || "",
    isAdmin: !!profile.admin
  };
}