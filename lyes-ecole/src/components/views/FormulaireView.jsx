import React from 'react';
import '../../assets/css/Formulaire.css';

export default function FormulaireView({ 
  title,
  description,
  todos,
  onTitleChange,
  onDescriptionChange,
  onTodoChange,
  onAddTodo,
  onRemoveTodo,
  onSave,
  onBack
}) {
  return (
    <div className="formulaire">
      <header>
        <button className="btn-back" onClick={onBack}>
          Back
        </button>
        <h1>Formulaire</h1>
      </header>

      <div className="form-content">
        <div className="form-group">
          <label>Titre</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Titre de la checklist"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description de la checklist"
          />
        </div>

        <div className="tasks-section">
          <h3>Tâches</h3>
          {todos.map((todo, index) => (
            <div key={index} className="task-item">
              <input 
                type="text" 
                value={todo.title}
                onChange={(e) => onTodoChange(index, 'title', e.target.value)}
                placeholder="Titre de la tâche"
              />
              <input 
                type="text" 
                value={todo.description || ''}
                onChange={(e) => onTodoChange(index, 'description', e.target.value)}
                placeholder="Description (optionnelle)"
              />
              <button onClick={() => onRemoveTodo(index)}>Supprimer</button>
            </div>
          ))}
          <button className="btn-add-task" onClick={onAddTodo}>+ Ajouter une tâche</button>
        </div>

        <button className="btn-submit" onClick={onSave}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
