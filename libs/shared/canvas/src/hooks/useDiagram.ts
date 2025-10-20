import { useState } from 'react';
import diagramService from '../services/diagram.service';
import { Diagram } from '../types/diagram.type';
import { useAuth } from '@shared/auth';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from '@firebase/util';
import { useNotification } from '@shared/ui';

export const useDiagram = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const getDiagrams = async (): Promise<Diagram[]> => {
    try {
      setLoading(true);
      const diagrams = await diagramService().getDiagrams(user?.id || '');
      return diagrams;
    } catch (error) {
      const code = (error as FirebaseError).code;
      addNotification(`Failed to load diagrams: ${code}`, 'error');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getDiagramById = async (id: string) => {
    try {
      setLoading(true);
      const data = await diagramService().getDiagramById(id);
      return data;
    } catch (error) {
      const code = (error as FirebaseError).code;
      addNotification(`Failed to load diagram: ${code}`, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createDiagram = async (diagram: Omit<Diagram, 'createdBy' | 'id'>) => {
    try {
      setLoading(true);
      await diagramService().createNewDiagram({
        ...diagram,
        createdBy: user?.id || '',
      });
      addNotification(`Diagram created successfully`, 'success');
    } catch (error) {
      const code = (error as FirebaseError).code;
      addNotification(`Failed to create diagram: ${code}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateDiagram = async (diagram: Diagram) => {
    try {
      setLoading(true);
      await diagramService().updateDiagram(diagram);
      addNotification(`Diagram updated successfully`, 'success');
    } catch (error) {
      const code = (error as FirebaseError).code;
      addNotification(`Failed to update diagram: ${code}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteDiagram = async (diagramId: string) => {
    try {
      setLoading(true);
      await diagramService().deleteDiagram(diagramId);
      addNotification(`Diagram deleted successfully`, 'success');
      navigate('/dashboard');
    } catch (error) {
      const code = (error as FirebaseError).code;
      addNotification(`Failed to delete diagram: ${code}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const shareDiagram = async (diagramId: string, userId: string) => {
    try {
      setLoading(true);
      await diagramService().shareDiagram(diagramId, userId);
      addNotification(`Diagram successfully shared with ${userId}`, 'success');
    } catch (error) {
      const code = (error as FirebaseError).code;
      addNotification(`Failed to share diagram: ${code}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getDiagrams,
    getDiagramById,
    createDiagram,
    updateDiagram,
    shareDiagram,
    deleteDiagram,
  };
};

export default useDiagram;
