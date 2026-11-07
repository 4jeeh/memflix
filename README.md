<div align="center">

# 🎬 MEMFLIX

**Universal Memory & Celebration Streaming Platform in Authentic Netflix UI**

[![License: MIT](https://img.shields.io/badge/License-MIT-E50914.svg?style=for-the-badge&labelColor=141414)](./LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3_Streaming_UI-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=141414)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<p align="center">
  <em>"Turn any birthday, milestone, or friendship anthology into an interactive 4K celebration streaming special—personalized instantaneously via URL parameters."</em>
</p>

[🔗 **URL Customization Guide**](#-dynamic-url-customization) · [🚀 **Quick Start**](#-quick-start-local-development)

</div>

---

## ✨ Overview

**Memflix** is a zero-backend, universal memory and celebration streaming web application crafted in the authentic **Netflix Streaming UI** aesthetic: **Pitch Black (`#141414` & `#000000`)**, **Official Netflix Red (`#E50914`)**, and **Muted Gray (`#AAAAAA`)**, paired with **Bebas Neue** display typography and **Plus Jakarta Sans / Inter** UI controls.

Anyone visiting from GitHub can jump straight in via the **Guest Access / One-Click Demo** button on the sign-in screen—no password guessing required—or personalize the entire platform on the fly using URL query parameters (`?name=Name&title=Special+Title&age=20`).

---

## 🎨 Authentic Streaming UI Highlights

- **Official Netflix Color System & Typography:**
  - **Pitch Black Canvas:** `#141414` & `#000000`
  - **Official Netflix Red:** `#E50914` (`M` series ribbon, `TOP 10` badge, progress bars, and primary CTAs)
  - **Muted Gray Metadata:** `#AAAAAA` paired with `#46D369` (`99% Match` indicator)
  - **Typography:** `Bebas Neue` for the brand wordmark, billboard hero title, and episode headers; `Plus Jakarta Sans` & `Inter` for synopses and interface labels.
- **Guest Access / One-Click Demo:** Instant one-click entry from the Sign-In screen (`▶ Guest Access / One-Click Demo`) so evaluators and visitors never need to guess a password.
- **Interactive "Who's Watching?" Profile Selector:** Four viewer profiles (`Guest of Honor` dynamically named via `?name=`, `Inner Circle`, `Family & VIPs`, and `Guest Viewer`) with synthesized `TUDUM` sound effects.
- **Cinematic Billboard Hero:** Wide banner with multi-layered dark bottom vignette, **TOP 10 TODAY** badge, thick white **Play** button, and semi-transparent **More Info** button.
- **16:9 Widescreen Horizontal Row Carousels:**
  - **Season Highlights (Official Episode Guide):** Six 16:9 widescreen episode cards with smooth hover zoom, runtime badges, red playback progress bars, and full episode synopses.
  - **Top 10 Moments Today:** Widescreen cards paired with giant outlined rank numerals (`1`–`5`).
  - **My List (Saved Celebration Specials):** Interactive watchlist where users can add or remove episodes dynamically.
- **Interactive Cinema Featurette Player & Finale Fireworks:** Built-in 4-chapter widescreen visual story reel and an HTML5 Canvas finale fireworks show—requiring zero heavy video files.

---

## 🔗 Dynamic URL Customization

Personalize **Memflix** for any recipient, occasion, or milestone age by appending URL query parameters:

| Parameter | Description | Default Fallback (When Omitted) | Example |
| :--- | :--- | :--- | :--- |
| `?name=` | Honoree's name displayed in the primary profile, starring credits, synopsis, and grand finale | `Guest of Honor` / `YOU` | `?name=Alex` |
| `?title=` | Main feature title displayed on the Billboard Hero and Cinema Player | `The Celebration Special` | `?title=The+Birthday+Special` |
| `?age=` | Milestone age or season number displayed in metadata badges and finale tribute | `LIMITED SERIES` / `ALL AGES` | `?age=20` |

### Example Shareable Links

- **Universal Default (No Parameters):**
  ```text
  https://<your-username>.github.io/memflix/
  ```
  *Displays **"The Celebration Special"** with a warm universal celebration synopsis.*

- **Personalized Celebration Link:**
  ```text
  https://<your-username>.github.io/memflix/?name=Alex&title=The+Birthday+Special&age=20
  ```
  *Displays **"THE BIRTHDAY SPECIAL"**, starring **Alex**, with **SEASON 20 • MILESTONE EDITION** badges.*

- **Built-In URL Studio:**
  Click **Personalize URL** in the top navigation bar at any time to customize `name`, `title`, and `age` interactively and copy the generated link in one click.

---

## 📂 Project Structure

```text
memflix/
├── audio/
│   └── ambient-theme.mp3           # Lightweight celebration ambient soundtrack (~500 KB)
├── css/
│   └── style.css                   # Authentic Netflix Streaming UI design system (#141414, #E50914)
├── images/
│   ├── candlelight-dinner.jpg      # 16:9 widescreen episode artwork (Ep 5: A Table for the Crew)
│   ├── celestial-aurora.jpg        # 16:9 widescreen episode artwork (Ep 6: Starlight & New Horizons)
│   ├── cinema-night.jpg            # 16:9 widescreen episode artwork (Ep 2: Midnight Cinema Club)
│   ├── cozy-cafe.jpg               # 16:9 widescreen episode artwork (Ep 4: Coffee & Unscripted Plans)
│   ├── favicon.svg                 # Custom Netflix-style 'M' ribbon vector icon
│   ├── golden-sunset.jpg           # 16:9 widescreen episode artwork (Ep 1: The Golden Hour)
│   ├── midnight-fireworks.jpg      # Sign-In & Finale widescreen backdrop
│   ├── sparkler-celebration.jpg    # Billboard Hero & Ep 3 widescreen artwork
│   └── starry-sky.jpg              # Ambient widescreen background asset
├── js/
│   └── app.js                      # URL parser, SPA router, 16:9 carousels, cinema player & fireworks
├── .gitignore                      # Standard web Git ignore rules
├── index.html                      # Main SPA entry point (Login, Profiles, Browse, Player, Finale)
├── LICENSE                         # Official MIT License
└── README.md                       # Project documentation
```

---

## 🚀 Quick Start (Local Development)

**Memflix** is built with pure HTML5, CSS3, and Vanilla JavaScript—zero build steps or external dependencies required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/4jeeh/memflix.git
   cd memflix
   ```

2. **Start a local HTTP server:**
   ```bash
   # Using Python 3
   python -m http.server 8080
   ```
   *(Or use `npx serve .` / VS Code Live Server)*

3. **Open in your browser:**
   - Universal Default: `http://localhost:8080`
   - Personalized Demo: `http://localhost:8080/?name=Alex&title=The+Birthday+Special&age=20`

---

## 🌐 Deploying to GitHub Pages

1. Push the repository to GitHub (`https://github.com/4jeeh/memflix`).
2. Navigate to **Settings** → **Pages** in your GitHub repository.
3. Under **Build and deployment**, select **Deploy from a branch** (`main` / `/ (root)`).
4. Your live streaming platform will be published at:
   ```text
   https://<your-username>.github.io/memflix/
   ```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.