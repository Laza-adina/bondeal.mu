# BonDeal — prototype Next.js

## Lancement
`npm install` puis `npm run dev`, ouvrir http://127.0.0.1:3000.
Pour la version compilée : `npm run build` puis `npm start`.

## Pages
- `/` : présentation de la plateforme, sliders Best sellers et Promotions, bouton shopping.
- `/boutique` : catalogue, recherche, prix, filtre de stock et tri.
- `/categories/[slug]` : catégories accessibles depuis le sous-menu de la boutique.
- `/produits/[id]` : image, description, référence, prix, stock, quantité et produits liés.
- `/suivi-commandes` : recherche par référence et e-mail, étapes et historique.
- `/admin` : aperçu calculé sur les commandes fictives.
- `/admin/produits` : ajout et modification, référence, catégorie, prix, stock, URL d’image, description et mises en avant.
- `/admin/commandes` : recherche, filtre, détail et modification du statut et du numéro de suivi.
- `/admin/promotions` : produits sélectionnés en promotion.

## Mises en avant
Les cases Best seller et Promotion alimentent les sliders de l’accueil et leurs sélections dédiées. La case N°1 de catégorie désigne un seul produit par catégorie et remplace la précédente sélection. Il s’agit d’un choix éditorial dans ce prototype, pas d’un classement calculé sur des ventes réelles. Les promotions nécessitent un prix de référence supérieur au prix de vente.

## Stockage du prototype
Produits, commandes, panier et favoris sont sauvegardés dans le stockage local du navigateur. Les modifications sont visibles sur les pages publiques du même navigateur après navigation/recherche. Les données ne sont pas partagées entre appareils. Le back-office ne possède pas d’authentification et contient uniquement des données de démonstration.

Exemple de suivi : `BD-1047` et `client1047@example.test`.
Aucune commande réelle, aucun paiement, aucun transporteur connecté. Les stocks sont fictifs. Le copilote public et le copilote équipe fonctionnent avec des réponses prédéfinies.

## Supabase
Le prototype démarre sans identifiants avec `lib/products.json`, un instantané public de 24 produits BonDeal. Pour préparer une connexion, exécuter `supabase/schema.sql` et `supabase/seed.sql`, copier `.env.example` vers `.env.local`, puis renseigner l’URL Supabase et la clé publique anon. Redémarrer Next.js.
Si des produits Supabase sont disponibles et qu’aucun catalogue personnalisé n’existe localement, ils sont chargés au premier accès. Les modifications de gestion restent locales : les écritures Supabase, l’authentification et les commandes distantes constituent une intégration ultérieure. RLS interdit les écritures publiques. Ne jamais exposer de clé service_role.

## Visuels
Photos produits et prix : catalogue public BonDeal. Catégories initiales déduites des noms. Images d’ambiance : Unsplash. Logo typographique provisoire et couleurs à valider avec le logo original. Titres sans italique et icône SVG du copilote sans étoiles.

## Vérifications
Compilation Next.js et TypeScript réussie. Contrôle navigateur : sous-menu, ajout d’un produit, modification du stock et des mises en avant, fiche publique du produit ajouté après rechargement, modification d’une commande et recherche du suivi public correspondant.

## Conseiller shopping
Le copilote public utilise désormais un moteur de recommandations calculé sur le catalogue : budget, catégorie, types de produit en français, remises actives, alternatives et exclusion des articles déjà au panier lorsqu’on demande de le compléter. Les suggestions possèdent des liens vers les fiches et un ajout direct au panier. Les conversations et critères sont conservés dans sessionStorage pendant l’onglet, séparément pour le public et la gestion. Ce moteur ne fait pas appel à un modèle IA ni à des prix externes ; « meilleur deal » désigne le classement parmi les produits correspondants du catalogue du prototype.
Tests de recommandations : `node --test tests/deals.test.mjs` (Node 22.14+).
