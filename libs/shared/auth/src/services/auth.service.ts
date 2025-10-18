import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // signOut,
} from 'firebase/auth';
import { addDoc, collection, doc, getFirestore } from 'firebase/firestore';
import { app } from '../auth.config';
import { Role } from '../types/user.type';

const authService = () => {
  const auth = getAuth(app);
  const db = getFirestore();

  const signIn = async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (credentials: {
    email: string;
    password: string;
    role: Role;
  }) => {
    const { email, password } = credentials;
    const user = await createUserWithEmailAndPassword(auth, email, password);
    debugger;
    const usersCollection = collection(db, 'users');
    // const docRef = await addDoc(usersCollection, {
    //   email,
    //   password,
    //   role,
    //   uuid: user,
    // });
  };

  return {
    signIn,
    signUp,
  };
};

export default authService;
