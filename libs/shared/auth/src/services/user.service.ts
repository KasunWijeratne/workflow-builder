import { getDocs, collection, getFirestore } from 'firebase/firestore';

const userService = () => {
  const getUsers = async () => {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  return {
    getUsers,
  };
};

export default userService;
