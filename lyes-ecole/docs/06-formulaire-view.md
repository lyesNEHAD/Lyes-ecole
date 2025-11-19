# FormulaireView - Explication ligne par ligne

**Fichier :** `src/components/views/FormulaireView.jsx`

## Imports

```javascript
import React from 'react';
```
- Importe React

```javascript
import '../../assets/css/Formulaire.css';
```
- Importe le CSS

## Fonction principale

```javascript
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
```
- Composant qui reçoit beaucoup de props :
  - **Données** : `title`, `description`, `todos`
  - **Callbacks simples** : `onTitleChange`, `onDescriptionChange`, `onBack`, `onSave`
  - **Callbacks complexes** : `onTodoChange` (index, field, value), `onAddTodo`, `onRemoveTodo`

## Rendu

```javascript
  return (
    <div className="formulaire">
```
- Conteneur principal

### En-tête

```javascript
      <header>
        <button className="btn-back" onClick={onBack}>
          Back
        </button>
        <h1>Formulaire</h1>
      </header>
```
- Bouton retour et titre

### Contenu du formulaire

```javascript
      <div className="form-content">
```

#### Champ Titre

```javascript
        <div className="form-group">
          <label>Titre</label>
```
- Label pour le champ titre

```javascript
          <input 
            type="text" 
```
- Champ de texte

```javascript
            value={title} 
```
- Valeur contrôlée par React
- Affiche toujours la valeur de l'état `title`

```javascript
            onChange={(e) => onTitleChange(e.target.value)}
```
- Quand l'utilisateur tape :
  - `e` = événement du navigateur
  - `e.target` = l'élément input
  - `e.target.value` = le texte tapé
  - Appelle `onTitleChange` avec la nouvelle valeur
  - Dans le container, cela appelle `setTitle(nouvelleValeur)`

```javascript
            placeholder="Titre de la checklist"
```
- Texte affiché quand le champ est vide

```javascript
          />
        </div>
```

#### Champ Description

```javascript
        <div className="form-group">
          <label>Description</label>
          <textarea 
```
- Zone de texte multiligne

```javascript
            value={description} 
            onChange={(e) => onDescriptionChange(e.target.value)}
```
- Même principe que pour le titre
- Valeur contrôlée

```javascript
            placeholder="Description de la checklist"
          />
        </div>
```

#### Section des tâches

```javascript
        <div className="tasks-section">
          <h3>Tâches</h3>
```

##### Boucle sur les tâches

```javascript
          {todos.map((todo, index) => (
```
- Boucle sur chaque tâche
- `index` est crucial pour identifier quelle tâche modifier

```javascript
            <div key={index} className="task-item">
```
- Conteneur pour une tâche
- `key={index}` pour React

##### Champ titre de la tâche

```javascript
              <input 
                type="text" 
                value={todo.title}
```
- Affiche le titre de la tâche actuelle

```javascript
                onChange={(e) => onTodoChange(index, 'title', e.target.value)}
```
- Quand l'utilisateur tape :
  - Appelle `onTodoChange` avec 3 paramètres :
    1. `index` : quelle tâche modifier
    2. `'title'` : quel champ modifier
    3. `e.target.value` : nouvelle valeur
  - Dans le container : `updatedTodos[index]['title'] = value`

```javascript
                placeholder="Titre de la tâche"
              />
```

##### Champ description de la tâche

```javascript
              <input 
                type="text" 
                value={todo.description || ''}
```
- Affiche la description de la tâche
- `|| ''` : si `todo.description` est undefined/null, affiche chaîne vide

```javascript
                onChange={(e) => onTodoChange(index, 'description', e.target.value)}
```
- Même logique mais pour le champ 'description'

```javascript
                placeholder="Description (optionnelle)"
              />
```

##### Bouton supprimer la tâche

```javascript
              <button onClick={() => onRemoveTodo(index)}>Supprimer</button>
```
- Appelle `onRemoveTodo` avec l'index de la tâche
- Dans le container : filtre le tableau pour enlever cette tâche

```javascript
            </div>
          ))}
```
- Fin de la boucle

##### Bouton ajouter une tâche

```javascript
          <button className="btn-add-task" onClick={onAddTodo}>+ Ajouter une tâche</button>
```
- Appelle `onAddTodo` qui ajoute une tâche vide au tableau

```javascript
        </div>
```

#### Bouton sauvegarder

```javascript
        <button className="btn-submit" onClick={onSave}>
          Sauvegarder
        </button>
```
- Appelle `onSave` qui :
  - Valide le formulaire
  - Appelle l'API (create ou update)
  - Navigue vers le dashboard

```javascript
      </div>
    </div>
  );
}
```
- Ferme le composant

## Champs contrôlés (Controlled Components)

Tous les inputs sont **contrôlés** :

```javascript
<input value={title} onChange={(e) => onTitleChange(e.target.value)} />
```

### Flux d'un champ contrôlé :
1. État initial : `title = "Ma checklist"`
2. Input affiche : "Ma checklist"
3. Utilisateur tape "s" à la fin
4. `onChange` se déclenche avec `e.target.value = "Ma checklists"`
5. `onTitleChange("Ma checklists")` est appelé
6. Container fait `setTitle("Ma checklists")`
7. React re-rend le composant
8. Input affiche maintenant : "Ma checklists"

### Avantages :
- ✅ React est la source de vérité unique
- ✅ Facile de valider ou transformer les valeurs
- ✅ Facile de réinitialiser le formulaire
- ✅ État prévisible

## Résumé

Composant **purement présentationnel** :

### Ce qu'il fait :
- ✅ Affiche les champs du formulaire
- ✅ Gère les événements de saisie
- ✅ Affiche dynamiquement les tâches

### Ce qu'il NE fait PAS :
- ❌ Pas de validation métier
- ❌ Pas d'appels API
- ❌ Pas de gestion d'état
- ❌ Pas de navigation

**Tout est délégué au container**
