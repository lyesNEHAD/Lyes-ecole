# Documentation de l'Application Checklist

## Vue d'ensemble

Application web de gestion de checklists construite avec React et React Router. L'application suit le pattern Container/Presentational pour séparer la logique métier de l'interface utilisateur.

## Structure du projet

```
src/
├── components/
│   ├── containers/       # Composants de logique (API, gestion d'état)
│   ├── views/           # Composants de présentation (UI uniquement)
│   ├── Dashboard.jsx    # Point d'entrée Dashboard
│   ├── Checklist.jsx    # Point d'entrée Checklist
│   └── Formulaire.jsx   # Point d'entrée Formulaire
├── Services/
│   └── api.js           # Service API pour communiquer avec le backend
├── assets/
│   └── css/            # Fichiers de style
├── App.jsx             # Application principale avec routage
└── main.jsx            # Point d'entrée de l'application

docs/
├── README.md                    # Ce fichier
├── 01-app-et-routage.md        # Explication de App.jsx et du routage
├── 02-service-api.md           # Explication du service API
├── 03-dashboard.md             # Explication des composants Dashboard
├── 04-checklist.md             # Explication des composants Checklist
├── 05-formulaire.md            # Explication des composants Formulaire
└── 06-pattern-architecture.md  # Explication du pattern Container/View
```

## Concepts clés

### Pattern Container/Presentational
- **Composants Container** : Gèrent la logique, l'état, les appels API et les effets de bord
- **Composants View** : Reçoivent uniquement des props et affichent l'UI, sans logique métier

### Routage
Utilise React Router v6 avec paramètres d'URL :
- `/dashboard` - Liste de toutes les checklists
- `/checklist/:id` - Voir et interagir avec une checklist spécifique
- `/formulaire` - Créer une nouvelle checklist
- `/formulaire/:id` - Éditer une checklist existante

## Fichiers de documentation

1. **App et Routage** - Structure de l'application et fonctionnement du routage
2. **Service API** - Communication avec le backend
3. **Dashboard** - Lister et gérer toutes les checklists
4. **Checklist** - Voir et interagir avec une checklist
5. **Formulaire** - Créer et éditer des checklists
6. **Pattern Architecture** - Pourquoi séparer containers et views

## Démarrage rapide

```bash
npm install
npm run dev
```

## Configuration API

L'application utilise un token stocké dans `src/Services/api.js` pour s'authentifier avec l'API backend : `https://greenvelvet.alwaysdata.net/pfc/`
