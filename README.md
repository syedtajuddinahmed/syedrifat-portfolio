# SyedRifat — Personal Portfolio Website

A premium, dark, minimalist personal portfolio for **Syed Tajuddin Ahmed Rifat (SyedRifat)**,
built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step.

## 1. How to run it

Just open `index.html` in any modern browser (double-click it, or right-click → Open With → your browser).
There is nothing to install and nothing to build.

For live-reload while editing, you can optionally use the "Live Server" extension in VS Code, but it's not required.

## 2. Folder structure

```
SyedRifat-Portfolio/
├── index.html          → All page content
├── style.css           → All styling (colors, layout, responsive rules)
├── script.js           → Navbar, mobile menu, scroll animations, form validation
├── assets/
│   ├── logo.png             → Primary horizontal logo (navbar)
│   ├── logo-sr.png          → SR monogram (footer / mobile navbar)
│   ├── favicon.png          → Browser tab icon
│   └── profile-placeholder.svg → Placeholder — replace with your real photo
└── README.md
```

## 3. Where to replace the logo

The logo files were extracted from your uploaded brand sheet and already placed in `assets/`:
- `assets/logo.png` — full horizontal "SR + SyedRifat" lockup, used in the navbar.
- `assets/logo-sr.png` — SR monogram only, used in the footer and on mobile.
- `assets/favicon.png` — square version of the monogram, used as the browser tab icon.

If you ever get new logo files, just replace these three images with the same filenames and everything updates automatically.

## 4. Where to add your profile photo

1. Add your photo to the `assets/` folder (e.g. `assets/profile.jpg`).
2. Open `index.html`, find the comment:
   ```html
   <!-- EDIT HERE: Replace assets/profile-placeholder.svg with assets/profile.jpg -->
   ```
3. Change the `src` on the line below it from `assets/profile-placeholder.svg` to `assets/profile.jpg`.

## 5. Where to change personal information

Open `index.html` and search for `EDIT HERE` comments — they mark every spot you're likely to want to change:

- **Name & role** — in the Hero section.
- **About text** — in the About section.
- **Email address** — appears in the Hero, Contact and Footer sections (`mailto:youremail@example.com`).
- **GitHub URL** — Hero, Projects, Developer Activity, Contact and Footer sections.
- **LinkedIn URL** — Hero, Contact and Footer sections.
- **CV / Resume link** — the "Download CV" button in the Hero section (`href="#"`).

## 6. Where to edit skills

In `index.html`, inside `<section id="skills">`, each skill is one `.skill-card` block:

```html
<div class="skill-card"><i data-lucide="file-code"></i><span>HTML5</span></div>
```

Copy, remove, or edit these lines to change what's listed under "Current Skills," "Currently Learning," and "Exploring." Icon names come from [Lucide Icons](https://lucide.dev/icons/) — just change the `data-lucide="..."` value to swap icons.

## 7. Where to edit projects

In `index.html`, inside `<section id="projects">`, each project is one `<article class="project-card">` block. To add a project, copy an existing block and update:

- The number (`01`, `02`, ...)
- Title and description
- Technology tags
- The GitHub and Live Demo links (currently `href="#"` placeholders — replace with real URLs)

**Never leave fake URLs in place of `#`** — only add real links once your projects are actually online.

## 8. Where to edit your education

In `index.html`, inside `<section id="education">`, edit the `.education-card` block: degree, school name, and dates.

## 9. Where to change colors

All colors live as CSS variables at the top of `style.css`, inside `:root`:

```css
:root {
  --bg-primary: #060607;
  --bg-secondary: #0b0b0d;
  --text-primary: #f3f4f6;
  --text-secondary: #a1a3aa;
  --accent: #00b4ff;
  --border: rgba(255, 255, 255, 0.09);
  /* ...and a few more */
}
```

Change any of these values and the whole site updates — no need to hunt through the rest of the CSS.

## 10. Developer Activity section

This section currently shows a "connect a live GitHub data source" placeholder instead of fake stats,
by design — the brief for this site explicitly avoids invented follower counts, repo counts, or contribution graphs.
If you'd like real GitHub stats later, a common approach is embedding a service like GitHub Readme Stats,
or wiring up the GitHub REST API with a small script.

## 11. Contact form

The contact form validates input in the browser (name, email format, message length) but does **not** send
email on its own — there's no backend connected. It shows the message: *"Form is ready for
email-service/backend integration."* To make it actually send messages, connect it to a service like
Formspree, EmailJS, or your own backend endpoint inside the `contactForm.addEventListener('submit', ...)`
block in `script.js`.

## 12. General customization tips

- Keep three files separate (`index.html`, `style.css`, `script.js`) — don't merge them, so it stays easy to edit.
- Search for `EDIT HERE` in all three files whenever you're unsure where to make a change.
- The site respects `prefers-reduced-motion`, so animations automatically turn off for visitors who've requested that in their OS settings.
- The layout is fully responsive (desktop, tablet, and mobile) using CSS media queries near the bottom of `style.css`.
