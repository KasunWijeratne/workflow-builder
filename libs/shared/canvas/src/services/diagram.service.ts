import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Diagram } from '../types/diagram.type';
import { FirebaseError } from '@firebase/util';

const diagramService = () => {
  const db = getFirestore();

  const createNewDiagram = async ({
    createdBy,
    nodes,
    edges,
    name,
  }: Diagram) => {
    try {
      const diagramsCollection = collection(db, 'diagrams');
      await addDoc(diagramsCollection, {
        createdBy,
        name,
        nodes,
        edges,
      });
    } catch (error) {
      console.error('Create diagram error:', (error as FirebaseError).code);
      throw error;
    }
  };

  return {
    createNewDiagram,
  };
};

export default diagramService;
