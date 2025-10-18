import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // signOut,
} from 'firebase/auth';
import { app } from '../auth.config';

const authService = () => {
  const auth = getAuth(app);

  const signIn = async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(auth, email, password);
  };

  return {
    signIn,
  };
};

export default authService;
