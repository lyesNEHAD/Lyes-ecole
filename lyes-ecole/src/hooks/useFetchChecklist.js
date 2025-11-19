import { useState, useEffect } from 'react';
import { getAllChecklists } from '../components/Apicall/ChecklistApi';

export const useFetchChecklists = () => {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        setLoading(true);
        const data = await getAllChecklists();
        
        // Normalize API response - map 'todo' to 'tasks' if needed
        const normalizedChecklists = data.map(checklist => ({
          ...checklist,
          tasks: checklist.tasks || checklist.todo || [],
        }));
        
        setChecklists(normalizedChecklists);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch checklists:', err);
        setError('Failed to load checklists');
        setChecklists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChecklists();
  }, []);

  return { checklists, setChecklists, loading, error };
};