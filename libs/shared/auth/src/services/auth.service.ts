import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  User,
} from 'firebase/auth';
import {
  addDoc,
  getDocs,
  collection,
  getFirestore,
  where,
  query,
} from 'firebase/firestore';
import { app } from '../auth.config';
import { Role } from '../types/user.type';

const authService = () => {
  const auth = getAuth(app);
  const db = getFirestore();

  const signIn = async (credentials: {
    email: string;
    password: string;
  }): Promise<{ user: User; roles: Role[] }> => {
    const { email, password } = credentials;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const { roles } = querySnapshot.docs[0].data();
      return {
        user,
        roles,
      };
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
        roles,
        uid: user.uid,
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
