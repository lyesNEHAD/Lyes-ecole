import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChecklistView from '../views/ChecklistView';
import api from '../../Services/api';

export default function ChecklistContainer() {
  const [checklist, setChecklist] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadChecklist();
    }
  }, [id]);

  const loadChecklist = async () => {
    try {
      const data = await api.getChecklist(id);
      setChecklist(data);
    } catch (error) {
      console.error('Error loading checklist:', error);
    }
  };

  const handleTaskToggle = async (taskIndex) => {
    const updatedTodos = checklist.todo.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, statut: task.statut === 1 ? 0 : 1 };
      }
      return task;
    });

    const allCompleted = updatedTodos.every(task => task.statut === 1);
    const newStatus = allCompleted ? 2 : updatedTodos.some(task => task.statut === 1) ? 1 : 0;

    // Optimistic update - update UI immediately
    setChecklist({ ...checklist, todo: updatedTodos, status: newStatus });

    // Update server in background
    try {
      await api.updateChecklist(
        checklist.id,
        checklist.title,
        checklist.description,
        updatedTodos
      );

      if (allCompleted) {
        await api.updateChecklistStatus(checklist.id, 2);
      }
    } catch (error) {
      console.error('Error updating checklist:', error);
      // Revert on error
      loadChecklist();
    }
  };

  const handleTaskDelete = async (taskIndex) => {
    const updatedTodos = checklist.todo.filter((_, index) => index !== taskIndex);

    // Optimistic update
    setChecklist({ ...checklist, todo: updatedTodos });

    // Update server in background
    try {
      await api.updateChecklist(
        checklist.id,
        checklist.title,
        checklist.description,
        updatedTodos
      );
    } catch (error) {
      console.error('Error deleting task:', error);
      // Revert on error
      loadChecklist();
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <ChecklistView 
      checklist={checklist}
      onTaskToggle={handleTaskToggle}
      onTaskDelete={handleTaskDelete}
      onBack={handleBack}
    />
  );
}
