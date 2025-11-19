# ChecklistContainer - Explication ligne par ligne

**Fichier :** `src/components/containers/ChecklistContainer.jsx`

## Imports

```javascript
import React, { useState, useEffect } from 'react';
```
- Importe React et les hooks pour gérer l'état et les effets

```javascript
import { useNavigate, useParams } from 'react-router-dom';
```
- `useNavigate` : pour naviguer vers d'autres pages
- `useParams` : pour récupérer les paramètres de l'URL (comme l'id)

```javascript
import ChecklistView from '../views/ChecklistView';
```
- Importe le composant de présentation

```javascript
import api from '../../Services/api';
```
- Importe le service API

## Fonction principale

```javascript
export default function ChecklistContainer() {
```
- Déclare le composant container

## État et hooks

```javascript
  const [checklist, setChecklist] = useState(null);
```
- État pour stocker les données d'une checklist
- Initialisé à `null` car on n'a pas encore chargé les données

```javascript
  const navigate = useNavigate();
```
- Fonction pour naviguer entre les pages

```javascript
  const { id } = useParams();
```
- Récupère l'`id` depuis l'URL
- Exemple : si URL = `/checklist/5`, alors `id` = "5"

## Effet de chargement

```javascript
  useEffect(() => {
```
- S'exécute quand le composant se monte ou quand `id` change

```javascript
    if (id) {
```
- Vérifie que l'id existe

```javascript
      loadChecklist();
```
- Charge les données de la checklist

```javascript
    }
  }, [id]);
```
- Le tableau de dépendances `[id]` signifie :
  - Réexécute cet effet si `id` change
  - Permet de charger une nouvelle checklist si on change d'URL

## Fonction de chargement

```javascript
  const loadChecklist = async () => {
```
- Fonction asynchrone pour charger une checklist

```javascript
    try {
      const data = await api.getChecklist(id);
```
- Appelle l'API avec l'id pour récupérer la checklist
- Attend la réponse

```javascript
      setChecklist(data);
```
- Stocke les données dans l'état

```javascript
    } catch (error) {
      console.error('Error loading checklist:', error);
    }
  };
```
- Gère les erreurs

## Fonction de basculement de tâche

```javascript
  const handleTaskToggle = async (taskIndex) => {
```
- Appelée quand l'utilisateur coche/décoche une tâche
- Reçoit l'index de la tâche dans le tableau

### Mise à jour locale des tâches

```javascript
    const updatedTodos = checklist.todo.map((task, index) => {
```
- Parcourt toutes les tâches
- Crée un nouveau tableau (immutabilité)

```javascript
      if (index === taskIndex) {
```
- Si c'est la tâche qui a été cliquée

```javascript
        return { ...task, statut: task.statut === 1 ? 0 : 1 };
```
- Crée une copie de la tâche avec le statut inversé
- Si statut = 1 (fait) → devient 0 (non fait)
- Si statut = 0 (non fait) → devient 1 (fait)
- `...task` copie toutes les propriétés de la tâche originale

```javascript
      }
      return task;
```
- Si ce n'est pas la tâche cliquée, on la retourne telle quelle

```javascript
    });
```

### Calcul du nouveau statut de la checklist

```javascript
    const allCompleted = updatedTodos.every(task => task.statut === 1);
```
- Vérifie si TOUTES les tâches sont terminées
- `every()` retourne `true` si toutes les tâches ont statut = 1

```javascript
    const newStatus = allCompleted ? 2 : updatedTodos.some(task => task.statut === 1) ? 1 : 0;
```
- Logique conditionnelle complexe :
  - Si `allCompleted` = true → statut = 2 (terminée)
  - Sinon, si au moins une tâche est terminée → statut = 1 (en cours)
  - Sinon → statut = 0 (vierge)

### Mise à jour de l'état local

```javascript
    setChecklist({ ...checklist, todo: updatedTodos, status: newStatus });
```
- Met à jour l'état immédiatement pour l'UI réactive
- Copie la checklist avec les nouvelles tâches et le nouveau statut
- `...checklist` conserve toutes les autres propriétés (titre, description, etc.)

### Synchronisation avec le serveur

```javascript
    try {
      await api.updateChecklist(
        checklist.id,
        checklist.title,
        checklist.description,
        updatedTodos
      );
```
- Envoie les modifications au serveur
- Attend la fin de l'opération

```javascript
      if (allCompleted) {
        await api.updateChecklistStatus(checklist.id, 2);
      }
```
- Si toutes les tâches sont terminées, met à jour le statut sur le serveur
- Appel API séparé pour le statut

```javascript
    } catch (error) {
      console.error('Error updating checklist:', error);
    }
  };
```
- Gère les erreurs

## Gestionnaire de retour

```javascript
  const handleBack = () => {
```
- Fonction appelée au clic sur le bouton "Back"

```javascript
    navigate('/dashboard');
```
- Navigue vers le dashboard

```javascript
  };
```

## Rendu

```javascript
  return (
    <ChecklistView 
```
- Retourne le composant de présentation

```javascript
      checklist={checklist}
```
- Passe les données de la checklist (peut être `null` au début)

```javascript
      onTaskToggle={handleTaskToggle}
```
- Passe la fonction pour basculer une tâche

```javascript
      onBack={handleBack}
```
- Passe la fonction de retour

```javascript
    />
  );
}
```

## Flux complet

1. Le composant se monte avec l'URL `/checklist/5`
2. `useParams()` extrait `id = 5`
3. `useEffect` détecte `id` et appelle `loadChecklist()`
4. `loadChecklist()` fait un appel API avec `id = 5`
5. Les données arrivent et sont stockées dans l'état
6. `ChecklistView` reçoit les données et affiche la checklist
7. L'utilisateur coche une tâche
8. `handleTaskToggle(index)` est appelé
9. L'état local est mis à jour → UI se rafraîchit instantanément
10. L'API est appelée pour sauvegarder sur le serveur
