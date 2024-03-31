import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHuxA5rKdEEhGxBoeEhxx6AWGLS1aFlQE",
  authDomain: "collaborative-whiteboard-5ac3f.firebaseapp.com",
  projectId: "collaborative-whiteboard-5ac3f",
  storageBucket: "collaborative-whiteboard-5ac3f.appspot.com",
  messagingSenderId: "96842641811",
  appId: "1:96842641811:web:65913fde6e4fe47ee13866",
  measurementId: "G-VXXG7VWPPK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export { signUpWithEmailAndPassword, signInWithEmailAndPassword };

