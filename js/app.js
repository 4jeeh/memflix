/* ==========================================================================
   MEMFLIX — Universal Memory & Celebration Streaming Platform
   Core Application Controller:
   - Dynamic URL Query Parameter Parser (?name=Name&title=Special+Title&age=20)
   - One-Click Guest Access & Profile Switcher
   - 16:9 Widescreen Carousel Renderer & My List State
   - Interactive Cinema Featurette Player & Audio Sync
   - HTML5 Canvas Finale Fireworks Engine
   ========================================================================== */

(function () {
  "use strict";

  /* --- 1. EPISODE & CATALOG DATA (16:9 WIDESCREEN) --- */
  const EPISODES_CATALOG = [
    {
      id: "ep-1",
      code: "EPISODE 1",
      shortCode: "S1:E1",
      title: "The Golden Hour",
      runtime: "24m",
      match: "99% Match",
      progress: 100,
      image: "images/golden-sunset.jpg",
      genre: "Heartwarming • Origin Story • 4K HDR",
      desc: "Where the celebration begins: golden skies, spontaneous plans, and the unmistakable spark of a chapter worth remembering forever."
    },
    {
      id: "ep-2",
      code: "EPISODE 2",
      shortCode: "S1:E2",
      title: "Midnight Cinema Club",
      runtime: "28m",
      match: "98% Match",
      progress: 82,
      image: "images/cinema-night.jpg",
      genre: "Nostalgia • Late Night • Dolby Atmos",
      desc: "Late-night conversations, favorite soundtracks, and the inside jokes that kept the whole room laughing long past midnight."
    },
    {
      id: "ep-3",
      code: "EPISODE 3",
      shortCode: "S1:E3",
      title: "Main Character Energy",
      runtime: "26m",
      match: "99% Match",
      progress: 65,
      image: "images/sparkler-celebration.jpg",
      genre: "Milestone • Spotlight • Fan Favorite",
      desc: "Stepping boldly into the spotlight, celebrating every quiet effort, personal breakthrough, and hard-earned victory along the way."
    },
    {
      id: "ep-4",
      code: "EPISODE 4",
      shortCode: "S1:E4",
      title: "Coffee & Unscripted Plans",
      runtime: "22m",
      match: "97% Match",
      progress: 45,
      image: "images/cozy-cafe.jpg",
      genre: "Slice of Life • Warmth • 4K HDR",
      desc: "The detours nobody planned that somehow turned into the warmest, most replayed conversations of the entire season."
    },
    {
      id: "ep-5",
      code: "EPISODE 5",
      shortCode: "S1:E5",
      title: "A Table for the Crew",
      runtime: "30m",
      match: "99% Match",
      progress: 30,
      image: "images/candlelight-dinner.jpg",
      genre: "Ensemble • Celebration • Director's Cut",
      desc: "Good food, raised glasses, and the circle of people who make every gathering feel like an instant classic."
    },
    {
      id: "ep-6",
      code: "EPISODE 6",
      shortCode: "S1:E6",
      title: "Starlight & New Horizons",
      runtime: "32m",
      match: "100% Match",
      progress: 15,
      image: "images/celestial-aurora.jpg",
      genre: "Season Finale • Future • IMAX Enhanced",
      desc: "Looking out toward a brand-new season filled with bigger dreams, good health, and stories waiting to be written."
    }
  ];

  const TOP10_MOMENTS = [
    {
      rank: 1,
      epId: "ep-3",
      badge: "TOP 10 • #1 TODAY",
      title: "The Year of Leveling Up",
      runtime: "26m",
      match: "99% Match",
      image: "images/sparkler-celebration.jpg",
      desc: "Every challenge met with resilience and grace, making it the #1 trending highlight of the season."
    },
    {
      rank: 2,
      epId: "ep-1",
      badge: "TOP 10 • #2 TODAY",
      title: "Golden Horizon",
      runtime: "24m",
      match: "99% Match",
      image: "images/golden-sunset.jpg",
      desc: "Chasing sunset views and turning everyday routines into cinematic widescreen memories."
    },
    {
      rank: 3,
      epId: "ep-5",
      badge: "TOP 10 • #3 TODAY",
      title: "The Inner Circle Toast",
      runtime: "30m",
      match: "98% Match",
      image: "images/candlelight-dinner.jpg",
      desc: "An evening of gratitude, shared stories, and celebrating the bonds that never fade."
    },
    {
      rank: 4,
      epId: "ep-6",
      badge: "TOP 10 • #4 TODAY",
      title: "Under the Aurora Sky",
      runtime: "32m",
      match: "97% Match",
      image: "images/celestial-aurora.jpg",
      desc: "A breathtaking visual anthology dedicated to big dreams and bright horizons ahead."
    },
    {
      rank: 5,
      epId: "ep-2",
      badge: "TOP 10 • #5 TODAY",
      title: "Midnight Encore",
      runtime: "28m",
      match: "96% Match",
      image: "images/midnight-fireworks.jpg",
      desc: "When the clock strikes midnight and the sky lights up for the grand celebration."
    }
  ];

  /* --- 2. APPLICATION STATE --- */
  const state = {
    name: "",
    title: "",
    age: "",
    activeProfileName: "Guest of Honor",
    activeProfileColor: "#E50914",
    myListIds: ["ep-1", "ep-3", "ep-5", "ep-6"],
    currentModalEpIndex: 0,
    cinemaSlideIndex: 0,
    cinemaPlaying: true,
    cinemaTimer: null,
    fwAnimationId: null,
    fwAutoTimer: null,
    fwParticles: []
  };

  /* --- 3. DYNAMIC URL PARAMETER ENGINE --- */
  function parseUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const rawName = (params.get("name") || "").trim();
    const rawTitle = (params.get("title") || "").trim();
    const rawAge = (params.get("age") || "").trim();

    state.name = rawName;
    state.title = rawTitle;
    state.age = rawAge;

    applyPersonalizationToDOM();
  }

  function applyPersonalizationToDOM() {
    const hasName = Boolean(state.name);
    const hasTitle = Boolean(state.title);
    const hasAge = Boolean(state.age);

    const displayName = hasName ? state.name : "Guest of Honor";
    const displayTitle = hasTitle ? state.title : "The Celebration Special";
    const seasonLabel = hasAge ? `SEASON ${state.age} • MILESTONE EDITION` : "LIMITED SERIES";
    const maturityLabel = hasAge ? `MILESTONE ${state.age}` : "ALL AGES";

    // Document Title
    document.title = hasName || hasTitle
      ? `${displayTitle} (${displayName}) | Memflix`
      : "Memflix | Universal Memory & Celebration Streaming Platform";

    // Login Subtitle
    const loginSub = document.getElementById("loginPersonalSubtitle");
    if (loginSub) {
      if (hasName) {
        loginSub.textContent = `Welcome to ${displayName}'s private screening room. Stream "${displayTitle}" in 4K HDR.`;
      } else {
        loginSub.textContent =
          "Stream curated memories, milestone episodes, and celebration specials in 4K HDR.";
      }
    }

    // Profiles Screen
    const profileMainName = document.getElementById("profileMainName");
    if (profileMainName) {
      profileMainName.textContent = displayName;
    }
    state.activeProfileName = displayName;
    const activeProfileLabel = document.getElementById("activeProfileLabel");
    if (activeProfileLabel) {
      activeProfileLabel.textContent = displayName;
    }

    // Billboard Hero Title
    const heroTitleDisplay = document.getElementById("heroTitleDisplay");
    if (heroTitleDisplay) {
      heroTitleDisplay.textContent = displayTitle.toUpperCase();
    }

    // Billboard Hero Top 10 Subtext
    const heroTop10Subtext = document.getElementById("heroTop10Subtext");
    if (heroTop10Subtext) {
      if (hasName && hasAge) {
        heroTop10Subtext.innerHTML = `#1 in ${escapeHtml(displayName)}'s Milestone ${escapeHtml(state.age)} Special &bull; Memflix Original`;
      } else if (hasName) {
        heroTop10Subtext.innerHTML = `#1 in ${escapeHtml(displayName)}'s Streaming Picks &bull; Memflix Original`;
      } else {
        heroTop10Subtext.innerHTML = `#1 in Celebrations &amp; Milestones &bull; Memflix Original`;
      }
    }

    // Billboard Hero Maturity & Season Badges
    const heroMaturityBadge = document.getElementById("heroMaturityBadge");
    const heroSeasonBadge = document.getElementById("heroSeasonBadge");
    if (heroMaturityBadge) heroMaturityBadge.textContent = maturityLabel;
    if (heroSeasonBadge) heroSeasonBadge.textContent = seasonLabel;

    // Billboard Hero Synopsis (Warm Universal Fallback vs Personalized)
    const heroSynopsis = document.getElementById("heroSynopsisDisplay");
    if (heroSynopsis) {
      if (hasName && hasAge) {
        heroSynopsis.textContent = `Celebrating ${displayName}'s milestone Season ${state.age} in an unforgettable anthology of shared laughter, late-night adventures, and golden memories. Here is to leveling up, staying healthy, and making this year your most iconic chapter yet.`;
      } else if (hasName) {
        heroSynopsis.textContent = `Starring ${displayName} in an unforgettable anthology of shared laughter, late-night conversations, and golden milestones. Every episode captures the moments and victories that make your story one of a kind.`;
      } else if (hasAge) {
        heroSynopsis.textContent = `Welcome to Season ${state.age}, an unforgettable anthology of shared laughter, late-night conversations, and golden milestones. Every episode captures the moments that turn ordinary days into a timeless story worth replaying.`;
      } else {
        heroSynopsis.textContent =
          "An unforgettable anthology of shared laughter, late-night conversations, and golden milestones. Every episode captures the moments, friendships, and quiet victories that turn ordinary days into a timeless story worth replaying.";
      }
    }

    // Starring Line
    const heroStarringName = document.getElementById("heroStarringName");
    if (heroStarringName) {
      heroStarringName.textContent = `${displayName}, Inner Circle & Friends`;
    }

    // Row 1 Subtitle
    const rowSeasonSubtitle = document.getElementById("rowSeasonSubtitle");
    if (rowSeasonSubtitle) {
      rowSeasonSubtitle.textContent = hasAge
        ? `Season ${state.age} Official Episode Guide`
        : "Official Episode Guide";
    }

    // Finale Screen
    const endName = document.getElementById("endName");
    const finaleMilestoneBadge = document.getElementById("finaleMilestoneBadge");
    const finaleMessageText = document.getElementById("finaleMessageText");

    if (endName) {
      endName.textContent = hasName ? state.name.toUpperCase() : "YOU";
    }
    if (finaleMilestoneBadge) {
      finaleMilestoneBadge.textContent = hasAge
        ? `SEASON ${state.age} FINALE • SPECIAL TRIBUTE`
        : "SEASON FINALE • SPECIAL TRIBUTE";
    }
    if (finaleMessageText) {
      if (hasName && hasAge) {
        finaleMessageText.textContent = `Happy Milestone ${state.age}, ${state.name}! May this new season bring bold adventures, unstoppable wins, great health, and memories worth streaming again and again.`;
      } else if (hasName) {
        finaleMessageText.textContent = `Here's to you, ${state.name}! May this next chapter bring bold adventures, unforgettable wins, good health, and stories worth streaming again and again.`;
      } else {
        finaleMessageText.textContent =
          "May this next chapter bring bold adventures, unforgettable wins, good health, and stories worth streaming again and again.";
      }
    }

    // Sync Customizer Form Inputs
    const inputName = document.getElementById("inputCustomName");
    const inputTitle = document.getElementById("inputCustomTitle");
    const inputAge = document.getElementById("inputCustomAge");
    if (inputName) inputName.value = state.name;
    if (inputTitle) inputTitle.value = state.title;
    if (inputAge) inputAge.value = state.age;
    updateShareUrlPreview();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* --- 4. RENDER 16:9 WIDESCREEN CAROUSEL ROWS --- */
  function createEpisodeCardHTML(ep, index) {
    return `
      <article
        class="episode-card-16x9"
        tabindex="0"
        role="button"
        data-ep-index="${index}"
        aria-label="${escapeHtml(ep.title)} (${escapeHtml(ep.runtime)})"
      >
        <div class="episode-thumb-wrap" style="background-image: url('${ep.image}')">
          <div class="episode-thumb-scrim"></div>
          <span class="episode-ep-tag">${escapeHtml(ep.code)}</span>
          <span class="episode-runtime-tag">${escapeHtml(ep.runtime)}</span>
          <div class="episode-play-overlay">
            <div class="episode-play-circle">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                <path d="M6 4l15 8-15 8z"></path>
              </svg>
            </div>
          </div>
          <div class="episode-progress-bar">
            <div class="episode-progress-fill" style="width: ${ep.progress}%"></div>
          </div>
        </div>
        <div class="episode-card-body">
          <div class="episode-card-meta">
            <span class="meta-match">${escapeHtml(ep.match)}</span>
            <span class="meta-hd">4K HDR</span>
          </div>
          <h3 class="episode-card-title">${escapeHtml(ep.title)}</h3>
          <p class="episode-card-desc">${escapeHtml(ep.desc)}</p>
        </div>
      </article>
    `;
  }

  function renderAllCarousels() {
    // 1. Season Highlights Row
    const epContainer = document.getElementById("carousel-episodes");
    if (epContainer) {
      epContainer.innerHTML = EPISODES_CATALOG.map((ep, idx) =>
        createEpisodeCardHTML(ep, idx)
      ).join("");
    }

    // 2. Top 10 Moments Row
    const top10Container = document.getElementById("carousel-top10");
    if (top10Container) {
      top10Container.innerHTML = TOP10_MOMENTS.map((item) => {
        const epIndex = EPISODES_CATALOG.findIndex((e) => e.id === item.epId);
        return `
          <div
            class="top10-card-item"
            tabindex="0"
            role="button"
            data-ep-index="${epIndex >= 0 ? epIndex : 0}"
            aria-label="Top ${item.rank}: ${escapeHtml(item.title)}"
          >
            <div class="top10-rank-num" aria-hidden="true">${item.rank}</div>
            <div class="episode-card-16x9">
              <div class="episode-thumb-wrap" style="background-image: url('${item.image}')">
                <div class="episode-thumb-scrim"></div>
                <span class="episode-ep-tag">${escapeHtml(item.badge)}</span>
                <span class="episode-runtime-tag">${escapeHtml(item.runtime)}</span>
                <div class="episode-play-overlay">
                  <div class="episode-play-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path d="M6 4l15 8-15 8z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="episode-card-body">
                <div class="episode-card-meta">
                  <span class="meta-match">${escapeHtml(item.match)}</span>
                  <span class="meta-hd">TOP 10</span>
                </div>
                <h3 class="episode-card-title">${escapeHtml(item.title)}</h3>
                <p class="episode-card-desc">${escapeHtml(item.desc)}</p>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    // 3. My List Row
    renderMyListCarousel();
    bindCardClickEvents();
  }

  function renderMyListCarousel() {
    const myListContainer = document.getElementById("carousel-mylist");
    const countBadge = document.getElementById("myListCountBadge");
    const savedEpisodes = EPISODES_CATALOG.filter((ep) =>
      state.myListIds.includes(ep.id)
    );

    if (countBadge) {
      countBadge.textContent = String(savedEpisodes.length);
    }

    if (!myListContainer) return;

    if (savedEpisodes.length === 0) {
      myListContainer.innerHTML = `
        <div style="padding: 28px; color: var(--nf-muted); border: 1px dashed rgba(255,255,255,0.15); border-radius: 6px; width: 100%;">
          Your list is currently empty. Click any episode and select <strong>+ My List</strong> to save keepsakes here.
        </div>
      `;
      return;
    }

    myListContainer.innerHTML = savedEpisodes
      .map((ep) => {
        const originalIdx = EPISODES_CATALOG.findIndex((item) => item.id === ep.id);
        return createEpisodeCardHTML(ep, originalIdx);
      })
      .join("");
  }

  function bindCardClickEvents() {
    document.querySelectorAll("[data-ep-index]").forEach((card) => {
      card.onclick = () => {
        const idx = parseInt(card.getAttribute("data-ep-index"), 10) || 0;
        openEpisodeModal(idx);
      };
      card.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const idx = parseInt(card.getAttribute("data-ep-index"), 10) || 0;
          openEpisodeModal(idx);
        }
      };
    });
  }

  /* --- 5. PAGE NAVIGATION & SPA ROUTER --- */
  function showPage(pageId) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add("active");
    }
    window.scrollTo({ top: 0, behavior: "instant" });

    const header = document.getElementById("mainHeader");
    if (header) {
      header.style.display = pageId === "page-login" ? "none" : "flex";
    }

    if (pageId === "page-finale") {
      startFireworks();
    } else {
      stopFireworks();
    }

    if (pageId !== "page-video") {
      stopCinemaTimer();
    }
  }

  /* --- 6. SOUND EFFECTS (NETFLIX TUDUM SYNTH) & AMBIENT BGM --- */
  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.volume = 0.42;
  }

  function updateAudioUI(isPlaying) {
    const iconOn = document.getElementById("iconSoundOn");
    const iconOff = document.getElementById("iconSoundOff");
    const label = document.getElementById("audioStatusLabel");
    if (iconOn) iconOn.style.display = isPlaying ? "inline-block" : "none";
    if (iconOff) iconOff.style.display = isPlaying ? "none" : "inline-block";
    if (label) label.textContent = isPlaying ? "Sound On" : "Sound Off";
  }

  function tryPlayBGM() {
    if (!bgm) return;
    bgm
      .play()
      .then(() => updateAudioUI(true))
      .catch(() => updateAudioUI(false));
  }

  function playTudum() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Double low-end drum impact + harmonic shimmer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "triangle";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(110, now);
      osc1.frequency.exponentialRampToValueAtTime(55, now + 0.18);
      osc1.frequency.setValueAtTime(165, now + 0.2);
      osc1.frequency.exponentialRampToValueAtTime(82.4, now + 0.75);

      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.setValueAtTime(330, now + 0.2);

      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.85);
      osc2.stop(now + 0.85);
    } catch (_) {
      // Ignore if AudioContext is restricted
    }
  }

  /* --- 7. EPISODE / MORE INFO MODAL --- */
  const epModal = document.getElementById("epModal");

  function openEpisodeModal(index) {
    const safeIdx = ((index % EPISODES_CATALOG.length) + EPISODES_CATALOG.length) % EPISODES_CATALOG.length;
    state.currentModalEpIndex = safeIdx;
    const ep = EPISODES_CATALOG[safeIdx];

    const modalMedia = document.getElementById("modalMedia");
    const modalEpCode = document.getElementById("modalEpCode");
    const modalTitle = document.getElementById("modalTitle");
    const modalMatch = document.getElementById("modalMatch");
    const modalDuration = document.getElementById("modalDuration");
    const modalDesc = document.getElementById("modalDesc");
    const modalStarring = document.getElementById("modalStarring");
    const modalGenre = document.getElementById("modalGenre");
    const modalToggleListLabel = document.getElementById("modalToggleListLabel");

    const displayName = state.name || "Guest of Honor";

    if (modalMedia) modalMedia.style.backgroundImage = `url('${ep.image}')`;
    if (modalEpCode) {
      const seasonPrefix = state.age ? `SEASON ${state.age}` : "SEASON 1";
      modalEpCode.textContent = `${seasonPrefix} • ${ep.code} • 4K HDR`;
    }
    if (modalTitle) modalTitle.textContent = ep.title;
    if (modalMatch) modalMatch.textContent = ep.match;
    if (modalDuration) modalDuration.textContent = ep.runtime;
    if (modalDesc) modalDesc.textContent = ep.desc;
    if (modalStarring) modalStarring.textContent = `${displayName}, Inner Circle & Friends`;
    if (modalGenre) modalGenre.textContent = ep.genre;

    if (modalToggleListLabel) {
      const inList = state.myListIds.includes(ep.id);
      modalToggleListLabel.textContent = inList ? "Saved in My List" : "+ My List";
    }

    if (epModal) {
      epModal.classList.add("show");
      epModal.setAttribute("aria-hidden", "false");
    }
  }

  function closeEpisodeModal() {
    if (epModal) {
      epModal.classList.remove("show");
      epModal.setAttribute("aria-hidden", "true");
    }
  }

  /* --- 8. INTERACTIVE CINEMA FEATURETTE PLAYER --- */
  function getCinemaChapters() {
    const honoree = state.name || "Guest of Honor";
    const featureTitle = state.title || "The Celebration Special";
    const ageTag = state.age ? `Season ${state.age}` : "Season 1";

    return [
      {
        chapter: `CHAPTER 1 OF 4 • ${ageTag.toUpperCase()} OPENING`,
        title: featureTitle.toUpperCase(),
        subtitle: `Starring ${honoree} — "Every unforgettable season starts with a spark worth celebrating."`,
        image: "images/sparkler-celebration.jpg"
      },
      {
        chapter: "CHAPTER 2 OF 4 • CORE MEMORIES",
        title: "THE GOLDEN HOUR CHRONICLES",
        subtitle: `"From spontaneous coffee runs to sunset drives, the best moments were never scripted."`,
        image: "images/golden-sunset.jpg"
      },
      {
        chapter: "CHAPTER 3 OF 4 • THE INNER CIRCLE",
        title: "A TABLE FOR THE CREW",
        subtitle: `"Surrounded by laughter, late-night stories, and the people who always have your back."`,
        image: "images/candlelight-dinner.jpg"
      },
      {
        chapter: "CHAPTER 4 OF 4 • NEW HORIZONS",
        title: "BRIGHTER SKIES AHEAD",
        subtitle: `"Here is to big wins, good health, and a brand-new chapter of possibilities for ${honoree}."`,
        image: "images/celestial-aurora.jpg"
      }
    ];
  }

  function renderCinemaSlide(index) {
    const chapters = getCinemaChapters();
    const overlay = document.getElementById("videoOverlay");

    if (index >= chapters.length) {
      stopCinemaTimer();
      if (overlay) overlay.classList.add("show");
      return;
    }

    if (overlay) overlay.classList.remove("show");
    state.cinemaSlideIndex = Math.max(0, index);
    const current = chapters[state.cinemaSlideIndex];

    const bg = document.getElementById("cinemaSlideBg");
    const pill = document.getElementById("cinemaChapterPill");
    const title = document.getElementById("cinemaSlideTitle");
    const sub = document.getElementById("cinemaSlideSubtitle");
    const fill = document.getElementById("cinemaProgressFill");
    const timecode = document.getElementById("cinemaTimecode");
    const playerFeatureTitle = document.getElementById("playerFeatureTitle");

    if (bg) bg.style.backgroundImage = `url('${current.image}')`;
    if (pill) pill.textContent = current.chapter;
    if (title) title.textContent = current.title;
    if (sub) sub.textContent = current.subtitle;
    if (playerFeatureTitle) {
      playerFeatureTitle.textContent = `Now Playing: ${state.title || "The Celebration Special"}`;
    }

    const pct = Math.round(((state.cinemaSlideIndex + 1) / chapters.length) * 100);
    if (fill) fill.style.width = `${pct}%`;
    if (timecode) {
      timecode.textContent = `0${state.cinemaSlideIndex + 1} / 0${chapters.length}`;
    }
  }

  function startCinemaPlayer(startChapterIndex = 0) {
    closeEpisodeModal();
    showPage("page-video");
    state.cinemaPlaying = true;
    const playPauseLabel = document.getElementById("cinemaPlayPauseLabel");
    if (playPauseLabel) playPauseLabel.textContent = "Pause";

    renderCinemaSlide(startChapterIndex);
    startCinemaTimer();
  }

  function startCinemaTimer() {
    stopCinemaTimer();
    state.cinemaTimer = setInterval(() => {
      if (!state.cinemaPlaying) return;
      renderCinemaSlide(state.cinemaSlideIndex + 1);
    }, 4500);
  }

  function stopCinemaTimer() {
    if (state.cinemaTimer) {
      clearInterval(state.cinemaTimer);
      state.cinemaTimer = null;
    }
  }

  /* --- 9. GRAND FINALE FIREWORKS ENGINE (HTML5 CANVAS) --- */
  const canvas = document.getElementById("fwCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const FW_COLORS = [
    "229, 9, 20",     // Official Netflix Red
    "255, 255, 255",  // Crisp White
    "251, 191, 36",   // Warm Gold
    "244, 63, 94",    // Crimson Rose
    "70, 211, 105"    // Match Emerald
  ];

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function spawnFireworkBurst(customX, customY) {
    if (!canvas) return;
    const x = typeof customX === "number" ? customX : canvas.width * (0.2 + Math.random() * 0.6);
    const y = typeof customY === "number" ? customY : canvas.height * (0.15 + Math.random() * 0.45);
    const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];

    for (let i = 0; i < 42; i++) {
      const angle = (Math.PI * 2 * i) / 42 + (Math.random() - 0.5) * 0.2;
      const speed = 1.6 + Math.random() * 4.2;
      state.fwParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: 2 + Math.random() * 2.5,
        color
      });
    }
  }

  function startFireworks() {
    if (!canvas || !ctx) return;
    stopFireworks();
    resizeCanvas();

    // Initial celebratory salvo
    spawnFireworkBurst(canvas.width * 0.3, canvas.height * 0.3);
    spawnFireworkBurst(canvas.width * 0.7, canvas.height * 0.28);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = state.fwParticles.length - 1; i >= 0; i--) {
        const p = state.fwParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= 0.012;

        if (p.alpha <= 0) {
          state.fwParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      state.fwAnimationId = requestAnimationFrame(animate);
    }

    animate();
    state.fwAutoTimer = setInterval(() => {
      spawnFireworkBurst();
    }, 900);
  }

  function stopFireworks() {
    if (state.fwAnimationId) {
      cancelAnimationFrame(state.fwAnimationId);
      state.fwAnimationId = null;
    }
    if (state.fwAutoTimer) {
      clearInterval(state.fwAutoTimer);
      state.fwAutoTimer = null;
    }
    state.fwParticles = [];
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* --- 10. URL CUSTOMIZER & SHARE GENERATOR --- */
  const customizerModal = document.getElementById("customizerModal");

  function openCustomizerModal() {
    if (!customizerModal) return;
    updateShareUrlPreview();
    customizerModal.classList.add("show");
    customizerModal.setAttribute("aria-hidden", "false");
  }

  function closeCustomizerModal() {
    if (!customizerModal) return;
    customizerModal.classList.remove("show");
    customizerModal.setAttribute("aria-hidden", "true");
    const feedback = document.getElementById("copyFeedbackMsg");
    if (feedback) feedback.textContent = "";
  }

  function buildQueryStringFromInputs() {
    const nameVal = (document.getElementById("inputCustomName")?.value || "").trim();
    const titleVal = (document.getElementById("inputCustomTitle")?.value || "").trim();
    const ageVal = (document.getElementById("inputCustomAge")?.value || "").trim();

    const params = new URLSearchParams();
    if (nameVal) params.set("name", nameVal);
    if (titleVal) params.set("title", titleVal);
    if (ageVal) params.set("age", ageVal);

    return { nameVal, titleVal, ageVal, query: params.toString() };
  }

  function updateShareUrlPreview() {
    const previewEl = document.getElementById("shareUrlPreview");
    if (!previewEl) return;
    const { query } = buildQueryStringFromInputs();
    const baseUrl = window.location.origin && window.location.origin !== "null"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://4jeeh.github.io/memflix/";
    previewEl.textContent = query ? `${baseUrl}?${query}` : baseUrl;
  }

  /* --- 11. EVENT LISTENERS & INITIALIZATION --- */
  function initEventListeners() {
    // Scroll header elevation
    window.addEventListener("scroll", () => {
      const header = document.getElementById("mainHeader");
      if (!header) return;
      if (window.scrollY > 24) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });

    // 1. One-Click Guest Access Demo Button
    const guestAccessBtn = document.getElementById("guestAccessBtn");
    if (guestAccessBtn) {
      guestAccessBtn.addEventListener("click", () => {
        playTudum();
        tryPlayBGM();
        showPage("page-profiles");
      });
    }

    // 2. Login Form Submit (Universal Access)
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        playTudum();
        tryPlayBGM();
        showPage("page-profiles");
      });
    }

    // 3. Profile Cards Selection -> Enter Streaming Dashboard
    document.querySelectorAll(".profile-card").forEach((card) => {
      card.addEventListener("click", () => {
        playTudum();
        const role = card.getAttribute("data-profile-role");
        const customLabel = card.getAttribute("data-profile-label");
        const dot = document.getElementById("activeProfileDot");
        const label = document.getElementById("activeProfileLabel");

        if (role === "honoree") {
          state.activeProfileName = state.name || "Guest of Honor";
          state.activeProfileColor = "#E50914";
        } else if (role === "friends") {
          state.activeProfileName = customLabel || "Inner Circle";
          state.activeProfileColor = "#0063e5";
        } else if (role === "family") {
          state.activeProfileName = customLabel || "Family & VIPs";
          state.activeProfileColor = "#d97706";
        } else {
          state.activeProfileName = customLabel || "Guest Viewer";
          state.activeProfileColor = "#10b981";
        }

        if (dot) dot.style.background = state.activeProfileColor;
        if (label) label.textContent = state.activeProfileName;

        showPage("page-browse");
      });
    });

    // Back to Sign In from Profiles
    document.getElementById("backToLoginBtn")?.addEventListener("click", () => {
      showPage("page-login");
    });

    // Header Navigation Links
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-nav]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const navTarget = btn.getAttribute("data-nav");

        if (navTarget === "finale") {
          showPage("page-finale");
          return;
        }

        showPage("page-browse");
        if (navTarget === "episodes") {
          document.getElementById("row-episodes")?.scrollIntoView({ behavior: "smooth" });
        } else if (navTarget === "top10") {
          document.getElementById("row-top10")?.scrollIntoView({ behavior: "smooth" });
        } else if (navTarget === "mylist") {
          document.getElementById("row-mylist")?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Brand Logo Click -> Browse
    document.getElementById("brandLogoBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      showPage("page-browse");
    });

    // Header Profile Switcher -> Profiles Page
    document.getElementById("headerProfileBtn")?.addEventListener("click", () => {
      showPage("page-profiles");
    });

    // Music Toggle Button
    document.getElementById("musicToggle")?.addEventListener("click", () => {
      if (!bgm) return;
      if (bgm.paused) {
        bgm.play().then(() => updateAudioUI(true)).catch(() => updateAudioUI(false));
      } else {
        bgm.pause();
        updateAudioUI(false);
      }
    });

    // Hero Play & More Info Buttons
    document.getElementById("heroPlayBtn")?.addEventListener("click", () => {
      startCinemaPlayer(0);
    });

    document.getElementById("heroMoreInfoBtn")?.addEventListener("click", () => {
      openEpisodeModal(0);
    });

    // Horizontal Carousel Scroll Arrows
    document.querySelectorAll(".row-arrow").forEach((arrow) => {
      arrow.addEventListener("click", () => {
        const targetId = arrow.getAttribute("data-scroll-target");
        const dir = parseInt(arrow.getAttribute("data-dir"), 10) || 1;
        const track = document.getElementById(targetId);
        if (track) {
          track.scrollBy({ left: dir * 620, behavior: "smooth" });
        }
      });
    });

    // Episode Modal Controls
    document.getElementById("modalClose")?.addEventListener("click", closeEpisodeModal);
    document.getElementById("modalPlayEpBtn")?.addEventListener("click", () => {
      startCinemaPlayer(state.currentModalEpIndex % 4);
    });
    document.getElementById("modalNext")?.addEventListener("click", () => {
      openEpisodeModal(state.currentModalEpIndex + 1);
    });
    document.getElementById("modalToggleListBtn")?.addEventListener("click", () => {
      const ep = EPISODES_CATALOG[state.currentModalEpIndex];
      if (!ep) return;
      const idx = state.myListIds.indexOf(ep.id);
      if (idx >= 0) {
        state.myListIds.splice(idx, 1);
      } else {
        state.myListIds.push(ep.id);
      }
      const label = document.getElementById("modalToggleListLabel");
      if (label) {
        label.textContent = state.myListIds.includes(ep.id) ? "Saved in My List" : "+ My List";
      }
      renderMyListCarousel();
      bindCardClickEvents();
    });

    // Cinema Player Controls
    document.getElementById("playerBackBtn")?.addEventListener("click", () => {
      showPage("page-browse");
    });
    document.getElementById("playerSkipToFinaleBtn")?.addEventListener("click", () => {
      showPage("page-finale");
    });
    document.getElementById("cinemaPlayPauseBtn")?.addEventListener("click", () => {
      state.cinemaPlaying = !state.cinemaPlaying;
      const label = document.getElementById("cinemaPlayPauseLabel");
      if (label) label.textContent = state.cinemaPlaying ? "Pause" : "Play";
    });
    document.getElementById("cinemaPrevSceneBtn")?.addEventListener("click", () => {
      renderCinemaSlide(Math.max(0, state.cinemaSlideIndex - 1));
    });
    document.getElementById("cinemaNextSceneBtn")?.addEventListener("click", () => {
      renderCinemaSlide(state.cinemaSlideIndex + 1);
    });
    document.getElementById("videoReplay")?.addEventListener("click", () => {
      startCinemaPlayer(0);
    });
    document.getElementById("videoBack")?.addEventListener("click", () => {
      showPage("page-browse");
    });
    document.getElementById("toNextEp")?.addEventListener("click", () => {
      showPage("page-finale");
    });

    // Finale Screen Controls
    document.getElementById("launchBurstBtn")?.addEventListener("click", () => {
      playTudum();
      for (let i = 0; i < 4; i++) {
        setTimeout(() => spawnFireworkBurst(), i * 160);
      }
    });
    document.getElementById("finaleShareBtn")?.addEventListener("click", openCustomizerModal);
    document.getElementById("endingHome")?.addEventListener("click", () => {
      showPage("page-browse");
    });

    // Footer Buttons
    document.getElementById("footerCustomizeBtn")?.addEventListener("click", openCustomizerModal);
    document.getElementById("footerProfilesBtn")?.addEventListener("click", () => {
      showPage("page-profiles");
    });
    document.getElementById("footerFinaleBtn")?.addEventListener("click", () => {
      showPage("page-finale");
    });

    // URL Customizer Open/Close & Live Preview
    document.getElementById("openCustomizerBtn")?.addEventListener("click", openCustomizerModal);
    document.getElementById("loginCustomizeBtn")?.addEventListener("click", openCustomizerModal);
    document.getElementById("manageProfilesBtn")?.addEventListener("click", openCustomizerModal);
    document.getElementById("closeCustomizerBtn")?.addEventListener("click", closeCustomizerModal);

    ["inputCustomName", "inputCustomTitle", "inputCustomAge"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateShareUrlPreview);
    });

    document.getElementById("customizerForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const { nameVal, titleVal, ageVal, query } = buildQueryStringFromInputs();
      state.name = nameVal;
      state.title = titleVal;
      state.age = ageVal;

      const newRelativeUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;
      window.history.replaceState({}, "", newRelativeUrl);

      applyPersonalizationToDOM();

      const previewText = document.getElementById("shareUrlPreview")?.textContent || window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(previewText).catch(() => {});
      }

      const feedback = document.getElementById("copyFeedbackMsg");
      if (feedback) {
        feedback.textContent = "Celebration parameters applied and shareable URL copied!";
      }
    });

    document.getElementById("resetDefaultParamsBtn")?.addEventListener("click", () => {
      state.name = "";
      state.title = "";
      state.age = "";
      window.history.replaceState({}, "", window.location.pathname);
      applyPersonalizationToDOM();
      const feedback = document.getElementById("copyFeedbackMsg");
      if (feedback) {
        feedback.textContent = "Reset to universal celebration defaults.";
      }
    });

    // Close modals on backdrop click or Escape key
    window.addEventListener("click", (e) => {
      if (e.target === epModal) closeEpisodeModal();
      if (e.target === customizerModal) closeCustomizerModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeEpisodeModal();
        closeCustomizerModal();
      }
    });
  }

  /* --- BOOTSTRAP --- */
  parseUrlParameters();
  renderAllCarousels();
  initEventListeners();
})();
