import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// github에 올라가지 않도록 .env 처리 해줌
// 보안과 관련된건 아님 왜냐하면 나중에 build하면 다 원래 키로 바뀌기 때문...
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export default app;
export const authService = getAuth();
export const dbService = getFirestore();
