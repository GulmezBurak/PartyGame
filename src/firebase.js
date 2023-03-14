import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDQq2E8eYJtQVitzKcIZTNrt4mR3D9kXAY",
  authDomain: "partygame-eb821.firebaseapp.com",
  projectId: "partygame-eb821",
  storageBucket: "partygame-eb821.appspot.com",
  messagingSenderId: "547345674610",
  appId: "1:547345674610:web:b2d30e6d75f5679529edeb",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
export const firestore = getFirestore(app)
