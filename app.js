/**
 * AETHER — Master Application Engine
 * Premium Personal Dashboard & Smart TV Experience
 * Supports desktop computers and LG webOS TV environments
 */

(function () {
  'use strict';

  // =========================================================================
  // Storage Keys & Constants
  // =========================================================================

  const STORAGE = {
    APPS: 'aether_apps_v3',
    CATEGORIES: 'aether_categories_v3',
    SETTINGS: 'aether_settings_v3',
    WALLPAPER: 'aether_wallpaper_v3',
    NOTES: 'aether_notes_v3'
  };

  const THEMES = ['alpine', 'pacific', 'metropolitan', 'horizon', 'monochrome'];

  const WALLPAPERS = [
    { id: 'alpine', title: 'Alpine Sunset Ridge', file: 'assets/wallpapers/alpine.jpg' },
    { id: 'pacific', title: 'Pacific Coast Mist', file: 'assets/wallpapers/pacific.jpg' },
    { id: 'metropolitan', title: 'Metropolitan Night', file: 'assets/wallpapers/metropolitan.jpg' },
    { id: 'horizon', title: 'Golden Horizon Sky', file: 'assets/wallpapers/horizon.jpg' },
    { id: 'monochrome', title: 'Obsidian Minimalist', file: 'assets/wallpapers/monochrome.jpg' },
    { id: 'ambient_dark', title: 'Ethereal Starfield', file: 'assets/wallpapers/ambient_dark.jpg' }
  ];

  const DEFAULT_CATEGORIES = [
    { id: 'all', name: 'All Applications', icon: 'layers' },
    { id: 'favorites', name: 'Favorites & Pinned', icon: 'star' },
    { id: 'streaming', name: 'Media & Streaming', icon: 'tv' },
    { id: 'dev', name: 'Dev & Workspace', icon: 'terminal' },
    { id: 'ai', name: 'AI & Research', icon: 'cpu' },
    { id: 'social', name: 'Social & Chat', icon: 'message-circle' },
    { id: 'tools', name: 'Tools & Utilities', icon: 'wrench' }
  ];

  // Pre-loaded applications with both Web URLs and LG webOS native App IDs
  const DEFAULT_APPS = [
    {
      id: 'app-youtube',
      title: 'YouTube',
      url: 'https://youtube.com',
      tvAppId: 'youtube.leanback.v4',
      category: 'streaming',
      icon: 'play',
      color: 'pink',
      pinned: true,
      createdAt: 1000
    },
    {
      id: 'app-netflix',
      title: 'Netflix',
      url: 'https://netflix.com',
      tvAppId: 'netflix',
      category: 'streaming',
      icon: 'film',
      color: 'pink',
      pinned: true,
      createdAt: 2000
    },
    {
      id: 'app-appletv',
      title: 'Apple TV',
      url: 'https://tv.apple.com',
      tvAppId: 'com.apple.appletv',
      category: 'streaming',
      icon: 'tv',
      color: 'cyan',
      pinned: true,
      createdAt: 3000
    },
    {
      id: 'app-prime',
      title: 'Prime Video',
      url: 'https://amazon.com/video',
      tvAppId: 'amazon',
      category: 'streaming',
      icon: 'video',
      color: 'cyan',
      pinned: true,
      createdAt: 4000
    },
    {
      id: 'app-spotify',
      title: 'Spotify',
      url: 'https://open.spotify.com',
      tvAppId: 'spotify-mediamachine',
      category: 'streaming',
      icon: 'music',
      color: 'green',
      pinned: true,
      createdAt: 5000
    },
    {
      id: 'app-twitch',
      title: 'Twitch',
      url: 'https://twitch.tv',
      tvAppId: 'com.google.android.apps.twitch',
      category: 'streaming',
      icon: 'gamepad-2',
      color: 'purple',
      pinned: false,
      createdAt: 6000
    },
    {
      id: 'app-github',
      title: 'GitHub',
      url: 'https://github.com',
      tvAppId: '',
      category: 'dev',
      icon: 'github',
      color: 'purple',
      pinned: true,
      createdAt: 7000
    },
    {
      id: 'app-chatgpt',
      title: 'ChatGPT',
      url: 'https://chatgpt.com',
      tvAppId: '',
      category: 'ai',
      icon: 'sparkles',
      color: 'green',
      pinned: true,
      createdAt: 8000
    },
    {
      id: 'app-claude',
      title: 'Claude AI',
      url: 'https://claude.ai',
      tvAppId: '',
      category: 'ai',
      icon: 'cpu',
      color: 'orange',
      pinned: false,
      createdAt: 9000
    },
    {
      id: 'app-gemini',
      title: 'Google Gemini',
      url: 'https://gemini.google.com',
      tvAppId: '',
      category: 'ai',
      icon: 'bot',
      color: 'blue',
      pinned: false,
      createdAt: 10000
    },
    {
      id: 'app-x',
      title: 'X (Twitter)',
      url: 'https://x.com',
      tvAppId: '',
      category: 'social',
      icon: 'at-sign',
      color: 'blue',
      pinned: false,
      createdAt: 11000
    },
    {
      id: 'app-reddit',
      title: 'Reddit',
      url: 'https://reddit.com',
      tvAppId: '',
      category: 'social',
      icon: 'message-square',
      color: 'orange',
      pinned: false,
      createdAt: 12000
    },
    {
      id: 'app-discord',
      title: 'Discord',
      url: 'https://discord.com/app',
      tvAppId: '',
      category: 'social',
      icon: 'message-circle',
      color: 'purple',
      pinned: false,
      createdAt: 13000
    },
    {
      id: 'app-gmail',
      title: 'Gmail',
      url: 'https://mail.google.com',
      tvAppId: '',
      category: 'tools',
      icon: 'mail',
      color: 'pink',
      pinned: false,
      createdAt: 14000
    },
    {
      id: 'app-gdrive',
      title: 'Google Drive',
      url: 'https://drive.google.com',
      tvAppId: '',
      category: 'tools',
      icon: 'hard-drive',
      color: 'blue',
      pinned: false,
      createdAt: 15000
    },
    {
      id: 'app-figma',
      title: 'Figma',
      url: 'https://figma.com',
      tvAppId: '',
      category: 'dev',
      icon: 'layout',
      color: 'purple',
      pinned: false,
      createdAt: 16000
    }
  ];

  const DEFAULT_SETTINGS = {
    theme: 'alpine',
    clockStyle: 'minimalist', // minimalist, standby, centered, analog
    militaryTime: false,
    showSeconds: true,
    showProgressBar: true,
    viewMode: 'grid', // grid, shelf, compact
    sortOrder: 'custom',
    ambientTimeout: 2, // minutes (0 = disabled)
    pixelShift: true,
    tvMode: true,
    searchEngine: 'universal', // universal, google, duckduckgo, youtube, github
    soundVolume: 45,
    soundPreset: 'rain',
    wallpaperBlur: 16,
    wallpaperDim: 45,
    wallpaperRotate: 'off'
  };

  // =========================================================================
  // State Storage Variables
  // =========================================================================

  let apps = [];
  let categories = [];
  let settings = {};
  let currentCategory = 'all';
  let isTvPlatform = false;
  let activeFocusElement = null;

  // Inactivity / Ambient Mode Tracking
  let inactivityTimer = null;
  let isAmbientActive = false;
  let pixelShiftStep = 0;
  let pixelShiftInterval = null;

  // Drag and Drop
  let draggedAppIndex = null;

  // =========================================================================
  // Web Audio API Ambient Soundscape Synthesizer
  // =========================================================================

  class AmbientSynthesizer {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.gainNode = null;
      this.noiseSource = null;
      this.filterNode = null;
      this.lfoNode = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }

    start(preset = 'rain', volume = 0.45) {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.stop();

      const sampleRate = this.ctx.sampleRate;
      const bufferSize = 2 * sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
      const data = noiseBuffer.getChannelData(0);

      // Pink noise synthesis
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }

      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = noiseBuffer;
      this.noiseSource.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

      if (preset === 'rain') {
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(950, this.ctx.currentTime);
      } else if (preset === 'waves') {
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(500, this.ctx.currentTime);

        this.lfoNode = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        this.lfoNode.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8-second swell
        lfoGain.gain.setValueAtTime(400, this.ctx.currentTime);

        this.lfoNode.connect(lfoGain);
        lfoGain.connect(this.filterNode.frequency);
        this.lfoNode.start();
      } else if (preset === 'forest') {
        this.filterNode.type = 'bandpass';
        this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(3.0, this.ctx.currentTime);
      } else {
        // Soft Air
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);
      }

      this.noiseSource.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.noiseSource.start();
      this.isPlaying = true;
      updateAudioStatusUI(true, preset);
    }

    setVolume(vol) {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
      }
    }

    stop() {
      if (this.noiseSource) {
        try { this.noiseSource.stop(); } catch (e) {}
        this.noiseSource.disconnect();
        this.noiseSource = null;
      }
      if (this.lfoNode) {
        try { this.lfoNode.stop(); } catch (e) {}
        this.lfoNode.disconnect();
        this.lfoNode = null;
      }
      this.isPlaying = false;
      updateAudioStatusUI(false);
    }

    toggle(preset, vol) {
      if (this.isPlaying) {
        this.stop();
        return false;
      } else {
        this.start(preset, vol);
        return true;
      }
    }
  }

  const audioSynth = new AmbientSynthesizer();

  function updateAudioStatusUI(active, preset = 'rain') {
    const island = document.getElementById('statusIsland');
    const btnIcon = document.getElementById('ambientBtnIcon');
    const btnLabel = document.getElementById('ambientBtnLabel');
    const widgetPower = document.getElementById('soundWidgetPowerBtn');

    if (island) {
      island.classList.toggle('active', active);
      const title = document.getElementById('islandTitle');
      const sub = document.getElementById('islandSubtitle');
      if (title && sub) {
        title.textContent = active ? `Atmosphere: ${preset.toUpperCase()}` : 'AETHER';
        sub.textContent = active ? 'Binaural Soundscape Running' : 'Atmospheric Engine';
      }
    }

    if (btnIcon && btnLabel) {
      btnLabel.textContent = active ? preset.toUpperCase() : 'Ambient';
    }

    if (widgetPower) {
      widgetPower.classList.toggle('active', active);
    }
  }

  // =========================================================================
  // Persistence Engine (LocalStorage + Non-Volatile Flash Sync)
  // =========================================================================

  function loadState() {
    try {
      const storedApps = localStorage.getItem(STORAGE.APPS);
      apps = storedApps ? JSON.parse(storedApps) : [...DEFAULT_APPS];

      const storedCategories = localStorage.getItem(STORAGE.CATEGORIES);
      categories = storedCategories ? JSON.parse(storedCategories) : [...DEFAULT_CATEGORIES];

      const storedSettings = localStorage.getItem(STORAGE.SETTINGS);
      settings = storedSettings ? { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) } : { ...DEFAULT_SETTINGS };

      const storedNotes = localStorage.getItem(STORAGE.NOTES);
      if (storedNotes) {
        const textarea = document.getElementById('quickNoteTextarea');
        if (textarea) textarea.value = storedNotes;
      }
    } catch (e) {
      console.warn('Resetting corrupt state:', e);
      apps = [...DEFAULT_APPS];
      categories = [...DEFAULT_CATEGORIES];
      settings = { ...DEFAULT_SETTINGS };
    }
  }

  async function syncFromTVStorage() {
    try {
      const res = await fetch('http://127.0.0.1:8765/api/aether/state');
      if (res.ok) {
        const data = await res.json();
        if (data && data.returnValue && data.state) {
          const st = data.state;
          let changed = false;
          if (st.apps && Array.isArray(st.apps) && st.apps.length > 0) {
            apps = st.apps;
            localStorage.setItem(STORAGE.APPS, JSON.stringify(apps));
            changed = true;
          }
          if (st.categories && Array.isArray(st.categories) && st.categories.length > 0) {
            categories = st.categories;
            localStorage.setItem(STORAGE.CATEGORIES, JSON.stringify(categories));
            changed = true;
          }
          if (st.settings && typeof st.settings === 'object') {
            settings = { ...DEFAULT_SETTINGS, ...st.settings };
            localStorage.setItem(STORAGE.SETTINGS, JSON.stringify(settings));
            changed = true;
          }
          if (st.notes) {
            localStorage.setItem(STORAGE.NOTES, st.notes);
            const textarea = document.getElementById('quickNoteTextarea');
            if (textarea) textarea.value = st.notes;
          }
          if (changed) {
            applyTheme(settings.theme || 'alpine');
            renderCategories();
            renderApps();
            updateClockTypography();
          }
        }
      }
    } catch (_) {}
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE.APPS, JSON.stringify(apps));
      localStorage.setItem(STORAGE.CATEGORIES, JSON.stringify(categories));
      localStorage.setItem(STORAGE.SETTINGS, JSON.stringify(settings));

      // Attempt background flash sync if running on webOS with helper service
      if (window.location.protocol === 'file:' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
        const payload = {
          apps,
          categories,
          settings,
          notes: localStorage.getItem(STORAGE.NOTES) || ''
        };
        fetch('http://127.0.0.1:8765/api/aether/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      }
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  // =========================================================================
  // Themes & Visuals Engine
  // =========================================================================

  function applyTheme(themeName) {
    if (!THEMES.includes(themeName)) themeName = 'alpine';
    const body = document.getElementById('appBody');
    if (!body) return;

    THEMES.forEach(t => body.classList.remove(`theme-${t}`));
    body.classList.add(`theme-${themeName}`);

    settings.theme = themeName;
    saveState();

    const label = document.getElementById('currentThemeLabel');
    if (label) label.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);

    // Update active card in theme modal
    document.querySelectorAll('.theme-card-option').forEach(card => {
      card.classList.toggle('active', card.dataset.theme === themeName);
    });

    updateWallpaperCanvas();
  }

  function updateWallpaperCanvas() {
    const root = document.documentElement;
    root.style.setProperty('--wallpaper-blur', `${settings.wallpaperBlur}px`);
    root.style.setProperty('--wallpaper-dim', `${settings.wallpaperDim / 100}`);

    const blurSlider = document.getElementById('wallpaperBlurSlider');
    const dimSlider = document.getElementById('wallpaperDimSlider');
    const blurLabel = document.getElementById('blurValLabel');
    const dimLabel = document.getElementById('dimValLabel');

    if (blurSlider) blurSlider.value = settings.wallpaperBlur;
    if (dimSlider) dimSlider.value = settings.wallpaperDim;
    if (blurLabel) blurLabel.textContent = `${settings.wallpaperBlur}px`;
    if (dimLabel) dimLabel.textContent = `${settings.wallpaperDim}%`;
  }

  // =========================================================================
  // Live Clock, Date & StandBy Hero Engine
  // =========================================================================

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    let period = '';
    if (!settings.militaryTime) {
      period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }
    const formattedHours = String(hours).padStart(2, '0');

    // Main Hero Clock
    const digits = document.getElementById('clockMainDigits');
    const secPill = document.getElementById('clockSecondsPill');
    const ampmPill = document.getElementById('clockAmPmPill');
    const greeting = document.getElementById('personalGreeting');
    const fullDate = document.getElementById('fullCalendarDate');
    const dayBar = document.getElementById('dayElapsedBar');
    const dayText = document.getElementById('dayProgressText');

    if (digits) digits.textContent = `${formattedHours}:${minutes}`;
    if (secPill) {
      secPill.textContent = seconds;
      secPill.style.display = settings.showSeconds ? 'inline-block' : 'none';
    }
    if (ampmPill) {
      ampmPill.textContent = period;
      ampmPill.style.display = settings.militaryTime ? 'none' : 'inline-block';
    }

    // Dynamic Personal Greeting
    const rawHours = now.getHours();
    let greetingText = 'Good evening, Bashar';
    if (rawHours >= 5 && rawHours < 12) greetingText = 'Good morning, Bashar';
    else if (rawHours >= 12 && rawHours < 17) greetingText = 'Good afternoon, Bashar';
    else if (rawHours >= 17 && rawHours < 22) greetingText = 'Good evening, Bashar';
    else greetingText = 'Good night, Bashar';
    if (greeting) greeting.textContent = greetingText;

    // Full Date
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    if (fullDate) fullDate.textContent = now.toLocaleDateString('en-US', dateOptions);

    // Day Progress Bar
    const totalDaySecs = 86400;
    const currentDaySecs = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
    const pct = Math.floor((currentDaySecs / totalDaySecs) * 100);
    if (dayBar) {
      dayBar.style.width = `${pct}%`;
      dayBar.parentElement.style.display = settings.showProgressBar ? 'block' : 'none';
    }
    if (dayText) dayText.textContent = `${pct}% of day`;

    // Analog Clock Hands (if enabled)
    const hourHand = document.getElementById('analogHour');
    const minHand = document.getElementById('analogMinute');
    const secHand = document.getElementById('analogSecond');
    if (hourHand && minHand && secHand) {
      const secDeg = (now.getSeconds() / 60) * 360;
      const minDeg = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360;
      const hrDeg = (((now.getHours() % 12) + now.getMinutes() / 60) / 12) * 360;
      secHand.style.transform = `rotate(${secDeg}deg)`;
      minHand.style.transform = `rotate(${minDeg}deg)`;
      hourHand.style.transform = `rotate(${hrDeg}deg)`;
    }

    // Ambient Always-On Display Clock
    if (isAmbientActive) {
      const ambDigits = document.getElementById('ambientTimeDigits');
      const ambSecs = document.getElementById('ambientSecondsTicker');
      const ambAmPm = document.getElementById('ambientAmPm');
      const ambDate = document.getElementById('ambientDateUnit');

      if (ambDigits) ambDigits.textContent = `${formattedHours}:${minutes}`;
      if (ambSecs) ambSecs.textContent = seconds;
      if (ambAmPm) {
        ambAmPm.textContent = period;
        ambAmPm.style.display = settings.militaryTime ? 'none' : 'inline-block';
      }
      if (ambDate) {
        const shortDateOpts = { weekday: 'long', month: 'long', day: 'numeric' };
        ambDate.textContent = now.toLocaleDateString('en-US', shortDateOpts);
      }
    }
  }

  // =========================================================================
  // iPhone-Inspired Always-On Display (Ambient Mode) with OLED Burn-In Shift
  // =========================================================================

  function triggerAmbientMode() {
    if (isAmbientActive) return;
    const overlay = document.getElementById('ambientOverlay');
    if (!overlay) return;

    isAmbientActive = true;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');

    // OLED Pixel Shifter (Rotates position smoothly every 60s)
    if (settings.pixelShift && !pixelShiftInterval) {
      pixelShiftInterval = setInterval(() => {
        pixelShiftStep = (pixelShiftStep + 1) % 12;
        const radius = 3; // Shift by 3 pixels in circular path
        const angle = (pixelShiftStep / 12) * Math.PI * 2;
        const dx = Math.round(Math.cos(angle) * radius);
        const dy = Math.round(Math.sin(angle) * radius);

        const stage = document.getElementById('ambientStage');
        if (stage) {
          stage.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        }
      }, 60000);
    }
  }

  function dismissAmbientMode() {
    if (!isAmbientActive) return;
    const overlay = document.getElementById('ambientOverlay');
    if (!overlay) return;

    isAmbientActive = false;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');

    if (pixelShiftInterval) {
      clearInterval(pixelShiftInterval);
      pixelShiftInterval = null;
    }

    resetInactivityTimer();
  }

  function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (!settings.ambientTimeout || settings.ambientTimeout === 0) return;

    // Convert minutes to milliseconds
    const ms = settings.ambientTimeout * 60 * 1000;
    inactivityTimer = setTimeout(() => {
      triggerAmbientMode();
    }, ms);
  }

  // =========================================================================
  // Application Launcher & TV Native Launch Execution
  // =========================================================================

  function launchApplication(app) {
    showToast(`Launching ${app.title}...`);

    // 1. If running on LG webOS TV, call helper service to launch native app
    if (app.tvAppId) {
      fetch('http://127.0.0.1:8765/api/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: app.tvAppId })
      }).then(res => {
        if (!res.ok) throw new Error('Native launch fallback');
      }).catch(() => {
        // Fallback to web URL
        if (app.url) window.open(app.url, '_blank', 'noopener,noreferrer');
      });
      return;
    }

    // 2. Desktop / standard web navigation
    if (app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    }
  }

  function renderCategories() {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;

    nav.innerHTML = '';
    categories.forEach(cat => {
      let count = 0;
      if (cat.id === 'all') count = apps.length;
      else if (cat.id === 'favorites') count = apps.filter(a => a.pinned).length;
      else count = apps.filter(a => a.category === cat.id).length;

      const item = document.createElement('button');
      item.className = `sidebar-item tv-focusable ${cat.id === currentCategory ? 'active' : ''}`;
      item.dataset.catId = cat.id;
      item.tabIndex = 0;

      item.innerHTML = `
        <div class="sidebar-item-left">
          <span class="sidebar-item-icon"><i data-lucide="${cat.icon || 'folder'}"></i></span>
          <span class="sidebar-item-name">${escapeHtml(cat.name)}</span>
        </div>
        <span class="sidebar-item-count">${count}</span>
      `;

      item.addEventListener('click', () => {
        currentCategory = cat.id;
        renderCategories();
        renderApplications();
        updateCategoryHeading();
      });

      nav.appendChild(item);
    });

    // Populate modal select
    const select = document.getElementById('selectAppCategory');
    if (select) {
      select.innerHTML = categories
        .filter(c => c.id !== 'all' && c.id !== 'favorites')
        .map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`)
        .join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function updateCategoryHeading() {
    const activeCat = categories.find(c => c.id === currentCategory) || categories[0];
    const heading = document.getElementById('sectionHeading');
    const topName = document.getElementById('topCategoryName');
    if (heading) heading.textContent = activeCat.name;
    if (topName) topName.textContent = activeCat.name;
  }

  function renderApplications() {
    const container = document.getElementById('applicationsContainer');
    const emptyState = document.getElementById('emptyStateView');
    const countPill = document.getElementById('appCountPill');
    if (!container) return;

    let filtered = [...apps];

    // Filter by Category
    if (currentCategory === 'favorites') {
      filtered = filtered.filter(a => a.pinned);
    } else if (currentCategory !== 'all') {
      filtered = filtered.filter(a => a.category === currentCategory);
    }

    // Filter by Search Query
    const searchInput = document.getElementById('universalSearchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (query) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(query) ||
        (a.url && a.url.toLowerCase().includes(query)) ||
        (a.category && a.category.toLowerCase().includes(query))
      );
    }

    // Sort order
    if (settings.sortOrder === 'name-asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (settings.sortOrder === 'name-desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (countPill) countPill.textContent = `${filtered.length} app${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      renderFloatingDock();
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Apply view mode
    container.className = `applications-container view-${settings.viewMode || 'grid'}`;

    container.innerHTML = filtered.map((item, index) => {
      const domain = extractDomain(item.url || item.tvAppId || '');
      const colorHex = getColorHex(item.color);

      return `
        <div 
          class="app-card tv-focusable" 
          tabindex="0"
          draggable="true" 
          data-id="${item.id}"
          data-index="${index}"
          style="--card-color: ${colorHex};"
        >
          <div class="card-upper-row">
            <div class="app-icon-frame" style="color: ${colorHex};">
              ${renderIcon(item.icon)}
            </div>

            <div class="card-action-bar">
              <button 
                class="card-action-icon-btn ${item.pinned ? 'is-pinned' : ''}" 
                data-action="pin" 
                data-id="${item.id}" 
                title="${item.pinned ? 'Unpin from dock' : 'Pin to dock'}"
              >
                <i data-lucide="star"></i>
              </button>
              <button 
                class="card-action-icon-btn" 
                data-action="edit" 
                data-id="${item.id}" 
                title="Edit application"
              >
                <i data-lucide="pencil"></i>
              </button>
              <button 
                class="card-action-icon-btn" 
                data-action="delete" 
                data-id="${item.id}" 
                title="Delete application"
              >
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>

          <div class="card-lower-details">
            <span class="app-title-text">${escapeHtml(item.title)}</span>
            <span class="app-domain-text">${escapeHtml(domain)}</span>
            <div class="card-tag-row">
              <span class="app-category-badge">${escapeHtml(getCategoryName(item.category))}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    attachAppCardEvents();
    renderFloatingDock();
    if (window.lucide) window.lucide.createIcons();
  }

  function renderFloatingDock() {
    const dock = document.getElementById('floatingDock');
    if (!dock) return;

    const pinned = apps.filter(a => a.pinned);

    dock.innerHTML = pinned.map(item => `
      <div 
        class="dock-app-tile tv-focusable" 
        tabindex="0"
        data-id="${item.id}"
        style="color: ${getColorHex(item.color)};"
        title="${escapeHtml(item.title)}"
      >
        ${renderIcon(item.icon)}
        <div class="dock-app-tooltip">${escapeHtml(item.title)}</div>
      </div>
    `).join('');

    dock.querySelectorAll('.dock-app-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const item = apps.find(a => a.id === tile.dataset.id);
        if (item) launchApplication(item);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function attachAppCardEvents() {
    const cards = document.querySelectorAll('.app-card');

    cards.forEach(card => {
      // Launch app on click
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-action-icon-btn')) return;
        const item = apps.find(a => a.id === card.dataset.id);
        if (item) launchApplication(item);
      });

      // Pin, Edit, Delete
      card.querySelectorAll('.card-action-icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          const id = btn.dataset.id;
          if (action === 'pin') togglePin(id);
          else if (action === 'edit') openEditModal(id);
          else if (action === 'delete') deleteApp(id);
        });
      });

      // Drag and Drop
      card.addEventListener('dragstart', (e) => {
        draggedAppIndex = parseInt(card.dataset.index, 10);
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });

      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetIndex = parseInt(card.dataset.index, 10);
        if (draggedAppIndex !== null && draggedAppIndex !== targetIndex) {
          const moved = apps.splice(draggedAppIndex, 1)[0];
          apps.splice(targetIndex, 0, moved);
          saveState();
          renderApplications();
          showToast('Arrangement saved');
        }
      });
    });
  }

  // =========================================================================
  // CRUD Operations
  // =========================================================================

  function togglePin(id) {
    const item = apps.find(a => a.id === id);
    if (item) {
      item.pinned = !item.pinned;
      saveState();
      renderApplications();
      renderCategories();
      showToast(item.pinned ? 'Pinned to Dock' : 'Unpinned from Dock');
    }
  }

  function openAddModal() {
    const backdrop = document.getElementById('appModalBackdrop');
    const form = document.getElementById('appModalForm');
    const title = document.getElementById('appModalTitle');
    const editId = document.getElementById('editAppId');

    if (form) form.reset();
    if (editId) editId.value = '';
    if (title) title.textContent = 'Add Application';

    const catSelect = document.getElementById('selectAppCategory');
    if (catSelect && currentCategory !== 'all' && currentCategory !== 'favorites') {
      catSelect.value = currentCategory;
    }

    document.querySelectorAll('.color-swatch-dot').forEach(d => {
      d.classList.toggle('active', d.dataset.color === 'blue');
    });

    if (backdrop) backdrop.classList.add('show');
    const nameInput = document.getElementById('inputAppName');
    if (nameInput) nameInput.focus();
  }

  function openEditModal(id) {
    const item = apps.find(a => a.id === id);
    if (!item) return;

    const backdrop = document.getElementById('appModalBackdrop');
    const title = document.getElementById('appModalTitle');
    const editId = document.getElementById('editAppId');
    const nameInput = document.getElementById('inputAppName');
    const urlInput = document.getElementById('inputAppUrl');
    const catSelect = document.getElementById('selectAppCategory');
    const iconInput = document.getElementById('inputAppIcon');
    const pinCheck = document.getElementById('checkboxPinToDock');

    if (title) title.textContent = 'Edit Application';
    if (editId) editId.value = item.id;
    if (nameInput) nameInput.value = item.title;
    if (urlInput) urlInput.value = item.url || item.tvAppId || '';
    if (catSelect) catSelect.value = item.category;
    if (iconInput) iconInput.value = item.icon || '';
    if (pinCheck) pinCheck.checked = !!item.pinned;

    document.querySelectorAll('.color-swatch-dot').forEach(d => {
      d.classList.toggle('active', d.dataset.color === (item.color || 'blue'));
    });

    if (backdrop) backdrop.classList.add('show');
  }

  function closeAppModal() {
    const backdrop = document.getElementById('appModalBackdrop');
    if (backdrop) backdrop.classList.remove('show');
  }

  function handleSaveAppForm(e) {
    e.preventDefault();
    const editId = document.getElementById('editAppId').value;
    const name = document.getElementById('inputAppName').value.trim();
    let urlOrId = document.getElementById('inputAppUrl').value.trim();
    const cat = document.getElementById('selectAppCategory').value;
    const icon = document.getElementById('inputAppIcon').value.trim();
    const pin = document.getElementById('checkboxPinToDock').checked;
    const activeColor = document.querySelector('.color-swatch-dot.active');
    const color = activeColor ? activeColor.dataset.color : 'blue';

    if (!name || !urlOrId) return;

    let webUrl = urlOrId;
    let tvAppId = '';

    if (urlOrId.includes('.') && !urlOrId.startsWith('http://') && !urlOrId.startsWith('https://')) {
      if (!urlOrId.includes('/') && urlOrId.split('.').length >= 3) {
        // Likely webOS appId like youtube.leanback.v4 or com.webos.app.home
        tvAppId = urlOrId;
      } else {
        webUrl = 'https://' + urlOrId;
      }
    }

    if (editId) {
      const item = apps.find(a => a.id === editId);
      if (item) {
        item.title = name;
        item.url = webUrl;
        item.tvAppId = tvAppId;
        item.category = cat;
        item.icon = icon || autoIcon(name);
        item.color = color;
        item.pinned = pin;
        showToast(`Updated "${name}"`);
      }
    } else {
      const newApp = {
        id: 'app-' + Date.now(),
        title: name,
        url: webUrl,
        tvAppId: tvAppId,
        category: cat,
        icon: icon || autoIcon(name),
        color: color,
        pinned: pin,
        createdAt: Date.now()
      };
      apps.unshift(newApp);
      showToast(`Added "${name}"`);
    }

    saveState();
    renderCategories();
    renderApplications();
    closeAppModal();
  }

  function deleteApp(id) {
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return;

    const removed = apps.splice(index, 1)[0];
    saveState();
    renderCategories();
    renderApplications();
    showToast(`Deleted "${removed.title}"`);
  }

  // =========================================================================
  // Spatial D-Pad Navigation Engine (Smart TV Remote Control)
  // =========================================================================

  function getFocusableElements() {
    return Array.from(document.querySelectorAll('.tv-focusable:not([disabled])'))
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
      });
  }

  function navigateSpatial(direction) {
    const focusables = getFocusableElements();
    if (focusables.length === 0) return;

    const current = document.activeElement && document.activeElement.classList.contains('tv-focusable')
      ? document.activeElement
      : null;

    if (!current) {
      focusables[0].focus();
      updateFocusRing(focusables[0]);
      return;
    }

    const curRect = current.getBoundingClientRect();
    const curCenter = { x: curRect.left + curRect.width / 2, y: curRect.top + curRect.height / 2 };

    let bestCandidate = null;
    let minDistance = Infinity;

    focusables.forEach(candidate => {
      if (candidate === current) return;
      const cRect = candidate.getBoundingClientRect();
      const cCenter = { x: cRect.left + cRect.width / 2, y: cRect.top + cRect.height / 2 };

      const dx = cCenter.x - curCenter.x;
      const dy = cCenter.y - curCenter.y;

      // Filter by direction
      let valid = false;
      if (direction === 'up' && dy < -5) valid = true;
      else if (direction === 'down' && dy > 5) valid = true;
      else if (direction === 'left' && dx < -5) valid = true;
      else if (direction === 'right' && dx > 5) valid = true;

      if (!valid) return;

      // Distance calculation with heavy penalty for orthogonal divergence
      let dist;
      if (direction === 'up' || direction === 'down') {
        dist = Math.abs(dy) + Math.abs(dx) * 2.5;
      } else {
        dist = Math.abs(dx) + Math.abs(dy) * 2.5;
      }

      if (dist < minDistance) {
        minDistance = dist;
        bestCandidate = candidate;
      }
    });

    if (bestCandidate) {
      bestCandidate.focus();
      bestCandidate.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      updateFocusRing(bestCandidate);
    }
  }

  function updateFocusRing(el) {
    const ring = document.getElementById('spatialFocusRing');
    if (!ring || !el) return;

    const rect = el.getBoundingClientRect();
    ring.style.top = `${rect.top}px`;
    ring.style.left = `${rect.left}px`;
    ring.style.width = `${rect.width}px`;
    ring.style.height = `${rect.height}px`;
    ring.classList.add('active');
  }

  // =========================================================================
  // Widgets: Calendar Generator & Quick Notes
  // =========================================================================

  function renderCalendarWidget() {
    const body = document.getElementById('calendarWidgetBody');
    const monthBadge = document.getElementById('widgetCalMonth');
    if (!body) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    if (monthBadge) {
      monthBadge.textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let html = headers.map(h => `<div class="cal-header-day">${h}</div>`).join('');

    for (let i = 0; i < firstDay; i++) {
      html += `<div class="cal-day-cell"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today;
      html += `<div class="cal-day-cell ${isToday ? 'today' : ''}">${d}</div>`;
    }

    body.innerHTML = html;
  }

  // =========================================================================
  // Utilities & Helpers
  // =========================================================================

  function extractDomain(str) {
    try {
      if (str.startsWith('http://') || str.startsWith('https://')) {
        const u = new URL(str);
        return u.hostname.replace('www.', '');
      }
      return str;
    } catch (e) {
      return str;
    }
  }

  function getCategoryName(catId) {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : catId;
  }

  function getColorHex(name) {
    const colors = {
      blue: '#0A84FF',
      purple: '#BF5AF2',
      pink: '#FF375F',
      orange: '#FF9F0A',
      green: '#30D158',
      cyan: '#64D2FF'
    };
    return colors[name] || colors.blue;
  }

  function autoIcon(name) {
    const l = name.toLowerCase();
    if (l.includes('youtube') || l.includes('video')) return 'play';
    if (l.includes('netflix') || l.includes('film') || l.includes('movie')) return 'film';
    if (l.includes('tv') || l.includes('stream')) return 'tv';
    if (l.includes('github') || l.includes('code') || l.includes('git')) return 'code';
    if (l.includes('chat') || l.includes('ai') || l.includes('gpt')) return 'sparkles';
    if (l.includes('music') || l.includes('spotify')) return 'music';
    return 'globe';
  }

  function renderIcon(icon) {
    if (!icon) return '<i data-lucide="globe"></i>';
    if (/\p{Extended_Pictographic}/u.test(icon)) {
      return `<span>${escapeHtml(icon)}</span>`;
    }
    return `<i data-lucide="${escapeHtml(icon)}"></i>`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(msg) {
    const hub = document.getElementById('toastHub');
    if (!hub) return;

    const t = document.createElement('div');
    t.className = 'toast-pill';
    t.textContent = msg;
    hub.appendChild(t);

    setTimeout(() => {
      t.remove();
    }, 3000);
  }

  // =========================================================================
  // DOM Setup & Bootstrapping
  // =========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    syncFromTVStorage();

    // 1. Theme & Visual Setup
    applyTheme(settings.theme);
    updateWallpaperCanvas();

    // 2. Data Rendering
    renderCategories();
    renderApplications();
    renderCalendarWidget();
    updateClock();
    setInterval(updateClock, 1000);

    // 3. Inactivity Timer for Always-On Display (Ambient Mode)
    resetInactivityTimer();
    ['mousemove', 'keydown', 'click', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, () => {
        if (isAmbientActive) {
          dismissAmbientMode();
        } else {
          resetInactivityTimer();
        }
      }, { passive: true });
    });

    // 4. Remote & Keyboard Spatial Navigation
    window.addEventListener('keydown', (e) => {
      const keyCode = e.keyCode || e.which;

      // LG webOS Back Button (Keycode 461) or Desktop Escape / Backspace
      if (keyCode === 461 || e.key === 'Escape') {
        e.preventDefault();
        if (isAmbientActive) {
          dismissAmbientMode();
          return;
        }

        // Close any active modal
        const activeModal = document.querySelector('.modal-backdrop.show');
        if (activeModal) {
          activeModal.classList.remove('show');
          return;
        }

        const settingsDrawer = document.getElementById('settingsDrawer');
        if (settingsDrawer && settingsDrawer.classList.contains('open')) {
          settingsDrawer.classList.remove('open');
          return;
        }
      }

      // If Ambient Mode is active, any key wakes it up!
      if (isAmbientActive) {
        dismissAmbientMode();
        return;
      }

      // D-Pad Spatial Navigation
      if (e.key === 'ArrowUp') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          navigateSpatial('up');
        }
      } else if (e.key === 'ArrowDown') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          navigateSpatial('down');
        }
      } else if (e.key === 'ArrowLeft') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          navigateSpatial('left');
        }
      } else if (e.key === 'ArrowRight') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          navigateSpatial('right');
        }
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('universalSearchInput');
        if (searchInput) searchInput.focus();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('universalSearchInput');
        if (searchInput) searchInput.focus();
      }
    });

    // 5. Button Listeners
    const addAppBtn = document.getElementById('addAppBtn');
    const emptyAddBtn = document.getElementById('emptyStateAddBtn');
    if (addAppBtn) addAppBtn.addEventListener('click', openAddModal);
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', openAddModal);

    // Modal Form & Close
    const appForm = document.getElementById('appModalForm');
    const cancelModal = document.getElementById('cancelAppModalBtn');
    const trafficClose = document.getElementById('modalTrafficClose');
    if (appForm) appForm.addEventListener('submit', handleSaveAppForm);
    if (cancelModal) cancelModal.addEventListener('click', closeAppModal);
    if (trafficClose) trafficClose.addEventListener('click', closeAppModal);

    // Color Swatches
    document.querySelectorAll('.color-swatch-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    // Theme Picker Modal
    const themeBtn = document.getElementById('themePickerBtn');
    const themeModal = document.getElementById('themeModalBackdrop');
    const closeThemeBtn = document.getElementById('closeThemeModalBtn');
    if (themeBtn && themeModal) {
      themeBtn.addEventListener('click', () => themeModal.classList.add('show'));
    }
    if (closeThemeBtn && themeModal) {
      closeThemeBtn.addEventListener('click', () => themeModal.classList.remove('show'));
    }

    document.querySelectorAll('.theme-card-option').forEach(card => {
      card.addEventListener('click', () => {
        applyTheme(card.dataset.theme);
        if (themeModal) themeModal.classList.remove('show');
        showToast(`Theme switched to ${card.dataset.theme.toUpperCase()}`);
      });
    });

    // Settings Drawer
    const settingsBtn = document.getElementById('openSettingsBtn');
    const settingsDrawer = document.getElementById('settingsDrawer');
    const closeDrawerBtn = document.getElementById('closeSettingsDrawerBtn');
    if (settingsBtn && settingsDrawer) {
      settingsBtn.addEventListener('click', () => settingsDrawer.classList.toggle('open'));
    }
    if (closeDrawerBtn && settingsDrawer) {
      closeDrawerBtn.addEventListener('click', () => settingsDrawer.classList.remove('open'));
    }

    // Ambient Mode Button Trigger
    const ambientBtn = document.getElementById('ambientModeTriggerBtn');
    if (ambientBtn) {
      ambientBtn.addEventListener('click', triggerAmbientMode);
    }

    // Audio Ambient Sound Button
    const soundBtn = document.getElementById('ambientSoundBtn');
    const soundWidgetPower = document.getElementById('soundWidgetPowerBtn');
    const volumeSlider = document.getElementById('widgetVolumeSlider');

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        audioSynth.toggle(settings.soundPreset, settings.soundVolume / 100);
      });
    }
    if (soundWidgetPower) {
      soundWidgetPower.addEventListener('click', () => {
        audioSynth.toggle(settings.soundPreset, settings.soundVolume / 100);
      });
    }

    if (volumeSlider) {
      volumeSlider.value = settings.soundVolume;
      volumeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        settings.soundVolume = val;
        audioSynth.setVolume(val / 100);
        saveState();
      });
    }

    document.querySelectorAll('.sound-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sound-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        settings.soundPreset = btn.dataset.sound;
        saveState();
        if (audioSynth.isPlaying) {
          audioSynth.start(settings.soundPreset, settings.soundVolume / 100);
        }
      });
    });

    // Quick Notes Autosave
    const noteArea = document.getElementById('quickNoteTextarea');
    if (noteArea) {
      noteArea.addEventListener('input', () => {
        localStorage.setItem(STORAGE.NOTES, noteArea.value);
        const savePill = document.getElementById('noteSavePill');
        if (savePill) {
          savePill.textContent = 'Saving...';
          setTimeout(() => { savePill.textContent = 'Saved'; }, 600);
        }
      });
    }

    // Universal Search Input
    const searchInput = document.getElementById('universalSearchInput');
    const clearSearch = document.getElementById('clearSearchBtn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        if (clearSearch) clearSearch.classList.toggle('show', e.target.value.length > 0);
        renderApplications();
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = searchInput.value.trim();
          if (q) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
          }
        }
      });
    }

    if (clearSearch) {
      clearSearch.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        clearSearch.classList.remove('show');
        renderApplications();
      });
    }

    // View Switcher
    const gridBtn = document.getElementById('viewGridBtn');
    const shelfBtn = document.getElementById('viewShelfBtn');
    const compactBtn = document.getElementById('viewCompactBtn');

    [gridBtn, shelfBtn, compactBtn].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        settings.viewMode = btn.dataset.view;
        saveState();
        renderApplications();
      });
    });

    // Sort Order
    const sortSelect = document.getElementById('sortOrderSelect');
    if (sortSelect) {
      sortSelect.value = settings.sortOrder || 'custom';
      sortSelect.addEventListener('change', (e) => {
        settings.sortOrder = e.target.value;
        saveState();
        renderApplications();
      });
    }

    // Export / Import Backup JSON
    const exportBtn = document.getElementById('exportBackupBtn');
    const importBtn = document.getElementById('importBackupBtn');
    const fileInput = document.getElementById('importFileInput');
    const resetBtn = document.getElementById('resetAetherDefaultsBtn');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const payload = {
          apps,
          categories,
          settings,
          notes: localStorage.getItem(STORAGE.NOTES) || '',
          exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aether-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Backup JSON downloaded');
      });
    }

    if (importBtn && fileInput) {
      importBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const data = JSON.parse(evt.target.result);
            if (data.apps) apps = data.apps;
            if (data.categories) categories = data.categories;
            if (data.settings) settings = { ...settings, ...data.settings };
            if (data.notes) {
              localStorage.setItem(STORAGE.NOTES, data.notes);
              if (noteArea) noteArea.value = data.notes;
            }
            saveState();
            applyTheme(settings.theme);
            renderCategories();
            renderApplications();
            updateClock();
            showToast('Backup restored successfully');
          } catch (err) {
            showToast('Failed to parse backup');
          }
        };
        reader.readAsText(file);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset AETHER to factory defaults?')) {
          localStorage.clear();
          loadState();
          applyTheme(settings.theme);
          renderCategories();
          renderApplications();
          updateClock();
          showToast('AETHER reset to defaults');
        }
      });
    }

    // Physical TV Inputs Click Handlers
    document.querySelectorAll('[data-action="launch-input"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const inputId = btn.dataset.inputId;
        showToast(`Switching to ${btn.textContent.trim()}...`);
        fetch('http://127.0.0.1:8765/api/launch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: inputId })
        }).catch(() => {});
      });
    });

  });

})();
