# Revue technique du 29 octobre 2026

## Changements vérifiables

- 43 pages indexables : accueil de langue, trois accueils localisés, trois questionnaires dédiés, 33 guides et trois pages légales. Une page 404 séparée est en `noindex, follow` et absente du sitemap.
- Titres uniques sans duplication « Kenuvo | Kenuvo », descriptions propres, une seule H1, balises sémantiques, liens internes explorables sans JavaScript.
- Canonical HTTPS, hreflang réciproques pour les langues et pages légales aux URL traduites. Les traductions de guides gardent le même slug dans chaque langue.
- Sitemap XML avec alternatives de langue et robots.txt à la racine du domaine configuré. Pas de règle qui bloque les guides, images ou modules du simulateur.
- Identité JSON-LD Organization / Brand / WebSite / WebApplication ; Article pour les guides, AboutPage pour les pages légales, BreadcrumbList et FAQ correspondant au texte visible. Pas d’avis, note client, autorisation professionnelle ou coordonnées inventés.
- Open Graph et Twitter complets, images auto-hébergées en WebP, dimensions réservées, srcset, textes alternatifs traduits, priorité à la photo d’accueil, chargement différé pour les autres.
- Navigation par ancres, simulateur plus haut, page légale indépendante. Pas de chargement de Google Analytics, Tag Manager ou AdSense.
- La jauge de négociation garde son élément DOM pendant les mises à jour ; prix, taxes, apport, emprunt et mensualités utilisent le même moteur financier. Le prix d’origine reste rétablissable. Les montants ne passent pas dans les URL.

## Search Console

La balise `google-site-verification` n’est produite qu’avec une véritable valeur fournie par le propriétaire :

1. Méthode recommandée : propriété Domaine `kenuvo.be`, validée avec le TXT DNS Name.com fourni par Google. Cette méthode ne nécessite aucune balise HTML.
2. Alternative : propriété Préfixe d’URL `https://kenuvo.be/`, méthode Balise HTML. Copier uniquement le contenu du jeton dans `data/seo.json` → `googleSiteVerification`, ou dans GitHub → Settings → Secrets and variables → Actions → Variables → `GOOGLE_SITE_VERIFICATION`.
3. Publier de nouveau, puis cliquer sur Valider dans Search Console. Ne pas supprimer le jeton ensuite.
4. Soumettre `https://kenuvo.be/sitemap.xml` et inspecter l’accueil et les principaux guides.

Une balise de vérification ne provoque pas de suivi et n’améliore pas à elle seule le classement. `meta keywords` n’est pas utilisé par Google. Les dates de publication, contenus, garanties ou notes ne doivent pas être fabriqués pour obtenir un score.

## Informations encore nécessaires

`data/publisher.json` renseigne Augustin Jacobs. Le formulaire Jotform sert de contact, sans publier son adresse e-mail. Les notifications se règlent dans le compte du prestataire. La politique de confidentialité indique le traitement des messages par Jotform ; les calculs du simulateur restent locaux. L’adresse postale reste à fournir, ainsi que le numéro d’entreprise si applicable. Aucune conformité juridique complète n’est affirmée.

Le jeton Search Console et l’accès à la propriété Google ne sont pas fournis. Aucune validation ou indexation n’est prétendue acquise. Les positions et le trafic dépendent aussi du contenu, des liens obtenus et du comportement réel des visiteurs. Un audit du code ne constitue pas un score Lighthouse ni une promesse « 10/10 ». Le test visuel dans le navigateur est indisponible dans cet environnement ; aucun résultat Core Web Vitals réel n’est inventé.

## Références

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/fundamentals/get-started-developers
- https://developers.google.com/search/docs/appearance/site-names
- https://support.google.com/webmasters/answer/9008080
- https://economie.fgov.be/fr/themes/line/commerce-electronique/vente-par-internet/site-dentreprise-et-comptes

## Contact via Jotform

Le formulaire public répond en HTTP 200, comporte un CAPTCHA natif et ne contient pas l’adresse e-mail du destinataire dans le HTML inspecté. La vérification complète du destinataire des notifications privées n’est pas disponible avec le connecteur : le propriétaire doit contrôler Settings → Emails → Notification → Recipients dans le constructeur Jotform. Aucun e-mail de test ni soumission n’a été créé. Le formulaire s’ouvre au clic, et aucune donnée de simulation n’est ajoutée à son URL. Les libellés du formulaire sont présentés en trois langues pour éviter un faux sélecteur de langue.

## Parcours dédié

Les trois questionnaires ont leurs propres URL, titres, descriptions, canonical, hreflang et entrées dans le sitemap. La page d’accueil conserve le texte éditorial et ses guides ; elle ne charge plus le module du questionnaire. Les liens d’action mènent directement au parcours. Les réponses restent en mémoire et ne sont pas incluses dans les URL. Le paramètre public `example=1` ne transporte aucune donnée personnelle et ouvre un exemple fictif clairement identifié.

Validation du parcours : 48 tests automatisés et essais du DOM simulé sur les parcours logement connu, budget sans bien identifié et location. Les essais couvrent la navigation, le bilan uniquement à la fin, la jauge sans recréer son élément, le changement de langue en mémoire, la sauvegarde/relecture explicite et le financement bullet. Ces essais ne constituent pas une vérification visuelle dans un navigateur.
