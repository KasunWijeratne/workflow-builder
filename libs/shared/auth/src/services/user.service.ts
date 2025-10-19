import { FirebaseError } from 'firebase/app';
import { getDocs, collection, getFirestore } from 'firebase/firestore';

const userService = () => {
  const getUsers = async () => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Fetching users error:', (error as FirebaseError).code);
      throw error;
    }
  };

  return {
    getUsers,
  };
};

export default userService;
