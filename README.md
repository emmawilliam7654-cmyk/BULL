# GORKIN — Meme Coin Website

Jet black theme, fully responsive, built with Vite + React (JSX + CSS).

## Setup

1. **Add your hero image**  
   Place `mainimage.jpeg` in the `public/` folder. The hero shows this image first, then the GORKIN heading. If the file is missing, a placeholder is shown.

2. **Install and run**
   ```bash
   npm install
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173).

## Structure

- **Nav** — Sticky header, logo “GORKIN”, mobile hamburger menu
- **Hero** — `mainimage.jpeg` first, then main heading “GORKIN” and tagline
- **Features** — Why GORKIN (community, LP locked, meme power)
- **Tokenomics** — Supply, LP, tax stats + simple chart
- **HowToBuy** — 3 steps + CTA
- **Footer** — Brand, links, disclaimer

Each component has its own `.jsx` and `.css` file. Global styles and CSS variables (jet black theme, accent green) are in `src/index.css`.

## Build

```bash
npm run build
npm run preview
```
