# Kevuno

**FR — Votre logement. Votre budget. Votre financement.**  
**NL — Jouw woning. Jouw budget. Jouw financiering.**  
**EN — Your home. Your budget. Your financing.**

Aide à la décision pour l'achat d'une maison existante en Belgique, en résidence propre ou en investissement locatif. Nouveau projet indépendant : aucun fichier, aucune donnée et aucun déploiement du site Analyse Immeuble ne sont modifiés.

## Utiliser le projet

Node.js 22 ou plus récent. Aucun paquet externe, aucune clé API ni installation de dépendances nécessaire.

```sh
npm test
npm run build
npm run dev
```

Ouvrir `http://localhost:4173/kevuno/`. Le serveur de développement sert uniquement `dist/`. Relancer la compilation après chaque modification. Pour une publication à la racine d'un domaine : `BASE_PATH=/ SITE_URL=https://votre-domaine.example npm run build`.

## Fonctionnement

- Parcours en cinq étapes : bien, travaux, moyens, banque, décision.
- Prix limite, coût complet, droits régionaux, apport minimal, réserve, mensualité et dette restante.
- Travaux sans forfait, au m² ou selon devis, avec imprévus. Repères légère / moyenne / lourde explicités, TVAC, jamais cumulés entre méthodes.
- Loyers, vacance, gestion, charges de propriétaire et trésorerie avant fiscalité personnelle.
- Crédit amortissable et bullet optionnel de dix ans, à taux distinct. Capital final affiché et ressource de remboursement requise. Provision mensuelle sans rendement supposé.
- FR / NL / EN, changement de langue sans envoyer ni perdre les données du formulaire.
- Export/import JSON, sauvegarde locale uniquement sur demande, effacement, comparaison d'une variante et impression / PDF.
- Préremplissage facultatif d'un prix et d'une surface depuis un texte collé. Aucune navigation vers l'annonce ; texte traité comme données, confirmation obligatoire.
- 19 pages statiques : accueil de langue, 3 simulateurs et 15 guides. Métadonnées traduites, liens hreflang, sitemap et robots.

Aucune recherche de biens, aucun catalogue d'annonces, aucun compte et aucun outil de suivi. L'emplacement publicitaire est réservé mais inactif.

## Confidentialité du code et des projets

**Dépôt public autorisé par le propriétaire le 29 octobre 2026.** Le code et le README sont donc consultables publiquement. Aucun fichier `.env`, secret ou projet utilisateur ne doit être commité.

Un dépôt privé protège l'historique, le README et les fichiers de développement. Le HTML, le CSS et le JavaScript servis à un navigateur public restent techniquement consultables et téléchargeables. Une application statique ne peut pas cacher ses calculs. Aucune source map n'est produite. La minification n'est pas une protection d'accès ; elle n'est pas présentée comme telle.

Les projets financiers restent en mémoire dans le navigateur. L'unique clé `localStorage`, `kevuno-project-v1`, n'est écrite que par le bouton de sauvegarde. Aucune lecture automatique à l'arrivée et aucune donnée financière dans l'URL. Les exports téléchargés restent sous le contrôle du visiteur. GitHub peut conserver ses journaux techniques d'accès, dont les IP. Aucune promesse d'absence totale de traitement par l'hébergeur.

Si la confidentialité du moteur de calcul lui-même devient impérative, il faudra un service de calcul côté serveur et une politique de confidentialité adaptée : GitHub Pages seul ne répond pas à cet objectif.

## Publication GitHub Pages

1. Créer `Gustomucho/kevuno` **public**, conformément au choix du propriétaire. Déposer les fichiers sur `main`.
2. GitHub Pages est disponible pour un dépôt public avec GitHub Free. Aucun abonnement payant n’est nécessaire pour cette configuration.
3. Dans Settings → Pages, choisir **GitHub Actions**. Le workflow `pages.yml` exécute les tests, construit le site et publie uniquement `dist/`.
4. Vérifier le succès de l'environnement `github-pages`. URL prévue, **non active tant que le déploiement n'est pas confirmé** : `https://gustomucho.github.io/kevuno/`.
5. Les pull requests exécutent les tests mais ne publient pas. Adapter ensemble `BASE_PATH` et `SITE_URL` si le nom du dépôt ou le domaine change.

Le dépôt public `Gustomucho/kevuno` a été créé par son propriétaire. La publication est assurée par le workflow `pages.yml` une fois la source GitHub Pages réglée sur GitHub Actions. Le succès de l’environnement `github-pages` fait foi pour la mise en ligne.

Avant d'activer une régie publicitaire, vérifier les conditions de GitHub Pages concernant l'exploitation commerciale et celles de la régie. Les scripts de publicité ne sont pas intégrés ; ils demanderaient une configuration, une politique dédiée et un traitement approprié du consentement. Aucune recette publicitaire n'est promise. Le référencement nécessite ensuite des contenus utiles, une indexation et du suivi ; aucune position n'est garantie.

## Références et maintenance

Données de départ vérifiées le **29 octobre 2026** :

- [BCE — crédits logement, Belgique](https://data.ecb.europa.eu/data/datasets/MIR/MIR.M.BE.B.A2C.P.R.A.2250.EUR.N) : 3,53 % en août 2026, série statistique AAR/NDER des nouveaux prêts à fixation initiale supérieure à 10 ans, pas un TAEG ni une offre nominale personnelle. Utilisée comme hypothèse nominale modifiable ; jamais comme taux bullet.
- [Avenir Rénovations](https://www.avenir-renovations.be/services/renovation/) : légère 400–700 €/m² ; complète, rapprochée du niveau moyen, 800–1 200 €/m² ; lourde 1 200–2 000 €/m², TVAC. Repères d'une entreprise et non moyennes nationales. Milieux de fourchette : 550 / 1 000 / 1 600 €/m².
- [Bruxelles Fiscalité](https://fiscalite.brussels/fr/abattement) : taux ordinaire 12,5 %, abattement de 200 000 € sous conditions et plafond de base taxable de 600 000 €.
- [Wallonie — FAQ officielle](https://logement.wallonie.be/storage/logement/documents/content/news/fiscalite-wallonne/pdf-reforme-droits-enregistrement-faq.pdf) : ordinaire 12,5 %, part éligible à 3 %.
- [Vlaanderen](https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht/tarieven-in-het-verkooprecht/verlaagd-tarief-in-het-verkooprecht-voor-de-aankoop-van-de-enige-eigen-woning) : ordinaire 12 %, part éligible à 2 % en 2026. Une annonce politique ne vaut pas loi appliquée.
- [Beobank — crédits habitation](https://www.beobank.be/fr/emprunter/prets-habitation/credit-hypothecaire.html) : principe du remboursement du capital d'un crédit bullet au terme.

`npm run update:reference` interroge la série BCE, valide les observations et prépare un rapport. Le workflow mensuel ouvre une PR ; **pas de publication automatique de nouvelles données non relues**. En janvier, avril, juillet et octobre, il vérifie aussi la disponibilité de la page rénovation et demande une relecture des fourchettes, exclusions et TVA. Il ne prétend pas actualiser les coûts si seule la page a été téléchargée. Les dates de vérification fiscales et travaux ne sont pas avancées par une mise à jour du taux. Autoriser la création de PR par Actions dans les paramètres GitHub si nécessaire. Une évolution des sites sources peut bloquer un contrôle : le job échoue ou le rapport le signale, les dernières valeurs restent conservées.

## Limites de cette version

Confirmation fiscale manuelle et contrôle final par le notaire ; pour les actes après 2026, les avantages non revérifiés sont écartés au profit du taux ordinaire. Frais d'achat hors droits à 6 500 € et frais de crédit à 5 000 € : hypothèses éditables, pas une tarification exacte. Pas de devis automatique, d'expertise de marché, de primes présumées ni d'accord bancaire automatique.

L'autocomplétion comporte un répertoire initial limité de codes postaux. Toute autre commune peut être saisie avec sélection manuelle de la région. Les taxes locatives personnelles, un calendrier fin des décaissements et les conditions particulières des banques ne sont pas calculés. Les limites bancaires et le prix plafond sont des hypothèses de scénario, pas une recommandation de payer ce prix ni une garantie de crédit.

## Organisation

`src/` : interface, traductions, moteur financier pur, styles et guides.  
`data/` : références datées et suggestions de communes.  
`scripts/` : compilation, serveur local, proposition d'actualisation.  
`tests/` : vérifications indépendantes des calculs et de la génération.  
`.github/workflows/` : contrôle, publication et revue mensuelle.

© 2026 Kevuno. Tous droits réservés. Aucune licence libre n'est accordée.
