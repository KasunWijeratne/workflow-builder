import { useState } from 'react';
import diagramService from '../services/diagram.service';
import { Diagram } from '../types/diagram.type';
import { useAuth } from '@shared/auth';

export const useDiagram = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createDiagram = async (diagram: Omit<Diagram, 'createdBy'>) => {
    setLoading(true);
    await diagramService().createNewDiagram({
      ...diagram,
      createdBy: user?.id || '',
    });
    setLoading(false);
  };

  return {
    loading,
    createDiagram,
  };
};

export default useDiagram;
