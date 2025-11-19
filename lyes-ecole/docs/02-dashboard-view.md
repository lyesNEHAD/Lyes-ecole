# DashboardView - Explication ligne par ligne

**Fichier :** `src/components/views/DashboardView.jsx`

## Imports

```javascript
import React from 'react';
```
- Importe React (nécessaire pour JSX)

```javascript
import '../../assets/css/Dashboard.css';
```
- Importe le fichier CSS pour le style du dashboard

## Fonction principale

```javascript
export default function DashboardView({ 
  checklists, 
  onChecklistClick, 
  onEditClick, 
  onDeleteClick, 
  onNewClick 
}) {
```
- Composant fonctionnel qui reçoit des props via destructuration :
  - `checklists` : tableau des checklists à afficher
  - `onChecklistClick` : fonction appelée au clic sur une checklist
  - `onEditClick` : fonction appelée au clic sur éditer
  - `onDeleteClick` : fonction appelée au clic sur supprimer
  - `onNewClick` : fonction appelée au clic sur nouveau

## Fonction utilitaire

```javascript
  const getStatusText = (status) => {
```
- Fonction pour convertir le code statut en texte lisible

```javascript
    return status === 0 ? 'Vierge' : status === 1 ? 'En cours' : 'Terminée';
```
- Si status = 0 → "Vierge"
- Si status = 1 → "En cours"
- Sinon (status = 2) → "Terminée"
- Utilise l'opérateur ternaire pour la condition

## Rendu du composant

```javascript
  return (
    <div className="dashboard">
```
- Conteneur principal du dashboard avec classe CSS

### En-tête

```javascript
      <header>
        <h1>Dashboard</h1>
```
- Titre de la page

```javascript
        <button className="btn-new" onClick={onNewClick}>
          + New checklist
        </button>
```
- Bouton pour créer une nouvelle checklist
- Appelle `onNewClick` au clic (qui navigue vers `/formulaire`)

```javascript
      </header>
```

### Conteneur des checklists

```javascript
      <div className="checklist-container">
```
- Conteneur pour la liste des checklists

### Affichage conditionnel

```javascript
        {checklists.length === 0 ? (
```
- Condition : si le tableau est vide

```javascript
          <p>Aucune checklist pour le moment. Créez-en une nouvelle !</p>
```
- Affiche ce message si aucune checklist n'existe

```javascript
        ) : (
```
- Sinon (si des checklists existent)

### Grille de cartes

```javascript
          <div className="cards">
```
- Conteneur pour afficher les cartes de checklists

```javascript
            {checklists.map((checklist) => {
```
- Boucle sur chaque checklist du tableau
- `map` transforme chaque checklist en élément JSX

### Calcul de progression

```javascript
              const completedTasks = checklist.todo.filter(task => task.statut === 1).length;
```
- Filtre les tâches avec statut = 1 (terminées)
- `.length` compte le nombre de tâches terminées

```javascript
              const totalTasks = checklist.todo.length;
```
- Compte le nombre total de tâches

### Carte individuelle

```javascript
              return (
                <div key={checklist.id} className="card">
```
- Crée une carte pour chaque checklist
- `key={checklist.id}` : identifiant unique requis par React pour les listes

### Zone cliquable

```javascript
                  <div onClick={() => onChecklistClick(checklist.id)}>
```
- Div cliquable qui appelle `onChecklistClick` avec l'id
- Navigation vers la page de détail de la checklist

```javascript
                    <h3>{checklist.title}</h3>
```
- Affiche le titre de la checklist

```javascript
                    <p>{checklist.description}</p>
```
- Affiche la description

```javascript
                    <p>Statut: {getStatusText(checklist.status)}</p>
```
- Affiche le statut converti en texte
- Appelle `getStatusText()` pour transformer 0/1/2 en texte

```javascript
                    <p>Progression: {completedTasks}/{totalTasks}</p>
```
- Affiche "X/Y" où X = tâches terminées, Y = total tâches

```javascript
                  </div>
```

### Boutons d'action

```javascript
                  <div className="card-actions">
```
- Conteneur pour les boutons d'action

```javascript
                    <button onClick={(e) => { e.stopPropagation(); onEditClick(checklist.id); }}>
```
- Bouton éditer
- `e.stopPropagation()` : empêche le clic de se propager au div parent
  - Sans cela, cliquer sur éditer ouvrirait aussi la checklist
- Appelle `onEditClick` avec l'id de la checklist

```javascript
                      Éditer
                    </button>
```

```javascript
                    <button onClick={(e) => { e.stopPropagation(); onDeleteClick(checklist.id); }}>
```
- Bouton supprimer
- Même logique : empêche la propagation et appelle `onDeleteClick`

```javascript
                      Supprimer
                    </button>
                  </div>
                </div>
```
- Ferme les divs de la carte

```javascript
              );
            })}
```
- Fin du map

```javascript
          </div>
        )}
```
- Ferme la condition et le conteneur des cartes

```javascript
      </div>
    </div>
  );
}
```
- Ferme le composant

## Résumé

Ce composant est **purement présentationnel** :
- ❌ Pas d'état local
- ❌ Pas d'appels API
- ❌ Pas de logique métier
- ✅ Reçoit des données via props
- ✅ Appelle des fonctions via props
- ✅ Affiche uniquement l'interface utilisateur

**Avantage :** Facile à tester et à réutiliser
