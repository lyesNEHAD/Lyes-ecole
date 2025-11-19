# DashboardContainer - Explication ligne par ligne

**Fichier :** `src/components/containers/DashboardContainer.jsx`

## Imports

```javascript
import React, { useState, useEffect } from "react";
```

- Importe React et les hooks `useState` (pour gérer l'état) et `useEffect` (pour les effets de bord)

```javascript
import { useNavigate } from "react-router-dom";
```

- Importe le hook `useNavigate` de React Router pour la navigation entre les pages

```javascript
import DashboardView from "../views/DashboardView";
```

- Importe le composant de présentation qui affiche l'interface utilisateur

```javascript
import api from "../../Services/api";
```

- Importe le service API pour communiquer avec le backend

## Fonction principale

```javascript
export default function DashboardContainer() {
```

- Déclare et exporte le composant fonctionnel DashboardContainer

## État et hooks

```javascript
const [checklists, setChecklists] = useState([]);
```

- Crée une variable d'état `checklists` initialisée à un tableau vide
- `setChecklists` est la fonction pour modifier cet état
- Stocke toutes les checklists récupérées du serveur

```javascript
const navigate = useNavigate();
```

- Crée une fonction `navigate` pour naviguer vers d'autres pages
- Remplace l'ancien système avec `goTo`

## Effet de chargement initial

```javascript
useEffect(() => {
  loadChecklists();
}, []);
```

- Se déclenche une seule fois au montage du composant (tableau de dépendances vide `[]`)
- Appelle `loadChecklists()` pour charger les données au démarrage

## Fonction de chargement des checklists

```javascript
  const loadChecklists = async () => {
```

- Fonction asynchrone pour récupérer toutes les checklists depuis l'API

```javascript
    try {
```

- Début du bloc try-catch pour gérer les erreurs

```javascript
const data = await api.getAllChecklists();
```

- Attend la réponse de l'API (appel asynchrone)
- Stocke la réponse dans `data`

```javascript
setChecklists(data.response || []);
```

- Met à jour l'état avec les checklists reçues
- Si `data.response` est undefined/null, utilise un tableau vide `[]`

```javascript
    } catch (error) {
      console.error('Error loading checklists:', error);
    }
```

- Capture les erreurs et les affiche dans la console

## Gestionnaire de clic sur une checklist

```javascript
  const handleChecklistClick = (id) => {
```

- Fonction appelée quand l'utilisateur clique sur une checklist
- Reçoit l'`id` de la checklist cliquée

```javascript
navigate(`/checklist/${id}`);
```

- Navigue vers la page de détail de la checklist
- Exemple : si id=5, navigue vers `/checklist/5`

## Gestionnaire d'édition

```javascript
  const handleEditClick = (id) => {
```

- Fonction appelée quand l'utilisateur clique sur le bouton "Éditer"

```javascript
navigate(`/formulaire/${id}`);
```

- Navigue vers le formulaire d'édition avec l'id de la checklist
- Exemple : `/formulaire/5` pour éditer la checklist 5

## Gestionnaire de suppression

```javascript
  const handleDeleteClick = async (id) => {
```

- Fonction asynchrone pour supprimer une checklist
- Reçoit l'`id` de la checklist à supprimer

```javascript
    if (window.confirm('Voulez-vous vraiment supprimer cette checklist ?')) {
```

- Affiche une boîte de dialogue de confirmation
- Continue uniquement si l'utilisateur clique sur "OK"

```javascript
      try {
        await api.deleteChecklist(id);
```

- Appelle l'API pour supprimer la checklist avec l'id donné
- Attend la fin de l'opération

```javascript
loadChecklists();
```

- Recharge toutes les checklists pour mettre à jour l'affichage
- La checklist supprimée n'apparaîtra plus

```javascript
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    }
```

- Gère les erreurs et ferme le bloc if

## Gestionnaire de création

```javascript
  const handleNewClick = () => {
```

- Fonction appelée quand l'utilisateur clique sur le bouton "Nouveau"

```javascript
navigate("/formulaire");
```

- Navigue vers le formulaire vide pour créer une nouvelle checklist
- Pas d'id dans l'URL = mode création

## Rendu du composant

```javascript
  return (
    <DashboardView
```

- Retourne le composant de présentation DashboardView

```javascript
checklists = { checklists };
```

- Passe la liste des checklists comme prop

```javascript
onChecklistClick = { handleChecklistClick };
```

- Passe la fonction pour gérer le clic sur une checklist

```javascript
onEditClick = { handleEditClick };
```

- Passe la fonction pour gérer le clic sur éditer

```javascript
onDeleteClick = { handleDeleteClick };
```

- Passe la fonction pour gérer le clic sur supprimer

```javascript
onNewClick = { handleNewClick };
```

- Passe la fonction pour gérer le clic sur nouveau

```javascript
    />
  );
}
```

- Ferme le composant et la fonction

## Résumé du flux

1. Le composant se monte → `useEffect` s'exécute
2. `loadChecklists()` appelle l'API et récupère les checklists
3. L'état `checklists` est mis à jour
4. DashboardView reçoit les données et les affiche
5. L'utilisateur interagit (clic sur une checklist, éditer, supprimer, nouveau)
6. Les gestionnaires d'événements réagissent et naviguent ou modifient les données
