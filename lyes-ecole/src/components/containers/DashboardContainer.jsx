import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardView from '../views/DashboardView';
import api from '../../Services/api';

export default function DashboardContainer() {
  const [checklists, setChecklists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    try {
      const data = await api.getAllChecklists();
      setChecklists(data.response || []);
    } catch (error) {
      console.error('Error loading checklists:', error);
    }
  };

  const handleChecklistClick = (id) => {
    navigate(`/checklist/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/formulaire/${id}`);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette checklist ?')) {
      try {
        await api.deleteChecklist(id);
        loadChecklists();
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    }
  };

  const handleNewClick = () => {
    navigate('/formulaire');
  };

  return (
    <DashboardView 
      checklists={checklists}
      onChecklistClick={handleChecklistClick}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      onNewClick={handleNewClick}
    />
  );
}
