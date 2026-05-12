# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Plain HTML/CSS/JS — no build tool, no framework, no package manager. Open `index.html` directly in a browser or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Architecture

Single-page site. All content lives in three files:

- **`index.html`** — markup and copy for all five sections: Hero, Services, Why matcro, Contact, Footer
- **`style.css`** — all styles; uses CSS custom properties (design tokens at the top of `:root`)
- **`script.js`** — scroll reveal via `IntersectionObserver`, nav scroll state, contact form handling, smooth anchor scroll

## Design Tokens

Defined in `:root` at the top of `style.css`. Key values:

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#00e87a` | Electric mint — CTAs, highlights, hover states |
| `--bg` | `#080808` | Page background |
| `--font-display` | Space Grotesk | All headings and labels |
| `--font-body` | Inter | Body text |

Both fonts are loaded from Google Fonts in `<head>`.

## Scroll Reveal Pattern

Elements with `[data-reveal]` start hidden (`opacity: 0; transform: translateY(28px)`) and become visible when the `IntersectionObserver` in `script.js` adds the `.visible` class. Hero lines use `.reveal-line` / `.reveal-fade` classes with CSS `transition-delay` for stagger.

## Contact Form

The form in `#contact` simulates submission with a timeout — there is no backend. To wire up a real endpoint, replace the `setTimeout` block in `script.js` around the `contactForm` submit handler.
