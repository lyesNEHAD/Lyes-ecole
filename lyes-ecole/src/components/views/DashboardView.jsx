import React from 'react';
import '../../assets/css/Dashboard.css';

export default function DashboardView({ 
  checklists, 
  onChecklistClick, 
  onEditClick, 
  onDeleteClick, 
  onNewClick 
}) {
  const getStatusText = (status) => {
    return status === 0 ? 'Vierge' : status === 1 ? 'En cours' : 'Terminée';
  };

  // Filter to show checklists that are in progress or completed (not "Vierge")
  const activeChecklists = checklists.filter(checklist => checklist.status !== 0);

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <button className="btn-new" onClick={onNewClick}>
          + New checklist
        </button>
      </header>

      <div className="checklist-container">
        {activeChecklists.length === 0 ? (
          <p>Aucune checklist pour le moment. Créez-en une nouvelle !</p>
        ) : (
          <div className="cards">
            {activeChecklists.map((checklist) => {
              const completedTasks = checklist.todo.filter(task => task.statut === 1).length;
              const totalTasks = checklist.todo.length;

              return (
                <div key={checklist.id} className="card">
                  <div onClick={() => onChecklistClick(checklist.id)}>
                    <h3>{checklist.title}</h3>
                    <p>{checklist.description}</p>
                    <p>Statut: {getStatusText(checklist.status)}</p>
                    <p>Progression: {completedTasks}/{totalTasks}</p>
                  </div>
                  <div className="card-actions">
                    <button onClick={(e) => { e.stopPropagation(); onEditClick(checklist.id); }}>
                      Éditer
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDeleteClick(checklist.id); }}>
                      Supprimer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
