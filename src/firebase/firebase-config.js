import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFgSyYCm5fTHMhHA0iq6nqeV27aLKiWnE",

  authDomain: "chat-realtime-react-c7038.firebaseapp.com",

  projectId: "chat-realtime-react-c7038",

  storageBucket: "chat-realtime-react-c7038.appspot.com",

  messagingSenderId: "757729767895",

  appId: "1:757729767895:web:605261d27ff6997caf5b92",
};

const app = initializeApp(firebaseConfig);
//base de datos de firebase
const dbFirestore = getFirestore(app);
//autenticación de firebase
const auth = getAuth(app);
//proovedor para el inicio de sesión;
const provider = new GoogleAuthProvider();

const storage = getStorage();

export { dbFirestore, auth, provider, storage };
