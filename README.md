# Projet de Substitution de Produits Alimentaires

Ce projet permet aux utilisateurs de rechercher des produits alimentaires  par catégorie, de trouver des alternatives plus saines.

## Prérequis

- Node.js et npm
- MongoDB

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/SaidBOHUI/openFood.git
    ```

2. Naviguez dans le répertoire du projet :
    ```bash
    cd openFood
    ```

3. Installez les dépendances pour le backend et le frontend :
    ```bash
    cd back
    npm install
    cd ../front
    npm install
    ```

4. Créez un fichier `.env` dans le répertoire `back` et ajoutez les variables d'environnement suivantes :
    ```env
        URI=mongodb+srv://admin123:admin123@cluster0.zlls55p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        PORT=8000
        ACCESS_TOKEN_SECRET=secret
        REFRESH_TOKEN_SECRET=refreshsecret
    ```

## Démarrage du Projet

1. Pour démarrer le serveur backend :
    ```bash
    npm run back
    ```

2. Pour démarrer l'application frontend :
    ```bash
    npm run front
    ```

Le serveur backend fonctionnera sur `http://localhost:8000` et l'application frontend sur `http://localhost:3000`.

## Fonctionnalités

### Utilisateurs

- **Inscription** : Les utilisateurs peuvent s'inscrire avec un prénom, un nom, un email et un mot de passe.
- **Connexion** : Les utilisateurs peuvent se connecter avec leur email et mot de passe.
- **Déconnexion** : Les utilisateurs peuvent se déconnecter.
- **Rafraîchir le Token** : Les utilisateurs peuvent rafraîchir leur token d'accès.

### Produits

- **Recherche par Catégorie** : Recherchez des produits en entrant une catégorie.
- **Alternatives** : Obtenez des alternatives plus saines pour un produit donné.

## Endpoints

### Authentification

- `POST /user/register` : Inscription d'un utilisateur.
- `POST /user/login` : Connexion d'un utilisateur.
- `GET /user/logout` : Déconnexion d'un utilisateur.
- `GET /user/refresh_token` : Rafraîchir le token d'accès.
- `GET /user/infos` : Récupérer les informations de l'utilisateur connecté.

### Produits

- `GET /product/category/:category` : Recherche de produits par catégorie.
- `GET /product/alternatives/:barcode` : Obtenir des alternatives pour un produit donné.
- `POST /user/saveSubstitutes` : Sauvegarder des substituts.
- `GET /user/substitutedProducts` : Obtenir les substituts sauvegardés par l'utilisateur.