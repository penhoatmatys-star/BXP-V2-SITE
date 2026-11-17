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

## Security headers on Caddy

`public/_headers` is read by Netlify only. On Caddy, add the same values inside the site block that serves the marketing pages (not the `/app*` proxy, which keeps its own headers):

```
header {
  Strict-Transport-Security "max-age=31536000; includeSubDomains"
  X-Content-Type-Options "nosniff"
  X-Frame-Options "DENY"
  Referrer-Policy "strict-origin-when-cross-origin"
  Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
  Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self'; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'"
}
```
