import { useState } from 'react';
import diagramService from '../services/diagram.service';
import { Diagram } from '../types/diagram.type';
import { useAuth } from '@shared/auth';

export const useDiagram = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getDiagrams = async (): Promise<Diagram[]> => {
    setLoading(true);
    const diagrams = await diagramService().getDiagrams(user?.id || '');
    setLoading(false);
    return diagrams;
  };

  const createDiagram = async (diagram: Omit<Diagram, 'createdBy' | 'id'>) => {
    setLoading(true);
    await diagramService().createNewDiagram({
      ...diagram,
      createdBy: user?.id || '',
    });
    setLoading(false);
  };

  const getDiagramById = async (id: string) => {
    setLoading(true);
    const data = await diagramService().getDiagramById(id);
    setLoading(false);
    return data;
  };

  const shareDiagram = async (diagramId: string, userId: string) => {
    setLoading(true);
    await diagramService().shareDiagram(diagramId, userId);
    setLoading(false);
  };

  return {
    loading,
    createDiagram,
    getDiagrams,
    getDiagramById,
    shareDiagram,
  };
};

export default useDiagram;
