# BXP site v2: déploiement

Site statique (Next.js, export). Pas de serveur Node nécessaire.

```bash
npm install
npm run build   # produit le dossier out/
```

- Servir `out/` à la racine `/` (les pages sont en `/dossier/`, `trailingSlash` activé).
- Ne pas toucher à `/app*`, `/health` ni aux enregistrements MX (mail Microsoft 365).
- La CSP actuelle de la racine bloque les scripts inline de Next.js : l'assouplir pour la partie site.
- Garder `robots.txt` / `sitemap.xml` existants ou utiliser ceux du site.
- Les liens vers l'app sont des URL complètes (`https://bxpsport.com/app/...`).
- Sauvegarder le Caddyfile actuel avant de basculer, pour pouvoir revenir en arrière.
- Netlify : `netlify.toml` est prêt (build `npm run build`, publish `out`) pour un aperçu temporaire.
