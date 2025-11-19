import React from 'react';
import '../../assets/css/Checklist.css';

export default function ChecklistView({ 
  checklist, 
  onTaskToggle, 
  onTaskDelete,
  onBack 
}) {
  if (!checklist) {
    return <div>Loading...</div>;
  }

  const completedTasks = checklist.todo.filter(task => task.statut === 1).length;
  const totalTasks = checklist.todo.length;
  const statusText = checklist.status === 0 ? 'Vierge' : checklist.status === 1 ? 'En cours' : 'Terminée';

  return (
    <div className="checklist-page">
      <header>
        <button className="btn-back" onClick={onBack}>
          Back
        </button>
        <h1>Checklist</h1>
      </header>

      <div className="content">
        <h2>{checklist.title}</h2>
        <p>{checklist.description}</p>

        <div className="tasks">
          {checklist.todo.map((task, index) => (
            <div key={index} className="task-row">
              <label>
                <input 
                  type="checkbox" 
                  checked={task.statut === 1}
                  onChange={() => onTaskToggle(index)}
                />
                {task.title}
                {task.description && <span> - {task.description}</span>}
              </label>
              <button 
                className="btn-delete-task"
                onClick={() => onTaskDelete(index)}
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="status">
          <p>Progression: {completedTasks}/{totalTasks}</p>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
            ></div>
          </div>
          
          <p>Statut: {statusText}</p>
        </div>
      </div>
    </div>
  );
}
