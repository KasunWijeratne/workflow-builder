import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  User,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
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
import { Role, UserWithRoles } from '../types/user.type';

const authService = () => {
  const auth = getAuth(app);
  const db = getFirestore();

  const getUserWithRoles = async (
    user: User
  ): Promise<UserWithRoles | null> => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs[0]) {
      const { roles } = querySnapshot.docs[0].data();
      return {
        user,
        roles,
      };
    }
    return null;
  };

  const signIn = async (credentials: {
    email: string;
    password: string;
  }): Promise<{ user: User; roles: Role[] } | null> => {
    const { email, password } = credentials;
    try {
      await setPersistence(auth, browserSessionPersistence);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return getUserWithRoles(user);
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
        email,
        uid: user.uid,
      });
    } catch (error) {
      console.error('Login error:', (error as AuthError).code);
      throw error;
    }
  };

  const checkUser = (callback: (user: UserWithRoles | null) => void) => {
    return onAuthStateChanged(auth, async (user) => {
      const userWithRoles = user ? await getUserWithRoles(user) : null;
      callback(userWithRoles);
    });
  };

  return {
    signIn,
    signUp,
    checkUser,
  };
};

export default authService;
