import { signInWithPopup, signOut } from "firebase/auth";

import { auth, googleProvider } from "../FirebaseConfig/firebase.config";

// sign in with google
export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    return response;
  } catch (error) {
    console.log("Arya popup");
    console.log(error);
  }
};
// logout user
export const logoutUser = async () => {
  try {
    const response = await signOut(auth);
    return response;
  } catch (err) {
    console.log(err);
  }
};
