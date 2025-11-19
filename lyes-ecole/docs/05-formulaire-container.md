# FormulaireContainer - Explication ligne par ligne

**Fichier :** `src/components/containers/FormulaireContainer.jsx`

## Imports

```javascript
import React, { useState, useEffect } from 'react';
```
- React et hooks pour gérer l'état et les effets

```javascript
import { useNavigate, useParams } from 'react-router-dom';
```
- `useNavigate` : navigation
- `useParams` : récupérer l'id depuis l'URL

```javascript
import FormulaireView from '../views/FormulaireView';
```
- Composant de présentation du formulaire

```javascript
import api from '../../Services/api';
```
- Service API

## Fonction principale

```javascript
export default function FormulaireContainer() {
```

## État du formulaire

```javascript
  const [title, setTitle] = useState('');
```
- État pour le titre de la checklist
- Initialisé à une chaîne vide

```javascript
  const [description, setDescription] = useState('');
```
- État pour la description

```javascript
  const [todos, setTodos] = useState([{ title: '', description: '', statut: 0 }]);
```
- État pour les tâches
- Initialisé avec une tâche vide
- Chaque tâche a : title, description, statut

## Hooks de navigation

```javascript
  const navigate = useNavigate();
```
- Fonction pour naviguer

```javascript
  const { id } = useParams();
```
- Récupère l'id depuis l'URL
- Si URL = `/formulaire/5` → `id = "5"` (mode édition)
- Si URL = `/formulaire` → `id = undefined` (mode création)

## Chargement en mode édition

```javascript
  useEffect(() => {
```
- S'exécute au montage et quand `id` change

```javascript
    if (id) {
```
- Si `id` existe → mode édition

```javascript
      loadChecklist();
    }
  }, [id]);
```
- Charge les données de la checklist à éditer

## Fonction de chargement

```javascript
  const loadChecklist = async () => {
```
- Charge les données d'une checklist existante

```javascript
    try {
      const data = await api.getChecklist(id);
```
- Récupère la checklist depuis l'API

```javascript
      setTitle(data.title);
```
- Remplit le champ titre

```javascript
      setDescription(data.description);
```
- Remplit le champ description

```javascript
      setTodos(data.todo || []);
```
- Remplit les tâches (ou tableau vide si pas de tâches)

```javascript
    } catch (error) {
      console.error('Error loading checklist:', error);
    }
  };
```

## Modification d'une tâche

```javascript
  const handleTodoChange = (index, field, value) => {
```
- Appelée quand l'utilisateur tape dans un champ de tâche
- Paramètres :
  - `index` : position de la tâche dans le tableau
  - `field` : "title" ou "description"
  - `value` : nouvelle valeur saisie

```javascript
    const updatedTodos = [...todos];
```
- Crée une copie du tableau de tâches
- `...todos` spread le tableau (immutabilité)

```javascript
    updatedTodos[index][field] = value;
```
- Modifie la propriété spécifique de la tâche
- Exemple : `updatedTodos[2]['title'] = "Nouvelle valeur"`

```javascript
    setTodos(updatedTodos);
```
- Met à jour l'état avec le nouveau tableau

```javascript
  };
```

## Ajout d'une tâche

```javascript
  const handleAddTodo = () => {
```
- Appelée au clic sur "+ Ajouter une tâche"

```javascript
    setTodos([...todos, { title: '', description: '', statut: 0 }]);
```
- Ajoute une nouvelle tâche vide à la fin du tableau
- `...todos` copie toutes les tâches existantes
- Ajoute un nouvel objet vide

```javascript
  };
```

## Suppression d'une tâche

```javascript
  const handleRemoveTodo = (index) => {
```
- Appelée au clic sur "Supprimer" d'une tâche
- Reçoit l'index de la tâche à supprimer

```javascript
    setTodos(todos.filter((_, i) => i !== index));
```
- Crée un nouveau tableau sans la tâche à l'index donné
- `filter` garde toutes les tâches SAUF celle à l'index `index`
- `_` signifie qu'on n'utilise pas la valeur, seulement l'index

```javascript
  };
```

## Sauvegarde

```javascript
  const handleSave = async () => {
```
- Appelée au clic sur "Sauvegarder"

### Validation

```javascript
    if (!title.trim()) {
```
- Vérifie que le titre n'est pas vide
- `.trim()` enlève les espaces au début et à la fin

```javascript
      alert('Le titre est obligatoire');
      return;
```
- Affiche une alerte et arrête l'exécution

```javascript
    }
```

### Nettoyage des tâches

```javascript
    const validTodos = todos.filter(todo => todo.title.trim() !== '');
```
- Filtre les tâches qui ont un titre non vide
- Ignore les tâches vides que l'utilisateur n'a pas remplies

### Appel API

```javascript
    try {
      if (id) {
```
- Si `id` existe → mode édition

```javascript
        await api.updateChecklist(id, title, description, validTodos);
```
- Met à jour la checklist existante

```javascript
      } else {
```
- Sinon → mode création

```javascript
        await api.addChecklist(title, description, validTodos);
```
- Crée une nouvelle checklist

```javascript
      }
```

### Navigation après sauvegarde

```javascript
      navigate('/dashboard');
```
- Redirige vers le dashboard après la sauvegarde

```javascript
    } catch (error) {
      console.error('Error saving checklist:', error);
    }
  };
```

## Retour au dashboard

```javascript
  const handleBack = () => {
```
- Appelée au clic sur "Back"

```javascript
    navigate('/dashboard');
```
- Retourne au dashboard sans sauvegarder

```javascript
  };
```

## Rendu

```javascript
  return (
    <FormulaireView 
```
- Retourne le composant de présentation

```javascript
      title={title}
      description={description}
      todos={todos}
```
- Passe les valeurs du formulaire

```javascript
      onTitleChange={setTitle}
      onDescriptionChange={setDescription}
```
- Passe les fonctions de changement directes
- `setTitle` est directement une fonction qui prend la nouvelle valeur

```javascript
      onTodoChange={handleTodoChange}
```
- Fonction complexe pour modifier une tâche

```javascript
      onAddTodo={handleAddTodo}
      onRemoveTodo={handleRemoveTodo}
```
- Fonctions pour gérer les tâches

```javascript
      onSave={handleSave}
      onBack={handleBack}
```
- Fonctions d'action principales

```javascript
    />
  );
}
```

## Flux complet

### Mode Création (URL: `/formulaire`)
1. Composant se monte sans `id`
2. États initialisés avec valeurs vides
3. Utilisateur remplit le formulaire
4. Clic sur sauvegarder → `api.addChecklist()`
5. Navigation vers `/dashboard`

### Mode Édition (URL: `/formulaire/5`)
1. Composant se monte avec `id = 5`
2. `useEffect` détecte `id` et appelle `loadChecklist()`
3. Formulaire se remplit avec données existantes
4. Utilisateur modifie les données
5. Clic sur sauvegarder → `api.updateChecklist(5, ...)`
6. Navigation vers `/dashboard`
