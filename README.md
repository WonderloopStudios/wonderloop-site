# wonderloop-site

The landing site for Wonderloop Studios, at https://wonderloop.studio.

## Stack

- **React 18** with **TypeScript**
- **Vite** for the dev server and production build
- **GSAP + ScrollTrigger** (via `@gsap/react`) for the rabbit-hole scroll animations
- No CSS framework — plain `src/styles.css` with CSS variables

## Development

```bash
npm install
npm run dev      # local dev server (Vite HMR)
npm run build    # type-check + production build → dist/
npm run preview  # preview a production build locally
```

## Deployment

The site is hosted on the HaideryNet Linux box behind nginx. The repo is
checked out at `/var/www/wonderloop.studio`, and nginx serves the
`dist/` directory:

```bash
cd /var/www/wonderloop.studio
git pull
npm install         # if package.json changed
npm run build       # produces dist/
sudo systemctl reload nginx  # not needed on content-only changes
```

nginx config: `/etc/nginx/sites-available/wonderloop.studio`. TLS is
managed by certbot and auto-renews.

`dist/`, `node_modules/`, and `*.tsbuildinfo` are gitignored — the
server builds fresh on every deploy.

## Project layout

```
src/
  main.tsx                     # React entry point
  App.tsx                      # top-level layout, wires up animations
  styles.css                   # all global styles
  components/
    Header.tsx                 # sticky nav with mobile toggle & scroll-spy
    RabbitHole.tsx             # fixed background rings + vignette
    HeroSection.tsx            # #home
    LinkCards.tsx              # social link buttons
    GamesCarousel.tsx          # #games — self-advancing carousel
    TeamSection.tsx            # #about
    ContactSection.tsx         # #contact — email → mailto: form
    SiteFooter.tsx
  hooks/
    useRabbitHoleAnimations.ts # GSAP ScrollTrigger setup via useGSAP
public/
  assets/                      # images (served at /assets/…)
```
