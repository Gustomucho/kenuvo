# Revue technique du 29 octobre 2026

## Changements vérifiables

- 40 pages indexables : accueil de langue, trois simulateurs, 33 guides et trois pages légales. Une page 404 séparée est en `noindex, follow` et absente du sitemap.
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

`data/publisher.json` doit recevoir les véritables nom/raison sociale, adresse et e-mail publics de l’éditeur, et le numéro d’entreprise si applicable. La page signale les informations manquantes ; aucune conformité juridique complète n’est affirmée.

Le jeton Search Console et l’accès à la propriété Google ne sont pas fournis. Aucune validation ou indexation n’est prétendue acquise. Les positions et le trafic dépendent aussi du contenu, des liens obtenus et du comportement réel des visiteurs. Un audit du code ne constitue pas un score Lighthouse ni une promesse « 10/10 ». Le test visuel dans le navigateur est indisponible dans cet environnement ; aucun résultat Core Web Vitals réel n’est inventé.

## Références

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/fundamentals/get-started-developers
- https://developers.google.com/search/docs/appearance/site-names
- https://support.google.com/webmasters/answer/9008080
- https://economie.fgov.be/fr/themes/line/commerce-electronique/vente-par-internet/site-dentreprise-et-comptes
