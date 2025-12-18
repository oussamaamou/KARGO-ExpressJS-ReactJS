# 🚚 Kargo - Fleet Management System

Kargo permet de gérer une flotte de camions et remorques sans passer par Excel. Planification des missions, suivi kilométrique, maintenance prédictive et rapports PDF automatiques.

---

## 🎯 Pourquoi ce projet ?

Gérer une flotte de transport c'est jongler avec des fichiers Excel, des conflits de planning et des camions qui tombent en panne par surprise. Kargo centralise tout ça dans une interface simple avec des alertes automatiques de maintenance.

---

## 🛠️ Tech Stack

**Backend**  
- Node.js + Express  
- MongoDB (Mongoose)  
- JWT Authentication  

**Frontend**  
- React (Vite)  
- Tailwind CSS  
- Recharts (Graphiques)  
- jsPDF (Génération PDF)  

**DevOps**  
- Docker + Docker Compose  

---

## ⚡ Installation Rapide

Lancez tout le projet en une seule commande :

```bash
docker-compose up --build
```

**Accès :**
- Frontend : http://localhost:5300
- Backend API : http://localhost:3000
- MongoDB : localhost:27017

---

## 🎭 Fonctionnalités par Rôle

### 👨‍💼 Admin

- ✅ Créer/Modifier/Supprimer camions et remorques
- ✅ Planifier des missions (algorithme de disponibilité intégré)
- ✅ Consulter les statistiques (KPIs + graphiques)
- ✅ Gérer les règles de maintenance
- ✅ Voir les alertes de vidange automatiques
- ✅ Liste de tous les chauffeurs

### 🚗 Chauffeur

- ✅ Vue mobile-first des missions assignées
- ✅ Démarrer/Terminer une mission en temps réel
- ✅ Saisir le kilométrage et carburant de fin de mission
- ✅ Télécharger l'ordre de mission en PDF
- ✅ Historique des trajets réalisés

---

## 📡 API Endpoints (Principaux)

| Méthode | Endpoint | Description | Accès |
|---------|----------|-------------|-------|
| `POST` | `/auth/register` | Inscription utilisateur | Public |
| `POST` | `/auth/login` | Connexion (retourne JWT) | Public |
| `GET` | `/chauffeurs` | Liste des chauffeurs | Admin |
| `GET` | `/camion` | Liste des camions | Authentifié |
| `POST` | `/camion` | Créer un camion | Admin |
| `PUT` | `/camion/:id` | Modifier un camion | Admin |
| `DELETE` | `/camion/:id` | Supprimer un camion | Admin |
| `GET` | `/remorque` | Liste des remorques | Authentifié |
| `POST` | `/remorque` | Créer une remorque | Admin |
| `GET` | `/trajets` | Tous les trajets | Admin |
| `POST` | `/trajets` | Créer un trajet | Admin |
| `GET` | `/mes-trajets` | Mes trajets (chauffeur) | Chauffeur |
| `PATCH` | `/trajets/:id/status` | Démarrer/Terminer trajet | Chauffeur |
| `GET` | `/dashboard/stats` | Statistiques dashboard | Admin |
| `GET` | `/maintenance/camion/:id` | Historique maintenance | Authentifié |
| `POST` | `/maintenance/rules` | Créer règle maintenance | Admin |

**Note :** Tous les endpoints (sauf `/auth/*`) nécessitent un token JWT dans le header :  
`Authorization: Bearer <token>`

---

## 📂 Architecture du Projet

```
KARGO/
├── backend/              # API REST (Node.js + Express)
│   ├── src/
│   │   ├── controllers/  # Logique métier
│   │   ├── services/     # Couche service (logique complexe)
│   │   ├── models/       # Modèles MongoDB (Mongoose)
│   │   ├── routes/       # Routes API
│   │   ├── middlewares/  # Auth, Error Handler
│   │   └── config/       # Configuration DB
│   ├── tests/            # Tests Jest (coverage inclus)
│   └── Dockerfile        # Image backend
│
├── frontend/             # Interface React (Vite)
│   ├── src/
│   │   ├── pages/        # Pages (Admin/Chauffeur)
│   │   ├── components/   # Composants réutilisables
│   │   ├── services/     # Appels API (Axios)
│   │   ├── context/      # AuthContext (gestion JWT)
│   │   ├── routes/       # Routing (ProtectedRoutes)
│   │   └── utils/        # Générateur PDF
│   └── Dockerfile        # Image frontend
│
└── docker-compose.yml    # Orchestration (Mongo + Backend + Frontend)
```

---

## 🚀 Fonctionnalités Techniques Avancées

### 🔒 Authentification & Autorisation
- JWT avec middleware de vérification de rôle
- Routes protégées (Admin/Chauffeur)
- Context API pour persister l'auth côté frontend

### 🧠 Algorithme de Disponibilité
Lors de la création d'un trajet, le système vérifie automatiquement :
- Le chauffeur n'est pas déjà en mission sur la même période
- Le camion est disponible (pas déjà assigné)

### ⚙️ Maintenance Prédictive
- Règles de maintenance paramétrables (ex: vidange tous les 10 000 km)
- Alertes automatiques si le kilométrage dépasse le seuil
- Historique des maintenances par véhicule

### 📊 Dashboard Statistiques
- KPIs : Nombre de camions actifs, trajets en cours, maintenances à venir
- Graphiques : Évolution des trajets, consommation carburant

### 📄 Génération PDF
- Ordre de mission téléchargeable avec :
  - Détails du trajet (date, départ, arrivée)
  - Informations chauffeur et camion

---

## 🧪 Tests

Le backend inclut des tests Jest avec couverture de code :

```bash
cd backend
npm test
```

Les tests couvrent :
- Services (authService, camionService, trajetService, etc.)
- Endpoints API (via Supertest)

Rapport de couverture disponible dans `backend/coverage/lcov-report/index.html`

---

## 🔧 Variables d'Environnement

Le projet utilise Docker Compose, les variables sont définies dans `docker-compose.yml` :

**Backend :**
- `MONGO_URI` : Connexion MongoDB
- `JWT_SECRET` : Clé secrète JWT
- `PORT` : Port du serveur (3000)

**Frontend :**
- `VITE_API_URL` : URL de l'API backend

---

## 📝 Utilisation

### 1️⃣ Première connexion
Créez un compte admin via `/auth/register` avec :
```json
{
  "nom": "Admin",
  "email": "admin@kargo.com",
  "password": "password123",
  "role": "admin"
}
```

### 2️⃣ Ajouter des véhicules
Dans l'interface Admin, créez des camions et remorques.

### 3️⃣ Créer une mission
Planifiez un trajet en assignant un chauffeur et un camion disponible.

### 4️⃣ Suivi chauffeur
Le chauffeur se connecte, voit sa mission et peut la démarrer/terminer depuis son espace.

---

## 🐛 Dépannage

**Problème :** Le frontend ne se connecte pas au backend  
**Solution :** Vérifiez que `VITE_API_URL` dans `docker-compose.yml` pointe vers `http://localhost:3000`

**Problème :** MongoDB ne démarre pas  
**Solution :** Assurez-vous que le port 27017 n'est pas déjà utilisé :
```bash
docker ps
```

**Problème :** Erreur JWT "Token invalide"  
**Solution :** Reconnectez-vous pour obtenir un nouveau token.

---

## 👥 Contribution

Projet réalisé dans le cadre d'un brief croisé.  
Stack technique moderne et bonnes pratiques (Tests, Docker, Architecture MVC).

---

## 📄 Licence

Projet éducatif - Libre d'utilisation.

---

**Made with ☕ and React**