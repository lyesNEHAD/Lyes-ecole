import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormulaireView from '../views/FormulaireView';
import api from '../../Services/api';

export default function FormulaireContainer() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([{ title: '', description: '', statut: 0 }]);
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
      setTitle(data.title);
      setDescription(data.description);
      setTodos(data.todo || []);
    } catch (error) {
      console.error('Error loading checklist:', error);
    }
  };

  const handleTodoChange = (index, field, value) => {
    const updatedTodos = [...todos];
    updatedTodos[index][field] = value;
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { title: '', description: '', statut: 0 }]);
  };

  const handleRemoveTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Le titre est obligatoire');
      return;
    }

    const validTodos = todos.filter(todo => todo.title.trim() !== '');

    try {
      if (id) {
        await api.updateChecklist(id, title, description, validTodos);
      } else {
        await api.addChecklist(title, description, validTodos);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving checklist:', error);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <FormulaireView 
      title={title}
      description={description}
      todos={todos}
      onTitleChange={setTitle}
      onDescriptionChange={setDescription}
      onTodoChange={handleTodoChange}
      onAddTodo={handleAddTodo}
      onRemoveTodo={handleRemoveTodo}
      onSave={handleSave}
      onBack={handleBack}
    />
  );
}
