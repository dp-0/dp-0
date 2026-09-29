# AGENTS.md

## Project Overview

This is a static personal portfolio site for Dinesh Phuyel, focused on PHP, Laravel, backend engineering, open source work, and contact information.

The site is a single-page HTML/CSS/JavaScript project:

- `index.html` contains the page markup, SEO metadata, JSON-LD, navigation, content sections, and many inline layout styles.
- `css/input.css` is the Tailwind CSS v4 source file plus custom theme variables and handcrafted component styles.
- `css/style.css` is the generated stylesheet used by the page.
- `js/script.js` contains small vanilla JavaScript behaviors for mobile navigation, reveal animations, and active section navigation.
- `logo.png`, `favicon.ico`, and `Dinesh phuyel cv.pdf` are static assets referenced by the portfolio.

## Setup

Install dependencies with:

```sh
npm install
```

Build the production CSS with:

```sh
npm run build
```

During CSS work, use:

```sh
npm run watch
```

The site can be opened directly from `index.html`, or served with any simple static file server if browser path behavior needs to be checked.

## Development Notes

- Treat this as a static site. Do not add a frontend framework, bundler, routing layer, or server unless the user specifically asks for it.
- Keep edits scoped and simple. This repo currently favors direct HTML, CSS, and vanilla JavaScript.
- Edit `css/input.css` for styling changes, then run `npm run build` so `css/style.css` stays in sync.
- Do not manually edit generated Tailwind output in `css/style.css` unless the user explicitly asks for a quick generated-file patch.
- Preserve the existing warm dark theme built around the CSS custom properties in `:root`.
- Keep `index.html` SEO metadata, Open Graph tags, canonical URL, and JSON-LD accurate when changing names, roles, images, or URLs.
- Maintain responsive behavior for both the top navigation and bottom mobile navigation.
- Respect accessibility basics: meaningful alt text, usable focus states, semantic headings, and reduced-motion handling.
- Avoid adding large third-party scripts or remote dependencies. The current page only needs static assets, Google Fonts, Tailwind CSS output, and small local JavaScript.

## Content Guidelines

- Keep the portfolio voice professional, direct, and specific to Laravel/backend work.
- Verify contact links, project links, downloadable CV references, and social URLs after content changes.
- If replacing the CV PDF or logo assets, keep filenames or update all references in `index.html` and metadata.
- Be careful with dates, experience claims, framework versions, and availability statements; confirm with the user if uncertain.

## Verification

Before finishing a change, run:

```sh
npm run build
```

For UI changes, also check the page visually at mobile and desktop widths. Pay special attention to:

- Navigation menu open/close behavior.
- Active section highlighting.
- Reveal animations and reduced-motion behavior.
- Text wrapping in cards, buttons, badges, and mobile navigation.
- Asset loading for `logo.png`, `favicon.ico`, and the CV PDF.

There is no automated test suite in this repository at the moment.

## Repository Hygiene

- Keep generated files that the site depends on, especially `css/style.css`, committed alongside their source changes.
- Do not commit local system files such as `.DS_Store`.
- This working directory may not always be initialized as a Git repository, so check the environment before relying on Git commands.
