# Référencement, assistants IA et publicité

## Ce qui est publié

Le contenu commercial décrit des bénéfices vérifiables : comprendre le coût complet, préparer une offre adaptée à ses moyens et préparer une discussion avec sa banque. Il ne promet ni économie garantie, ni prêt accepté, ni expertise de marché. FR, NL et EN disposent de textes propres, visibles dans le HTML initial : pas de mots clés cachés ni de texte réservé aux robots.

Les titres et descriptions associent Kenuvo à l'achat immobilier en Belgique, au budget, à l'apport, aux frais, à la rénovation et au crédit hypothécaire. Les guides, questions-réponses et liens internes complètent ces thèmes. Aucune position Google ni citation par une IA n'est garantie.

JSON-LD lie les identités `Organization`, `Brand`, `WebSite`, `WebApplication` et la page ou l'article, avec identifiants stables, nom Kenuvo, logo et zone Belgique. `Organization` représente ici le projet éditeur ; aucun statut juridique, adresse, numéro d'entreprise, contact, agrément financier, avis client ou réseau social n'est inventé. La FAQ balisée reprend exactement les réponses visibles. Aucun résultat enrichi FAQ n'est promis : Google limite leur affichage.

Canonical, hreflang FR/NL/EN, x-default, Open Graph, nom de marque, langue, sitemap incluant l'accueil et meta robots sont générés. Les actifs et imports de modules sont versionnés pour éviter de mélanger ancien et nouveau code après publication.

## Limite du sous-dossier GitHub Pages

Adresse actuelle : `https://gustomucho.github.io/kevuno/`.

Les robots ne consultent que `https://gustomucho.github.io/robots.txt`, pas `/kevuno/robots.txt`. La copie produite sous le projet ne doit donc pas être présentée comme un contrôle effectif du domaine. `deployment/host-root/robots.txt` est préparé pour le véritable hébergement racine. Il autorise l'exploration et indique le sitemap. Une réponse 404 au robots racine ne bloque pas par elle-même l'exploration, mais il faut vérifier le robots réel en cas de changement d'hébergement.

Google ne prend pas en charge un nom de site distinct au niveau d'un sous-dossier. Le balisage renforce l'identité de Kenuvo, mais ne résout pas cette limite d'affichage de Google. Pour une marque durable et AdSense, utiliser un domaine propre dont la racine est maîtrisée. Aucun autre dépôt ou site existant de Gustomucho n'est modifié ici.

Pour un domaine futur, adapter ensemble `SITE_URL` et `BASE_PATH=/` dans le workflow Pages, puis configurer le DNS et le domaine dans Pages. Vérifier canonical, hreflang, sitemap, robots racine et redirections après bascule. Ne pas copier un domaine fictif en production. Soumettre ensuite le sitemap dans Google Search Console avec un compte propriétaire ; aucune propriété Search Console n'a été créée dans cette tâche.

## Outils pour agents

Entrée principale : `document.modelContext.registerTool()`. `navigator.modelContext` sert uniquement de compatibilité si l'API document est absente. Une erreur de l'API principale ne provoque pas une seconde inscription dans l'ancienne API. Chaque promesse de registration est traitée ; l'AbortSignal permet de retirer les outils. Il n'y a ni polyfill de détection, ni formulaire `toolname` servant de faux support.

- `get_kenuvo_info` : identité et fonctions publiques.
- `get_reference_data` : sources et dates publiques.
- `estimate_renovation` : estimation sur une surface et des paramètres fournis.
- `simulate_purchase` : simulation explicite avec les mêmes fonctions financières que l'interface ; aucun accès au projet affiché.
- `fill_simulator` : préremplissage en mémoire de champs explicitement fournis, sur les pages du simulateur ; validation et modification possibles par l'utilisateur.
- `navigate_calculator` : affichage d'une étape, sans changement des montants.

Aucun outil ne lit une sauvegarde, ne révèle les anciens montants, n'enregistre, n'efface, n'exporte un projet, n'active les annonces ni ne contacte une banque. Les annotations distinguent lecture et modification du formulaire. Les entrées sont validées, les erreurs retournées sous forme structurée, les sorties financières portent leurs unités et limites. L'agent ne doit utiliser les chiffres qu'avec l'autorisation de l'utilisateur. Un fournisseur d'assistant peut traiter les données qui lui sont confiées : la promesse de calcul local par Kenuvo ne signifie pas que tout assistant reste local.

`/ai-tools.json` décrit les outils et schémas. `/agents.md` donne les unités, étapes et limites. Ces documents sont informatifs ; ils ne remplacent ni WebMCP natif ni robots.txt et ne constituent pas un serveur MCP distant. Les pages éditoriales enregistrent les outils publics ; le préremplissage et la navigation ne sont enregistrés que sur le simulateur. Les navigateurs sans WebMCP conservent tout le fonctionnement normal.

Le support WebMCP varie encore selon le navigateur et son activation. Tests automatisés : enregistrement, exécution, API prioritaire, secours ancien, erreurs, annulation, confidentialité et cohérence avec le moteur financier. Un test avec un navigateur/agent compatible réel reste nécessaire pour attester la découverte dans cet environnement. Ne pas confondre un audit de code ou un contexte simulé de test avec cette validation native.

## AdSense : préparé, pas activé

`data/advertising.json` reste sur `enabled: false`, sans identifiant éditeur ou emplacement. Aucun compte n'est ouvert. Le site ne charge aucun script publicitaire externe ni outil de consentement actuellement. Les emplacements sont signalés et ne se font pas passer pour de vraies annonces.

Le chargeur `src/advertising.js` est prêt à intégrer un identifiant réel et un emplacement. Il s'arrête sans toucher au DOM ou appeler une CMP si les prérequis sont absents. Même avec la configuration remplie, il demande un adaptateur de consentement effectif ; aucun adaptateur n'est fourni ou prétendu certifié ici. Les premiers emplacements sont limités aux guides, et le chargeur refuse un document contenant le simulateur. Les données financières du formulaire ne sont jamais données à ce module. Aucun outil IA n'appelle ce chargeur.

Pour activer plus tard :

1. Disposer d'un domaine admissible, idéalement un domaine propre à Kenuvo. L'URL d'inscription AdSense ne doit pas contenir de chemin tel que `/kevuno/`. Aucune admissibilité automatique de GitHub Pages ou approbation Google n'est affirmée.
2. Créer le compte AdSense et faire valider le site ; récupérer le véritable identifiant `ca-pub-...` et un emplacement. Pour la vérification avant diffusion, utiliser la méthode fournie par Google sans activer les annonces prématurément.
3. Intégrer une CMP certifiée Google adaptée au trafic belge/EEE, selon les règles alors applicables. Créer son adaptateur `requestAdPermission()` à partir du résultat réel du consentement, en prenant en compte refus, retrait, personnalisation et signaux requis. Ne pas remplacer la CMP par un simple bouton “J'accepte” ou une constante `true`.
4. Compléter les mentions d'éditeur et la politique de confidentialité/cookies. Revoir les promesses actuelles d'absence de traceurs et les traitements des fournisseurs avant activation.
5. Ajouter les origines exactes requises à la CSP des pages éditoriales selon les scripts officiels AdSense et CMP retenus. La CSP actuelle reste volontairement fermée aux scripts tiers : remplir les identifiants ne la desserre pas.
6. Publier la ligne AdSense réelle dans `/ads.txt` à la racine du domaine, et vérifier HTTP 200. Le build prépare `deployment/host-root/ads.txt` ; aucun faux identifiant vendeur n'est publié. `/kevuno/ads.txt` seul ne suffit pas.
7. Une fois ces points contrôlés, remplir la configuration et brancher l'adaptateur dans `agent-bootstrap.js`. Passer `enabled` à `true` uniquement pour la mise en service validée. Les cases de configuration sont des verrous techniques, pas une certification en elles-mêmes. Tester refus/acceptation/retrait du consentement et l'absence de données de projet dans les requêtes.
8. Vérifier les conditions de l'hébergeur pour l'usage publicitaire envisagé. Ne pas activer d'Auto Ads dans les zones du simulateur sans revue de l'expérience et de la confidentialité.

## Sources primaires vérifiées le 29 octobre 2026

- WebMCP : https://developer.chrome.com/docs/ai/webmcp/imperative-api
- Noms de sites Google : https://developers.google.com/search/docs/appearance/site-names
- Robots : https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
- AdSense, inscription et URL : https://support.google.com/adsense/answer/2784438
- AdSense, validation du site : https://support.google.com/adsense/answer/12169212
- Consentement : https://support.google.com/adsense/answer/13554116
- Ads.txt : https://support.google.com/adsense/answer/12171612
