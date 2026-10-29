# Kenuvo

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

Ouvrir `http://localhost:4173/kenuvo/`. Le serveur de développement sert uniquement `dist/`. Relancer la compilation après chaque modification. Pour une publication à la racine d'un domaine : `BASE_PATH=/ SITE_URL=https://votre-domaine.example npm run build`.

## Utilisation pour débutants

Les champs sont formulés comme des questions, avec une aide sous les montants importants. Les réglages fiscaux détaillés, frais, limites bancaires et bullet restent accessibles dans des options facultatives.

Le panneau de résultat traite d’abord le logement **au prix demandé** : coût total, argent personnel nécessaire et paiement mensuel. Il compare ce résultat à l’épargne et à la limite mensuelle de l’utilisateur, explique les écarts, puis présente séparément un éventuel **prix à négocier**. Ce dernier n’est pas une expertise de marché. La mensualité affichée correspond à l’épargne actuelle, pas à un apport supplémentaire hypothétique.

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

1. Créer `Gustomucho/kenuvo` **public**, conformément au choix du propriétaire. Déposer les fichiers sur `main`.
2. GitHub Pages est disponible pour un dépôt public avec GitHub Free. Aucun abonnement payant n’est nécessaire pour cette configuration.
3. Dans Settings → Pages, choisir **GitHub Actions**. Le workflow `pages.yml` exécute les tests, construit le site et publie uniquement `dist/`.
4. Vérifier le succès de l'environnement `github-pages`. URL prévue, **non active tant que le déploiement n'est pas confirmé** : `https://gustomucho.github.io/kenuvo/`.
5. Les pull requests exécutent les tests mais ne publient pas. Adapter ensemble `BASE_PATH` et `SITE_URL` si le nom du dépôt ou le domaine change.

Le dépôt public `Gustomucho/kenuvo` a été créé par son propriétaire. La publication est assurée par le workflow `pages.yml` une fois la source GitHub Pages réglée sur GitHub Actions. Le succès de l’environnement `github-pages` fait foi pour la mise en ligne.

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

© 2026 Kenuvo. Tous droits réservés. Aucune licence libre n'est accordée.

## Référencement, IA et publicité future

Textes commerciaux et FAQ en FR/NL/EN, identité JSON-LD, titres et descriptions, canonical/hreflang, sitemap et actifs versionnés. WebMCP expose six outils réels sur les pages du simulateur, dont estimation des travaux, simulation et préremplissage ; les pages éditoriales exposent les outils publics. Voir le [guide SEO, agents et AdSense](docs/SEO_AGENTS_ADSENSE.md) pour les schémas, tests et limites.

AdSense est **désactivé**. Le chargeur et les emplacements sont préparés, sans identifiant inventé, sans CMP prétendue certifiée, et sans script publicitaire chargé. L'inscription, la validation Google, la CMP, la CSP, les mentions et le véritable ads.txt racine restent à finaliser avant toute activation. Un domaine propre est à prévoir pour éviter les limites du chemin `/kenuvo/` et renforcer la marque.

Le fichier `/kenuvo/robots.txt` ne gouverne pas les robots du domaine : ils consultent `/robots.txt` à la racine. Les fichiers destinés au véritable hébergement racine sont préparés dans `deployment/host-root/`. Aucune position dans Google ni compatibilité native avec tous les agents n'est garantie.

## Domaine et acquisition de visiteurs

Domaine acheté communiqué par le propriétaire : **kenuvo.be** (marque **Kenuvo**). Le [guide Name.com, GitHub Pages et Search Console](docs/DOMAINE_SEARCH_CONSOLE.md) donne les enregistrements DNS exacts et les étapes de validation. Le workflow détecte maintenant l'adresse configurée dans GitHub Pages et adapte automatiquement les chemins, canonical, hreflang, sitemap et robots lors d'une nouvelle publication.

Le site propose six parcours de questions, huit guides pratiques de préparation à l'achat en trois langues (dont trois guides de frais régionaux), des exemples chiffrés produits par les fonctions financières du simulateur et des liens vers les étapes appropriées. Les articles existants restent accessibles. Les pages sont statiques, indexables et reliées entre elles. Aucun volume de recherche, gain de trafic ou position Google n'est promis. Les exemples de financement ne constituent ni une offre ni une évaluation immobilière.


### Nom de marque et dépôt

Le service et le dépôt se nomment **Kenuvo** : `Gustomucho/kenuvo`, domaine `kenuvo.be`. La clé de sauvegarde historique `kevuno-project-v1` reste compatible avec les projets déjà enregistrés.

### Gratuité, confidentialité et photographies

Les engagements « Gratuit · Confidentiel · Sans compte » sont affichés dans les trois langues à l’accueil, près du simulateur et dans les guides. La FAQ explique la sauvegarde locale facultative, les journaux techniques de l’hébergeur et le cas d’un assistant IA externe. Aucun envoi de projet ou ajout de traceur. Les trois photos Unsplash sont auto-hébergées, optimisées en WebP, avec deux largeurs, dimensions explicites et textes alternatifs traduits. Les images sous la ligne de flottaison se chargent à la demande. Sources et licence : [crédits photo](assets/photos/CREDITS.md). Mise en page éditoriale asymétrique, mobile sur une colonne, sans carrousel.

### Navigation, négociation et page légale

Le menu d’ancres donne accès au simulateur, aux avantages, questions, guides et références. Les informations légales, la confidentialité, l’absence de démarche commerciale et les outils IA sont réunis sur `/fr/mentions-legales/`, `/nl/juridisch/` et `/en/legal/`. L’éditeur est Augustin Jacobs. Son nom est dans `data/publisher.json` ; le contact passe par le formulaire Jotform et l’adresse postale reste à préciser.

La jauge et le champ de prix exact actualisent le scénario affiché et les résultats. Le bouton de retour restaure le prix de départ ; aucun prix ni revenu ne passe dans une URL. Les crédits existants sont indiqués hors loyer.

La balise de validation Google attend le véritable jeton Search Console dans `data/seo.json` ou la variable Actions `GOOGLE_SITE_VERIFICATION`. La vérification DNS d’une propriété Domaine reste possible sans balise. Voir [la revue SEO](docs/AUDIT_SEO.md) pour les vérifications et limites réelles.

### Contact de l’éditeur

Le formulaire Jotform est intégré dans les pages légales. Seuls le nom Augustin Jacobs et un lien vers le formulaire sont publics. Aucun e-mail du destinataire n’est publié dans les fichiers du site ou dans le dépôt ; la destination des notifications se règle uniquement dans Jotform. L’iframe se charge au clic, sans envoyer les données de simulation. Aucun envoi par la messagerie locale. Le prestataire stocke les messages selon ses propres conditions ; l’information de confidentialité du contact le précise. Le nom et le lien de formulaire restent disponibles sans JavaScript. L’adresse postale reste à renseigner si applicable.

### Questionnaire guidé

Le simulateur vit désormais sur `/fr/simulateur/`, `/nl/simulator/` et `/en/calculator/`. L’accueil et les guides restent publics et leurs liens mènent au parcours dédié. Une question à la fois, choix en cartes, progression en quatre groupes, retour et modification des réponses, sans passage automatique. Les questions s’adaptent au logement connu ou à la recherche de budget, aux travaux et au projet locatif.

Sans logement identifié, le moteur calcule un plafond compatible et utilise ce prix comme scénario explicitement hypothétique. Aucun prix d’annonce, commune ou surface n’est inventé. Si aucun budget n’est possible, aucun prix fictif de 1 € n’est affiché. Les réductions fiscales restent soumises à une confirmation explicite. Les hypothèses proposées sont visibles et modifiables.

Le bilan complet apparaît à la fin : coût, apport, mensualités, prix limite et jauge de négociation. Les réglages avancés conservent le bullet dix ans, les charges et les frais. Le comparateur de variantes, l’impression et les sauvegardes facultatives restent disponibles. Les anciens fichiers de projet restent lisibles ; les nouveaux incluent les choix du parcours pour conserver le sens d’un budget sans bien identifié.

Les six outils WebMCP du formulaire sont disponibles uniquement sur les pages dédiées. Les autres pages exposent les outils publics sans préremplissage. Les adresses canoniques, hreflang, sitemap et liens dans les guides prennent en compte les nouvelles pages.
