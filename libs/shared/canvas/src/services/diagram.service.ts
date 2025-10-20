import {
  addDoc,
  getDocs,
  getDoc,
  collection,
  getFirestore,
  where,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Diagram } from '../types/diagram.type';
import { FirebaseError } from '@firebase/util';

const diagramService = () => {
  const db = getFirestore();

  const getDiagrams = async (user: string): Promise<Diagram[]> => {
    try {
      const diagramsCollection = collection(db, 'diagrams');
      const qCreated = query(
        diagramsCollection,
        where('createdBy', '==', user)
      );
      const qShared = query(
        diagramsCollection,
        where('sharedWith', 'array-contains', user)
      );

      const querySnapshot = await Promise.all([
        getDocs(qCreated),
        getDocs(qShared),
      ]);

      const data = querySnapshot.flatMap((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            createdBy: data.createdBy,
            name: data.name,
            nodes: data.nodes,
            edges: data.edges,
          };
        });
      });

      return data;
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
        sharedWith: [],
      });
    } catch (error) {
      console.error('Create diagram error:', (error as FirebaseError).code);
      throw error;
    }
  };

  const updateDiagram = async (diagram: Diagram) => {
    try {
      const diagramDoc = doc(db, 'diagrams', diagram.id);
      await updateDoc(diagramDoc, {
        name: diagram.name,
        nodes: diagram.nodes,
        edges: diagram.edges,
      });
    } catch (error) {
      console.error('Update diagram error:', (error as FirebaseError).code);
      throw error;
    }
  };

  const deleteDiagram = async (id: string) => {
    try {
      const diagramDoc = doc(db, 'diagrams', id);
      await deleteDoc(diagramDoc);
    } catch (error) {
      console.error('Delete diagram error:', (error as FirebaseError).code);
      throw error;
    }
  };

  const shareDiagram = async (diagramId: string, userId: string) => {
    try {
      const diagramDoc = doc(db, 'diagrams', diagramId);
      const diagram = await getDoc(diagramDoc);
      if (diagram.exists()) {
        const diagramData = diagram.data();
        const sharedWith = diagramData.sharedWith || [];
        if (!sharedWith.includes(userId)) {
          sharedWith.push(userId);
          await updateDoc(diagramDoc, { sharedWith });
        }
      }
    } catch (error) {
      console.error('Share diagram error:', (error as FirebaseError).code);
      throw error;
    }
  };

  return {
    getDiagrams,
    getDiagramById,
    createNewDiagram,
    updateDiagram,
    shareDiagram,
    deleteDiagram,
  };
};

export default diagramService;
