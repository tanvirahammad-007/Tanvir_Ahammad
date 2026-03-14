# 🌐 Tanvir Ahammad — Developer Portfolio

A modern, fully responsive personal portfolio website built with pure **HTML, CSS, and JavaScript** — no frameworks, no build tools, just clean vanilla code with high-end animations and a glassmorphism design.

---

## 🔗 Live Preview

> Open `index.html` in any browser to run it locally, or deploy it to GitHub Pages / Netlify in minutes.

---

## 📸 Preview

```
┌─────────────────────────────────────────────┐
│  < TA />   Home  About  Skills  Projects ...│  ← Navbar
├─────────────────────────────────────────────┤
│                                             │
│   Hello, I'm                                │
│   Tanvir Ahammad          [ Photo ]         │  ← Hero
│   I build beautiful UIs.                    │
│                                             │
├─────────────────────────────────────────────┤
│  About  │  Skills  │  Projects  │  Contact  │
└─────────────────────────────────────────────┘
```

---

## ✨ Features

### 🎨 Design
- Dark glassmorphism theme (`#050810` background, frosted glass cards)
- Teal (`#00f5d4`) + Violet (`#7b61ff`) dual-accent color system
- Animated gradient background orbs
- Floating particle canvas with connecting lines
- Animated gradient border ring on profile photo
- Smooth scroll reveal animations (fade + slide on every section)

### 🖱️ Interactions
- Custom cursor with lagged ring follow and hover-expand effect
- 3D tilt effect on project cards and profile image (mouse tracking)
- Typing animation in hero section (5 rotating phrases)
- Animated counter numbers (About section stats)
- Animated skill progress bars with glow tip
- Skill category tabs (Frontend / Backend / Tools & Cloud)
- Floating tech pill cloud with hover glow
- Page loading animation with progress bar

### 📱 Responsive Design
- Fully optimized for all screen sizes:
  - Mobile: 320px – 480px
  - Large phones: 480px – 768px
  - Tablets: 768px – 1024px
  - Desktop: 1024px+
- Hamburger menu with smooth full-screen mobile overlay
- Touch-friendly tap targets (min 44px)
- iOS zoom prevention on form inputs
- Safe area insets for notched phones
- Reduced particle count on mobile for performance

### ⚡ Performance
- Google Fonts loaded asynchronously (never blocks render)
- Particles disabled below 480px width
- Particle connections disabled on mobile
- Parallax effects disabled on mobile
- All 3D tilt effects skipped on touch devices
- `prefers-reduced-motion` media query respected

---

## 📁 Project Structure

```
Tanvir_Ahammad/
│
├── index.html       ← Full website markup (893 lines)
├── style.css        ← All styles + animations + responsive (2012 lines)
├── script.js        ← All interactions + effects (471 lines)
├── myphoto.jpg      ← Profile photo (place in same folder)
├── favicon.png      ← Icon
├── music.mp3 
└── README.md
```

---

## 🗂️ Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Name, animated typing role, profile photo, CTA buttons, social links |
| 02 | **About** | Bio, animated stat counters (Projects, Languages, Problems Solved, Years) |
| 03 | **Skills** | Tabbed skill bars (Frontend / Backend / Tools) + floating tech pill cloud |
| 04 | **Projects** | 6 real project cards with mockup visuals, tags, GitHub & Live links |
| 05 | **Experience** | Vertical animated timeline (internship + education) |
| 06 | **Contact** | Info cards, social links, contact form with send animation |

---

## 🚀 Projects Showcased

| Project | Tech Stack | Links |
|---------|-----------|-------|
| **Guess The Number** | HTML, CSS, JavaScript | [GitHub](https://github.com/tanvirahammad-007/Guess-The-Number) · [Live](https://tanvirahammad-007.github.io/Guess-The-Number/) |
| **Pig Dice Game** | HTML, CSS, JavaScript | [GitHub](https://github.com/tanvirahammad-007/Pig-Dice-Game) · [Live](https://tanvirahammad-007.github.io/Pig-Dice-Game/) |
| **Words to Inspire** | HTML, CSS, JavaScript | [GitHub](https://github.com/tanvirahammad-007/Words-to-Inspire) · [Live](https://tanvirahammad-007.github.io/Words-to-Inspire/) |
| **TicTacToe — Offline** | HTML, CSS, JS, Minimax AI | [GitHub](https://github.com/tanvirahammad-007/Tic-Tac-Toe) · [Live](https://tanvirahammad-007.github.io/Tic-Tac-Toe/) |
| **TicTacToe — Online** | JavaScript, Firebase, Netlify, Render | [GitHub](https://github.com/tanvirahammad-007/Tic-Tac-Toe) · [Play](https://team-believers.netlify.app/) |
| **CodeAlpha C++ Projects** | C++, STL, OOP, Algorithms | [GitHub](https://github.com/tanvirahammad-007/CodeAlpha_Projects) |

---

## 🛠️ Tech Stack

This portfolio itself is built with:

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, grid, flexbox, media queries |
| Vanilla JavaScript (ES6+) | All interactivity, canvas particles, scroll effects |
| Google Fonts | Syne (display) · DM Mono (code) · DM Sans (body) |
| Canvas API | Animated floating particles |
| CSS Custom Properties | Design token system (colors, spacing, fonts) |
| IntersectionObserver API | Scroll reveal animations |
| RequestAnimationFrame | Smooth cursor, particle, and counter animations |

**No frameworks. No build tools. No dependencies.**

---

## 🚀 Getting Started

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/tanvirahammad-007/portfolio.git

# 2. Navigate into the folder
cd portfolio

# 3. Open in browser
# Option A: Double-click index.html
# Option B: Use VS Code Live Server extension
# Option C: Use a local server
npx serve .
```

### Deploy to GitHub Pages

```bash
# 1. Push your code to a GitHub repository

# 2. Go to Settings → Pages

# 3. Set Source to "Deploy from a branch" → main → / (root)

# 4. Your site will be live at:
#    https://yourusername.github.io/repository-name/
```

### Deploy to Netlify

```bash
# Option A: Drag & drop the folder at netlify.com/drop

# Option B: Connect your GitHub repo at netlify.com
# Build command: (leave empty)
# Publish directory: . (or your folder)
```

---

## 🎨 Customization Guide

### Change Your Name
In `index.html`, search for `Tanvir Ahammad` and replace with your name. Also update the `<title>` tag and the `<TA/>` logo initials.

### Change Your Photo
Replace `myphoto.jpg` with your own photo file. Keep the same filename, or update the `src` in `index.html`:
```html
<img src="your-photo.jpg" alt="Your Name" class="profile-photo" />
```

### Change Color Accent
In `style.css`, update the CSS variables at the top:
```css
:root {
  --accent:   #00f5d4;  /* main teal color */
  --accent-2: #7b61ff;  /* violet accent */
  --accent-3: #ff6b6b;  /* coral accent */
}
```

### Add / Edit Skills
Find the skills section in `index.html` and edit `data-width` (0–100) and the label:
```html
<div class="skill-meta">
  <span class="skill-name">Your Skill</span>
  <span class="skill-pct">80%</span>
</div>
<div class="skill-bar">
  <div class="skill-fill" data-width="80"></div>
</div>
```

### Add a New Project Card
Copy any existing project card block in `index.html` and update the title, description, tags, GitHub URL, and live URL.

### Update Contact Info
Search for `Barura, Cumilla, Bangladesh` and `tanvirahammad890@gmail.com` in `index.html` to update your location and email.

---

## 📐 CSS Architecture

```
style.css
│
├── CSS Variables (design tokens)
├── Reset & Base styles
├── Scrollbar styling
├── Loader animation
├── Custom cursor
├── Particles canvas
├── Navigation (desktop + mobile menu)
├── Layout helpers (.container, .glass, .btn)
├── Scroll reveal animations
├── Hero section
├── About section
├── Skills section (tabs + bars + pill cloud)
├── Projects section (cards + mockups)
├── Experience timeline
├── Contact section (grid + form)
├── Footer
├── Responsive — 1200px+ (large desktop)
├── Responsive — max 1024px (tablet)
├── Responsive — max 768px (mobile)
├── Responsive — max 480px (small mobile)
├── hover: none (touch devices)
└── prefers-reduced-motion (accessibility)
```

---

## ♿ Accessibility

- Semantic HTML5 elements (`<nav>`, `<section>`, `<footer>`, `<form>`)
- `aria-label` on hamburger button
- `alt` text on all images
- Minimum 44px tap targets on mobile
- `prefers-reduced-motion` disables all animations for users who prefer it
- Form labels linked to inputs via `for`/`id` attributes
- Sufficient color contrast on all text elements
- Keyboard navigation support (Escape closes mobile menu)

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

This project is open source and available under the [MIT License](LICENSE).

Feel free to use this as a template for your own portfolio — just replace the personal info, projects, and photo with your own.

---

<div align="center">
  <p>Built with ☕ and obsessive attention to detail.</p>
  <p>© 2025 Tanvir Ahammad</p>
</div>
