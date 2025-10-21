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
import { Diagram, Ownership } from '../types/diagram.type';
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

      const data = querySnapshot.flatMap((snapshot, i) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            createdBy: data.createdBy,
            name: data.name,
            nodes: data.nodes,
            edges: data.edges,
            shared: i === 1 ? Ownership.Shared : Ownership.Created,
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
    const diagramDoc = doc(db, 'diagrams', id);
    const diagram = await getDoc(diagramDoc);
    return diagram.data();
  };

  const createNewDiagram = async ({
    createdBy,
    nodes,
    edges,
    name,
  }: Omit<Diagram, 'id'>) => {
    const diagramsCollection = collection(db, 'diagrams');
    await addDoc(diagramsCollection, {
      createdBy,
      name,
      nodes,
      edges,
      sharedWith: [],
    });
  };

  const updateDiagram = async (diagram: Diagram) => {
    const diagramDoc = doc(db, 'diagrams', diagram.id);
    await updateDoc(diagramDoc, {
      name: diagram.name,
      nodes: diagram.nodes,
      edges: diagram.edges,
    });
  };

  const deleteDiagram = async (id: string) => {
    const diagramDoc = doc(db, 'diagrams', id);
    await deleteDoc(diagramDoc);
  };

  const shareDiagram = async (diagramId: string, userId: string) => {
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
