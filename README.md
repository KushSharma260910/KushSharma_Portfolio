# 🚀 Kush Sharma — Personal Portfolio Website

A  responsive, and interactive personal portfolio website built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Main HTML structure
├── style.css        # All styling and animations
├── script.js        # JavaScript interactions
├── resume.pdf       # Your resume (place in same folder)
└── README.md        # You're reading this!
```

---

## ✨ Features

- **Intro / Welcome Screen** — Animated splash screen with floating particles
- **Sticky Navbar** — Frosted glass effect on scroll with active section highlighting
- **Dark / Light Mode** — Toggle with preference saved to localStorage
- **Smooth Scrolling** — All nav links scroll smoothly to sections
- **Scroll Animations** — Fade-in and slide-up effects as sections enter the viewport
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **Project Cards** — Hover effects with gradient border and glow; links to GitHub
- **Skills Badges** — Pill-style badges with hover animations
- **Education Timeline** — Animated vertical timeline layout
- **Contact Section** — Direct links to Email, GitHub, and LinkedIn
- **Resume Download** — Opens your PDF resume directly

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure and markup |
| CSS3 | Styling, animations, glassmorphism, gradients |
| JavaScript (Vanilla) | Interactivity, scroll effects, dark mode |
| Google Fonts | Syne (display) + Space Mono (monospace) |

---

## 🚀 Getting Started

1. **Clone or download** this repository
2. Place your `resume.pdf` in the same folder
3. Open `index.html` in any modern browser

```bash
git clone https://github.com/KushSharma260910/portfolio.git
cd portfolio
# Open index.html in your browser
```

> No build tools, no npm install, no setup required.

---

## 🎨 Customization

### Change accent colors
In `style.css`, update the CSS variables at the top:
```css
:root {
  --accent: #38d9f5;   /* Teal */
  --accent2: #a855f7;  /* Purple */
}
```

### Update your details
Edit the relevant sections in `index.html`:
- **About** — Update bio text and stats
- **Skills** — Add or remove skill badges
- **Projects** — Add project cards with descriptions
- **Contact** — Update email, GitHub, LinkedIn links

### Add a project link
Find the project card in `index.html` and update the `onclick`:
```html
<span class="btn-view" onclick="window.open('YOUR_GITHUB_REPO_URL', '_blank')">View Project →</span>
```

---

## 📬 Contact

| Platform | Link |
|----------|------|
| 📧 Email | sharmakush2609@gmail.com |
| 🐙 GitHub | [KushSharma260910](https://github.com/KushSharma260910) |
| 💼 LinkedIn | [kush-sharma-170097306](https://www.linkedin.com/in/kush-sharma-170097306) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Designed & Built by **Kush Sharma** · 2026
