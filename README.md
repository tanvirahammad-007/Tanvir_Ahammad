# 🌐 Tanvir Ahammad — Developer Portfolio

A modern, fully responsive personal portfolio website built with pure **HTML, CSS, and JavaScript** — no frameworks, no build tools. High-end animations, glassmorphism design, and a premium custom cursor inspired by [suryanshsva.framer.website](https://suryanshsva.framer.website/).

> **v4 — Fully Refactored** — All bugs fixed, responsive on every device, upgraded cursor, production-ready code.

---

## 🔗 Live Preview

Open `index.html` in any browser to run locally, or deploy to GitHub Pages / Netlify in minutes.

---

## ✨ All Features

### 🎨 Design
- Dark glassmorphism theme (`#050810` background, frosted glass cards)
- Teal (`#00f5d4`) + Violet (`#7b61ff`) dual-accent color system
- Animated gradient background orbs with parallax
- Floating particle canvas with connecting lines (desktop only)
- Animated gradient border ring on profile photo
- Smooth scroll reveal animations (fade + slide on every section)

### 🖱️ Interactions
- **Premium two-part custom cursor** — instant dot + lagging ring with blend mode
- 3D tilt effect on project cards and profile image
- Typing animation in hero section (5 rotating phrases)
- Animated counter numbers in About section
- Animated skill bars with glow tip
- Skill category tabs (Frontend / Backend / Tools & Cloud)
- Floating tech pill cloud with hover glow
- Page loading animation with progress bar

### 📱 Responsive Design
- Fully optimized for all screen sizes: Mobile (320px+), Tablet, Laptop, Large Desktop
- Hamburger menu with smooth full-screen mobile overlay + close button
- Touch-friendly tap targets (min 44px–52px)
- iOS zoom prevention on form inputs
- Safe area insets for notched phones
- Reduced particle count on mobile for performance
- Particles disabled on screens under 480px

### ⚡ Performance
- Google Fonts loaded asynchronously (never blocks render)
- Canvas RAF paused when tab hidden
- All 3D tilt effects skipped on touch devices
- Scroll listeners use `{ passive: true }`
- `unobserve()` after scroll reveal fires (no wasted observers)
- Debounced resize handler for particles

### ♿ Accessibility
- Semantic HTML5 (`<nav>`, `<section>`, `<footer>`, `<form>`, `<article>`)
- ARIA roles on tabs (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- `aria-label` on all icon-only buttons
- `aria-hidden="true"` on all decorative elements
- `aria-expanded` + focus management on mobile menu
- `prefers-reduced-motion` disables all animations
- `role="progressbar"` on skill bars
- Form labels properly linked via `for`/`id`
- `aria-live="polite"` on typing text + form success message

---

## 📁 Project Structure

```
Tanvir_Ahammad/
├── index.html    ← Semantic markup, ARIA attributes, no inline scripts
├── style.css     ← Design tokens, glassmorphism, animations, responsive
├── script.js     ← All interactions (cursor, particles, tabs, music, etc.)
├── myphoto.jpg   ← Profile photo (same folder)
├── music.mp3     ← Background lo-fi music (same folder)
├── favicon.png   ← Browser icon
└── README.md
```

---

## 🗂️ Sections

| # | Section     | Description |
|---|-------------|-------------|
| 01 | **Hero**    | Name, animated typing role, profile photo, CTA buttons, social links |
| 02 | **About**   | Bio, animated stat counters (Projects, Languages, Problems Solved, Years) |
| 03 | **Skills**  | Tabbed skill bars (Frontend / Backend / Tools) + floating tech pill cloud |
| 04 | **Projects**| 6 project cards with mockup visuals, tags, GitHub & Live links |
| 05 | **Experience**| Vertical animated timeline (internship + education) |
| 06 | **Contact** | Info cards, social links, contact form with send animation |

---

## 🚀 Projects Showcased

| Project | Tech Stack | Links |
|---------|-----------|-------|
| **Guess The Number** | HTML, CSS, JavaScript | [GitHub](https://github.com/tanvirahammad-007/Guess-The-Number) · [Live](https://tanvirahammad-007.github.io/Guess-The-Number/) |
| **Pig Dice Game** | HTML, CSS, JavaScript | [GitHub](https://github.com/tanvirahammad-007/Pig-Dice-Game) · [Live](https://tanvirahammad-007.github.io/Pig-Dice-Game/) |
| **Words to Inspire** | HTML, CSS, JavaScript | [GitHub](https://github.com/tanvirahammad-007/Words-to-Inspire) · [Live](https://tanvirahammad-007.github.io/Words-to-Inspire/) |
| **TicTacToe — Offline** | HTML, CSS, JS, Minimax AI | [GitHub](https://github.com/tanvirahammad-007/Tic-Tac-Toe) · [Live](https://tanvirahammad-007.github.io/Tic-Tac-Toe/) |
| **TicTacToe — Online** | JavaScript, Firebase, Netlify | [GitHub](https://github.com/tanvirahammad-007/Tic-Tac-Toe) · [Play](https://team-believers.netlify.app/) |
| **CodeAlpha C++ Projects** | C++, STL, OOP, Algorithms | [GitHub](https://github.com/tanvirahammad-007/CodeAlpha_Projects) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic structure, ARIA |
| CSS3 | Glassmorphism, animations, grid, clamp(), custom properties |
| Vanilla JavaScript (ES6+) | All interactions, canvas, cursor, scroll effects |
| Google Fonts | Syne · DM Mono · DM Sans |
| Canvas API | Animated floating particles |
| CSS Custom Properties | Full design token system |
| IntersectionObserver API | Scroll reveal + active nav link |
| RequestAnimationFrame | Cursor, particles, counters |

**No frameworks. No build tools. No dependencies.**

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/tanvirahammad-007/portfolio.git

# 2. Navigate into the folder
cd portfolio

# 3. Open in browser (Option A: double-click index.html)
# Option B: VS Code Live Server extension
# Option C: local server
npx serve .
```

### Deploy to GitHub Pages

1. Push to a GitHub repository
2. Settings → Pages → Deploy from branch → main → / (root)
3. Live at `https://yourusername.github.io/repository-name/`

### Deploy to Netlify

Drag & drop the folder at [netlify.com/drop](https://netlify.com/drop), or connect your GitHub repo (no build command needed).

---

## 🎨 Customization

### Change Name
Search `Tanvir Ahammad` in `index.html` and replace. Also update `<title>` and `<TA/>` logo initials.

### Change Photo
Replace `myphoto.jpg` in the same folder. Update `src` if using a different filename:
```html
<img src="your-photo.jpg" alt="Your Name" class="profile-photo" />
```

### Change Accent Colors
Edit CSS variables in `style.css`:
```css
:root {
  --accent:   #00f5d4;  /* main teal */
  --accent-2: #7b61ff;  /* violet */
  --accent-3: #ff6b6b;  /* coral */
}
```

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
Copy any `<article class="project-card ...">` block in `index.html` and update the content.

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