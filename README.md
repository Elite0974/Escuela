# Impulso 🚀

Una web tipo TikTok enfocada en motivación laboral: frases, videos, hábitos y pequeños recordatorios para recuperar el impulso durante un día difícil.

## Stack

- React 19
- Vite
- CSS puro
- LocalStorage para likes, guardados y publicaciones
- GitHub Pages + GitHub Actions

## Ejecutar localmente

```bash
npm install
npm run dev
```

Luego abre la URL que muestra Vite.

## Crear versión de producción

```bash
npm run build
npm run preview
```

## Subir a GitHub

```bash
git init
git add .
git commit -m "feat: primera versión de Impulso"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

### GitHub Pages

1. Cambia `base` en `vite.config.js` al nombre exacto de tu repositorio:
   `/TU_REPOSITORIO/`
2. En GitHub: **Settings → Pages**.
3. En **Build and deployment**, selecciona **GitHub Actions**.
4. Haz push a `main`.
5. El workflow de `.github/workflows/deploy.yml` construirá y publicará la web automáticamente.

> Si tu repo se llama `tu_usuario.github.io`, puedes usar `base: "/"`.

## Funcionalidades del MVP

- Feed vertical tipo TikTok.
- Frases y videos de ejemplo.
- Likes.
- Guardados.
- Categorías.
- Botón "Necesito motivación".
- Formulario para crear una publicación local.
- Persistencia con `localStorage`.
- Responsive para móvil y escritorio.

## Próximos pasos

- Login con Supabase/Firebase.
- Base de datos real.
- Subida de videos.
- Comentarios.
- Perfiles.
- Moderación.
- Algoritmo de recomendaciones.
