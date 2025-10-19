import {
  addDoc,
  getDocs,
  getDoc,
  collection,
  getFirestore,
  where,
  query,
  doc,
} from 'firebase/firestore';
import { Diagram } from '../types/diagram.type';
import { FirebaseError } from '@firebase/util';

const diagramService = () => {
  const db = getFirestore();

  const getDiagrams = async (user: string): Promise<Diagram[]> => {
    try {
      const diagramsCollection = collection(db, 'diagrams');
      const q = query(diagramsCollection, where('createdBy', '==', user));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          createdBy: data.createdBy,
          name: data.name,
          nodes: data.nodes,
          edges: data.edges,
        };
      });
      return data;
    } catch (error) {
      console.error('Create diagram error:', (error as FirebaseError).code);
      throw error;
    }
  };

  const createNewDiagram = async ({
    createdBy,
    nodes,
    edges,
    name,
  }: Omit<Diagram, 'id'>) => {
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

  const getDiagramById = async (id: string) => {
    try {
      const diagramDoc = doc(db, 'diagrams', id);
      const diagram = await getDoc(diagramDoc);
      return diagram.data();
    } catch (error) {
      console.error('Fetch diagram error:', (error as FirebaseError).code);
      throw error;
    }
  };

  return {
    createNewDiagram,
    getDiagrams,
    getDiagramById,
  };
};

export default diagramService;
