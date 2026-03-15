# 🌐 Tanvir Ahammad — Developer Portfolio

A modern, fully responsive personal portfolio website built with pure **HTML, CSS, and JavaScript** — no frameworks, no build tools. Glassmorphism design, dark/light mode, pixel sword cursor, smooth animations, and full mobile support.

> **v5 — Major Upgrade** — Dark/light mode, Minecraft sword cursor, hero redesign, project filters, form validation, all bugs fixed, production-ready.

---

## 🔗 Live Preview

Open `index.html` in any browser to run locally, or deploy to GitHub Pages / Netlify in minutes.

---

## ✨ All Features

### 🎨 Design
- **Dark & Light mode** — toggle with one click or press `T`, saved to `localStorage`
- Dark glassmorphism theme (`#050810` background, frosted glass cards)
- Light mode with clean neutrals and adjusted accents for full readability
- Teal (`#00f5d4`) + Violet (`#7b61ff`) dual-accent color system
- Animated gradient background orbs with mouse parallax
- Floating particle canvas with connecting lines (480px+ screens only)
- Animated gradient border ring on profile photo (mask-composite — works in both themes)
- Smooth scroll reveal animations (fade + slide on every section)
- Staggered hero entrance animations (each element cascades in)

### 🖱️ Interactions
- **Minecraft pixel diamond sword cursor** — CSS-only, base64 embedded (zero path issues)
- Transparent background sword (black bg removed, 32×32px, cross-browser)
- Touch/mobile devices automatically fall back to system cursor
- 3D tilt effect on project cards and profile image (hover devices only)
- Typing animation in hero section (5 rotating phrases)
- Animated counter numbers in About section (RAF-based eased counting)
- Animated skill bars with glow tip per tab
- Skill category tabs (Frontend / Backend / Tools & Cloud)
- **Project filter buttons** — filter by All / JavaScript / C++ / Firebase
- Floating tech pill cloud with hover glow
- Page loading animation with progress bar

### 📋 Content Improvements
- About section **quick-info grid** (Location, Degree, Status, Languages)
- Each project card has a **feature bullet list** (3 highlights)
- Real-time **form field validation** — ✓/✕ indicators on blur
- Submit button **loading spinner** state while sending

### 📱 Responsive Design
- Fully optimized: Mobile (320px+), Tablet, Laptop, Large Desktop
- Hero: two-column on desktop, single-column centred stack on mobile
- Profile photo stays a true circle at all sizes (never distorts to oval)
- Hamburger menu with smooth full-screen mobile overlay
- Touch-friendly tap targets (min 44px)
- iOS zoom prevention on form inputs
- Particles disabled under 480px for performance

### ⚡ Performance
- Google Fonts loaded asynchronously (never blocks render)
- Canvas RAF paused when tab is hidden
- Scroll listeners use `{ passive: true }`
- `unobserve()` after scroll reveal fires (no wasted observers)
- Cursor embedded as base64 — no extra network request

### ♿ Accessibility
- Semantic HTML5 (`<nav>`, `<section>`, `<footer>`, `<form>`, `<article>`)
- ARIA roles on tabs, progressbars, dialogs
- `aria-label` on all icon-only buttons
- `prefers-reduced-motion` disables all animations
- Form labels properly linked via `for`/`id`
- `aria-live="polite"` on typing text + form success message

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Toggle dark / light theme |
| `M` | Toggle background music |

---

## 📁 Project Structure

```
Tanvir_Ahammad/
├── index.html      ← Semantic markup, ARIA, project filter data-tags
├── style.css       ← Design tokens, dark/light mode, sword cursor, responsive
├── script.js       ← Particles, tabs, filters, counters, music, form
├── sword.png       ← Minecraft diamond sword (32×32, transparent bg)
├── myphoto.jpg     ← Profile photo
├── music.mp3       ← Background lo-fi music
├── favicon.png     ← Browser icon
└── README.md
```

---

## 🗂️ Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Name, animated typing role, profile photo with spinning ring, CTA buttons, floating badges, social links |
| 02 | **About** | Bio, quick-info grid, animated stat counters |
| 03 | **Skills** | Tabbed skill bars (Frontend / Backend / Tools) + floating tech pill cloud |
| 04 | **Projects** | 6 project cards with filter buttons, feature lists, mockup visuals, GitHub & Live links |
| 05 | **Experience** | Vertical animated timeline (internship + education) |
| 06 | **Contact** | Info cards, social links, validated contact form with loading state |

---

## 🚀 Projects Showcased

| Project | Tech Stack | Filter | Links |
|---------|-----------|--------|-------|
| **Guess The Number** | HTML, CSS, JavaScript | `js` | [GitHub](https://github.com/tanvirahammad-007/Guess-The-Number) · [Live](https://tanvirahammad-007.github.io/Guess-The-Number/) |
| **Pig Dice Game** | HTML, CSS, JavaScript | `js` | [GitHub](https://github.com/tanvirahammad-007/Pig-Dice-Game) · [Live](https://tanvirahammad-007.github.io/Pig-Dice-Game/) |
| **Words to Inspire** | HTML, CSS, JavaScript | `js` | [GitHub](https://github.com/tanvirahammad-007/Words-to-Inspire) · [Live](https://tanvirahammad-007.github.io/Words-to-Inspire/) |
| **TicTacToe — Offline** | HTML, CSS, JS, Minimax AI | `js` | [GitHub](https://github.com/tanvirahammad-007/Tic-Tac-Toe) · [Live](https://tanvirahammad-007.github.io/Tic-Tac-Toe/) |
| **TicTacToe — Online** | JavaScript, Firebase, Netlify | `js` `firebase` | [GitHub](https://github.com/tanvirahammad-007/Tic-Tac-Toe) · [Play](https://team-believers.netlify.app/) |
| **CodeAlpha C++ Projects** | C++, STL, OOP, Algorithms | `cpp` | [GitHub](https://github.com/tanvirahammad-007/CodeAlpha_Projects) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic structure, ARIA |
| CSS3 | Glassmorphism, dark/light mode, animations, grid, clamp(), custom properties |
| Vanilla JavaScript (ES6+) | Particles, tabs, filters, counters, music, form |
| Google Fonts | Syne · DM Mono · DM Sans |
| Canvas API | Animated floating particles |
| CSS Custom Properties | Full design token system + theme switching |
| IntersectionObserver API | Scroll reveal + active nav link |
| RequestAnimationFrame | Particles, counters |
| Web3Forms | Contact form backend (no server needed) |

**No frameworks. No build tools. No dependencies.**

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/tanvirahammad-007/Tanvir_Ahammad.git

# 2. Navigate into the folder
cd Tanvir_Ahammad

# 3. Open in browser — double-click index.html
# OR use VS Code Live Server extension
# OR run a local server:
npx serve .
```

### Deploy to GitHub Pages
1. Push to a GitHub repository
2. Settings → Pages → Deploy from branch → `main` → `/` (root)
3. Live at `https://yourusername.github.io/repository-name/`

### Deploy to Netlify
Drag & drop the folder at [netlify.com/drop](https://netlify.com/drop), or connect your GitHub repo — no build command needed.

---

## 🎨 Customization

### Change Theme Colors
```css
:root {
  --accent:   #00f5d4;  /* teal   */
  --accent-2: #7b61ff;  /* violet */
  --accent-3: #ff6b6b;  /* coral  */
}
```

### Change Name
Search `Tanvir Ahammad` in `index.html` and replace. Also update `<title>` and the `<TA/>` logo initials.

### Change Photo
Replace `myphoto.jpg` in the same folder:
```html
<img src="your-photo.jpg" alt="Your Name" class="profile-photo" />
```

### Change Sword Cursor
Replace `sword.png` with any 32×32 transparent PNG, then update the base64 in `style.css`:
```css
cursor: url('data:image/png;base64,YOUR_BASE64') 4 4, url('sword.png') 4 4, auto;
```
Generate base64: `base64 sword.png` in terminal, or use an online base64 encoder.

### Add / Edit Skills
In `index.html`, update `data-width` (0–100) and label:
```html
<div class="skill-meta">
  <span class="skill-name">Your Skill</span>
  <span class="skill-pct">80%</span>
</div>
<div class="skill-bar">
  <div class="skill-fill" data-width="80"></div>
</div>
```

### Add a Project Card
Copy any `<article class="project-card ...">` block and update the content.
Set `data-tags` to any combination of: `js`, `cpp`, `firebase` for the filter buttons.

### Add a Filter Category
1. Add `<button class="filter-btn" data-filter="react">React</button>` in the filters row
2. Add `data-tags="react"` to matching project cards

### Update Contact Info
Search for `tanvirahammad890@gmail.com` and `Barura, Cumilla, Bangladesh` in `index.html`.

---

## 📬 Contact

**Tanvir Ahammad**
- 📧 Email: tanvirahammad890@gmail.com
- 💼 LinkedIn: [tanvir-ahammad-007](https://www.linkedin.com/in/tanvir-ahammad-007-975970388/)
- 🐙 GitHub: [tanvirahammad-007](https://github.com/tanvirahammad-007)
- 🐦 Twitter/X: [@AhammadTan94659](https://x.com/AhammadTan94659)
- 📍 Location: Barura, Cumilla, Bangladesh

---

## 📄 License

Open source under the [MIT License](LICENSE). Feel free to use as a template — replace personal info, projects, and photo with your own.

---

<div align="center">
  <p>Built with ☕ and obsessive attention to detail.</p>
  <p>© 2025 Tanvir Ahammad</p>
</div>