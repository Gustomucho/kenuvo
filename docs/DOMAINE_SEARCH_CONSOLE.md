# Raccorder kenuvo.be et connecter Google

Domaine communiqué par le propriétaire : **kenuvo.be**. Le service se nomme **Kenuvo**, conformément au domaine acheté. Le dépôt a été renommé en `Gustomucho/kenuvo`.

## État constaté le 29 octobre 2026

Le résolveur public Google renvoie les serveurs DNS Name.com et une adresse A `91.195.240.94`. Aucun AAAA à la racine ni CNAME pour www n'a été renvoyé lors du contrôle. Ce domaine ne pointe donc pas encore vers les adresses GitHub Pages ci-dessous. Aucune modification de DNS ou de compte n'a été effectuée par le code.

## 1. Chez Name.com

Se connecter → My Domains → kenuvo.be → Manage DNS Records.

Remplacer l'entrée A de la racine pointant vers `91.195.240.94` par quatre entrées A. Pour la racine, laisser **Host vide** dans Name.com. Mettre une adresse par ligne, TTL 300 :

| Type | Host | Answer |
| --- | --- | --- |
| A | vide | 185.199.108.153 |
| A | vide | 185.199.109.153 |
| A | vide | 185.199.110.153 |
| A | vide | 185.199.111.153 |
| CNAME | www | gustomucho.github.io |

Ne pas mettre `https://` ou `/kenuvo/` dans le CNAME. Ne pas ajouter de joker `*`. Ne pas supprimer les MX, TXT et autres réglages d'e-mail. Si un AAAA racine ou une entrée www conflictuelle est ajouté entre-temps, le vérifier avant de le remplacer. Ne pas changer les serveurs de noms : ceux constatés sont déjà chez Name.com.

## 2. Dans GitHub

Ouvrir le dépôt Gustomucho/kenuvo → Settings → Pages → Custom domain → saisir `kenuvo.be` → Save. Ce réglage est nécessaire : un fichier CNAME dans le dépôt ne remplace pas cette configuration avec le workflow Actions.

Attendre la validation DNS et le certificat, puis activer **Enforce HTTPS** quand l'option devient disponible. La propagation peut demander du temps ; ne pas effacer puis recréer les réglages en boucle. GitHub recommande de vérifier aussi la propriété du domaine dans les réglages Pages du compte, avec le TXT `_github-pages-challenge-Gustomucho` qu'il fournit. Garder ce TXT ensuite.

Le workflow de publication lit désormais l'URL réellement configurée par GitHub Pages avec `actions/configure-pages@v5`. Une fois le domaine saisi, relancer le workflow Test and deploy Kenuvo → Run workflow. Le build utilisera `https://kenuvo.be` et `/`, sans modification manuelle des fichiers. Avant cette configuration, il conserve l'adresse GitHub Pages actuelle.

Contrôler après publication :

- https://kenuvo.be/fr/ et les versions NL/EN ;
- https://kenuvo.be/robots.txt ;
- https://kenuvo.be/sitemap.xml ;
- https://kenuvo.be/ads.txt (commentaire tant qu'AdSense n'est pas actif) ;
- www et l'ancienne adresse GitHub redirigent vers le domaine retenu ;
- canonical et hreflang utilisent le même domaine, sans `/kenuvo/`.

Ces URL sont les cibles après raccordement, pas une confirmation qu'elles fonctionnent déjà. Ne pas soumettre le sitemap du nouveau domaine avant de vérifier qu'il est servi correctement.

## 3. Google Search Console

1. Ouvrir https://search.google.com/search-console/about et cliquer sur Commencer. Choisir le compte Google qui restera propriétaire du projet.
2. Ajouter une propriété **Domaine** : `kenuvo.be`, sans https et sans www.
3. Copier la valeur TXT exacte fournie par Google, de forme `google-site-verification=...`. Ne pas copier un exemple de documentation.
4. Dans Name.com, ajouter un enregistrement TXT : Host vide ; Answer = valeur Google exacte ; TTL 300. Ne pas écraser les TXT existants.
5. Revenir dans Search Console et cliquer sur Valider. Si le TXT n'est pas encore visible, attendre la propagation et réessayer. Garder le TXT après validation.
6. Quand le site est réellement publié sur le domaine, ouvrir Sitemaps et soumettre `https://kenuvo.be/sitemap.xml`.
7. Inspecter l'accueil français et les principales pages d'entrée. Demander leur indexation une fois, puis suivre les rapports plutôt que multiplier les demandes.
8. Suivre les impressions, clics, requêtes, pays, appareils et pages. Ces mesures concernent Google Search et ne nécessitent pas un script publicitaire ou Google Analytics dans le simulateur.

Aucun compte ou propriété Search Console n'a été créé ici, aucun TXT de propriété n'a été inventé. Le code du site ne suffit pas à prouver la possession du domaine.

## 4. Les autres outils Google utiles

- **PageSpeed Insights** : https://pagespeed.web.dev/ — vitesse et expérience mobile, sans ajout de script. Un site récent peut ne pas disposer de données réelles suffisantes.
- **Rich Results Test** : https://search.google.com/test/rich-results — balisage compatible avec les résultats enrichis Google. Le validateur Schema.org complète le contrôle des types Brand/WebSite non pris en charge par cet outil. Aucun résultat enrichi n'est garanti.
- **Google Analytics 4** : facultatif, pour comprendre l'usage et les parcours ; ce n'est pas un prérequis à l'indexation. Ne pas le brancher avant d'avoir défini consentement, confidentialité et événements. Aucun montant, revenu, adresse de bien ou contenu de sauvegarde ne doit être transmis. Aucun traceur Analytics n'est activé ici.
- **AdSense** : monétisation future, distincte de Search Console. Laisser désactivé jusqu'à inscription, validation du site et intégration du consentement.
- **Google Business Profile** : ne pas créer une fiche de commerce physique pour ce seul service en ligne. Les activités exclusivement en ligne ne remplissent pas les critères habituels.

## Sources officielles

- Name.com A : https://www.name.com/support/articles/115004893508-adding-an-a-record
- Name.com CNAME : https://www.name.com/support/articles/115004895548-adding-a-cname-record
- Name.com TXT : https://www.name.com/support/articles/115004972547-adding-a-txt-record
- GitHub Pages domaines : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Vérification GitHub : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- Search Console : https://support.google.com/webmasters/answer/9008080
- PageSpeed : https://developers.google.com/speed/docs/insights/v5/about
- Business Profile : https://support.google.com/business/answer/13763036
