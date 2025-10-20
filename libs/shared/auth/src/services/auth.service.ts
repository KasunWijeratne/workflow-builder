import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  User,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut as firebaseSignOut,
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
    await setPersistence(auth, browserSessionPersistence);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return getUserWithRoles(user);
  };

  const signUp = async (credentials: {
    email: string;
    password: string;
    roles: Role[];
  }) => {
    const { email, password, roles } = credentials;
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
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
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
    signOut,
  };
};

export default authService;
