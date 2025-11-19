# ChecklistView - Explication ligne par ligne

**Fichier :** `src/components/views/ChecklistView.jsx`

## Imports

```javascript
import React from 'react';
```
- Importe React

```javascript
import '../../assets/css/Checklist.css';
```
- Importe le CSS pour le style

## Fonction principale

```javascript
export default function ChecklistView({ 
  checklist, 
  onTaskToggle, 
  onBack 
}) {
```
- Composant fonctionnel qui reçoit :
  - `checklist` : les données de la checklist
  - `onTaskToggle` : fonction pour cocher/décocher une tâche
  - `onBack` : fonction pour revenir au dashboard

## Gestion de chargement

```javascript
  if (!checklist) {
```
- Si `checklist` est `null` ou `undefined`

```javascript
    return <div>Loading...</div>;
```
- Affiche un message de chargement
- Évite les erreurs quand les données ne sont pas encore arrivées

```javascript
  }
```

## Calculs pour l'affichage

```javascript
  const completedTasks = checklist.todo.filter(task => task.statut === 1).length;
```
- Compte combien de tâches sont terminées (statut = 1)

```javascript
  const totalTasks = checklist.todo.length;
```
- Compte le nombre total de tâches

```javascript
  const statusText = checklist.status === 0 ? 'Vierge' : checklist.status === 1 ? 'En cours' : 'Terminée';
```
- Convertit le code statut en texte lisible :
  - 0 → "Vierge"
  - 1 → "En cours"
  - 2 → "Terminée"

## Rendu du composant

```javascript
  return (
    <div className="checklist-page">
```
- Conteneur principal

### En-tête

```javascript
      <header>
        <button className="btn-back" onClick={onBack}>
```
- Bouton retour qui appelle `onBack()` au clic

```javascript
          Back
        </button>
        <h1>Checklist</h1>
      </header>
```

### Contenu

```javascript
      <div className="content">
```

#### Titre et description

```javascript
        <h2>{checklist.title}</h2>
```
- Affiche le titre de la checklist

```javascript
        <p>{checklist.description}</p>
```
- Affiche la description

#### Liste des tâches

```javascript
        <div className="tasks">
```
- Conteneur pour les tâches

```javascript
          {checklist.todo.map((task, index) => (
```
- Boucle sur chaque tâche
- `index` est utilisé pour identifier quelle tâche a été cliquée

```javascript
            <label key={index}>
```
- Label cliquable pour chaque tâche
- `key={index}` : identifiant unique pour React

```javascript
              <input 
                type="checkbox" 
```
- Checkbox pour marquer la tâche

```javascript
                checked={task.statut === 1}
```
- Cochée si statut = 1 (fait)
- Décochée si statut = 0 (non fait)

```javascript
                onChange={() => onTaskToggle(index)}
```
- Quand l'utilisateur coche/décoche :
  - Appelle `onTaskToggle` avec l'index de la tâche
  - Le container gère le reste (mise à jour état + API)

```javascript
              />
              {task.title}
```
- Affiche le titre de la tâche

```javascript
              {task.description && <span> - {task.description}</span>}
```
- Si la tâche a une description :
  - `task.description` est truthy → affiche le span
  - Sinon rien n'est affiché
- Syntaxe : `condition && <JSX>` = rendu conditionnel court

```javascript
            </label>
          ))}
```
- Fin de la boucle

```javascript
        </div>
```

#### Statut et progression

```javascript
        <div className="status">
          <p>Progression: {completedTasks}/{totalTasks}</p>
```
- Affiche "X/Y" tâches complétées

```javascript
          <p>Statut: {statusText}</p>
```
- Affiche le statut en texte

```javascript
        </div>
      </div>
    </div>
  );
}
```
- Ferme tous les conteneurs

## Résumé

Composant **purement présentationnel** :

### Ce qu'il fait :
- ✅ Affiche les données de la checklist
- ✅ Affiche les tâches avec des checkboxes
- ✅ Calcule et affiche la progression
- ✅ Gère l'état de chargement

### Ce qu'il NE fait PAS :
- ❌ Pas d'appels API
- ❌ Pas de logique métier complexe
- ❌ Pas de navigation directe
- ❌ Pas de modification d'état

**Tout est délégué au container via les props**
