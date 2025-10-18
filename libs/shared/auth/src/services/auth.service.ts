import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '../auth.config';
import { Role } from '../types/user.type';

const authService = () => {
  const auth = getAuth(app);
  const db = getFirestore();

  const signIn = async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', (error as AuthError).code);
      throw error;
    }
  };

  const signUp = async (credentials: {
    email: string;
    password: string;
    roles: Role[];
  }) => {
    const { email, password, roles } = credentials;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, {
        email,
        password,
        roles,
        uuid: user.uid,
      });
    } catch (error) {
      console.error('Login error:', (error as AuthError).code);
      throw error;
    }
  };

  return {
    signIn,
    signUp,
  };
};

export default authService;
