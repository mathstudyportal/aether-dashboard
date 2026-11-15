# AETHER — Apple-Inspired Smart TV & Personal Dashboard OS

<p align="center">
  <img src="icon.png" width="96" height="96" alt="AETHER Icon" style="border-radius: 22px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
  <br>
  <em>The ultimate cinematic personal homepage and native Smart TV dashboard.</em>
</p>

---

## 🌟 Vision & Design Philosophy

**AETHER** fuses the design elegance of Apple’s macOS Sequoia, iOS 18 StandBy mode, and visionOS spatial design with the raw utility of a modern Smart TV operating system. 

Designed for both precision desktop workflow and cinematic 16:9 4K television experiences, AETHER replaces cluttered, ad-ridden stock television launchers with a calm, responsive, frosted-glass interface that puts your content, links, apps, and ambient audio at the center.

### Core Highlights
* ** Apple Human Interface Design:** Layered glassmorphism, specular highlights, dynamic blur (`backdrop-filter: blur(28px)`), refined SF Pro typography hierarchy, and subtle micro-interactions.
* **📺 100% Remote D-Pad Navigation:** Built for Smart TV remotes (LG webOS, Samsung, Android TV). Full spatial navigation (Up/Down/Left/Right/Enter/Back keycode `461`), automatic scroll centering, and luminous focus rings.
* **🌙 iPhone-Inspired Always-On Display (Ambient Mode):** OLED burn-in protected pixel-shifting StandBy clock with live date, minimalist typography, atmospheric Web Audio sound generator, and instant wake-on-input.
* **⚡ Native Smart TV App Launching:** Seamless bridge with TV system managers (`com.webos.applicationManager`) to launch native streaming apps (YouTube, Netflix, Prime Video, Apple TV, Twitch, Disney+) and switch hardware HDMI inputs.
* **💾 Non-Volatile Flash Persistence:** State engine that syncs to local TV non-volatile storage to guarantee layouts, wallpapers, custom shortcuts, and notes survive power loss and hard unplugs.
* **🚫 Zero Ads & Zero Tracking:** Pure, uncompromised performance with zero telemetry, zero sponsored banners, and zero third-party tracking scripts.

---

## 🎨 5 Original Design Themes

| Theme | Inspiration | Palette | Accent |
| :--- | :--- | :--- | :--- |
| **Alpine** | High-altitude glaciers, reflective alpine lakes, crisp mountain air | Obsidian `#060709`, Ice Frost, Translucent Midnight | Sapphire `#0A84FF` |
| **Pacific** | Deep coastal fog, Big Sur shoreline, ocean mist | Slate Marine `#080D14`, Frosted Aqua, Cool Steel | Cyan `#64D2FF` |
| **Metropolitan** | High-rise dusk, architectural silhouettes, Tokyo & Manhattan nights | Deep Carbon `#0A0A0C`, Amber Highlights, Warm Glass | Gold `#FFD60A` |
| **Horizon** | Golden hour ridge lines, twilight desert skies, warm sunset gradients | Plum Charcoal `#0E090F`, Rose-tinted Specular | Coral `#FF375F` |
| **Monochrome** | Minimalist architectural concrete, Swiss graphic design, Leica shadows | Pure Pitch `#000000`, Studio Smoke, Silver Frost | Diamond `#FFFFFF` |

---

## 🕹️ Smart TV Remote & Keyboard Controls

AETHER features a dedicated spatial navigation engine that calculates bounding rect distances in 2D space to move focus intuitively without mouse input.

| TV Remote Button | Keyboard Key | Action |
| :--- | :--- | :--- |
| **D-Pad Up / Down / Left / Right** | `↑` / `↓` / `←` / `→` | Move spatial focus ring smoothly between shelf items, categories, and controls |
| **Center OK / Select** | `Enter` / `Space` | Launch focused application, open modal, or trigger action |
| **Back Button (LG webOS 461)** | `Escape` / `Backspace` | Close open sheets, cancel search, or dismiss Always-On Display |
| **Search Shortcut** | `/` | Open Universal Search bar instantly |
| **Theme Cycle** | `T` | Cycle between Alpine, Pacific, Metropolitan, Horizon, and Monochrome |
| **Ambient Mode** | `A` | Manually enter iPhone-inspired Always-On Display |

---

## 🎛️ Architecture & Feature Suite

```
  ┌────────────────────────────────────────────────────────┐
  │                        AETHER                          │
  ├────────────────────────────────────────────────────────┤
  │  [ Status Island ] Dynamic audio visualizer & clock    │
  │  [ StandBy Clock ] Large digital time & greeting       │
  │  [ Universal Search ] Instant fuzzy filtering (/ key)  │
  ├────────────────────────────────────────────────────────┤
  │  [ Category Bar ] Favorites • Social • Media • AI • TV │
  │  [ App Launcher Shelf ] Fluid horizontal scroll grid   │
  │  [ Widget Hub ] Calendar • Live Weather • Quick Notes  │
  │  [ Audio Synth ] Synthesized Rain, Waves, Forest sound │
  ├────────────────────────────────────────────────────────┤
  │  [ Always-On Display ] StandBy clock with OLED orbit   │
  └────────────────────────────────────────────────────────┘
```

1. **StandBy Hero Clock & Greeting:**
   - 12-hour / 24-hour display with configurable fonts (Antonio Display, Plus Jakarta Sans, JetBrains Mono).
   - Time-aware dynamic greeting (Morning, Afternoon, Evening, Night).
2. **Universal Search:**
   - Instant search through installed TV apps, custom bookmarks, categories, and settings.
3. **App Launcher & Shortcut Shelf:**
   - Preconfigured with native TV and web apps (YouTube, Netflix, Prime Video, Apple TV, Spotify, Plex, Twitch, ChatGPT, GitHub, Reddit, and TV HDMI inputs).
   - Full CRUD modal: Add custom web links, custom names, icons, and categories.
4. **Interactive Widget System:**
   - **Calendar:** Real-time day and month viewer with current date highlighting.
   - **Weather:** High-precision meteorological overview with location and conditions.
   - **Quick Notes:** Scratchpad with real-time flash auto-saving.
   - **Ambient Studio:** Synthesizer powered by Web Audio API (Rain, Ocean Waves, Forest Canopy, Pink Noise) for sleep or focus.
5. **Always-On Display (Ambient Mode):**
   - Automatically activates after 3 minutes of inactivity (customizable).
   - OLED pixel-shift algorithm shifts coordinates every 60 seconds to prevent screen burn-in.
   - Wakes up instantaneously on any remote button press.

---

## 🚀 Deployment & Installation

### Option 1: Native LG webOS Deployment (Rooted via Homebrew Channel)

AETHER mounts directly over `com.webos.app.home`, permanently replacing the stock launcher.

1. **Connect via Telnet / SSH to your LG TV:**
   ```bash
   telnet 192.168.1.254 23
   ```
2. **Deploy AETHER to the Homebrew CleanYourTV partition:**
   ```bash
   # Extract package to home-overlay and persistent app directory
   curl -s -o /tmp/aether.tar.gz http://<YOUR_IP>:3333/aether.tar.gz
   cd /media/developer/cleanyourtv/home-overlay && tar -xzf /tmp/aether.tar.gz
   cd /media/developer/cleanyourtv/app && tar -xzf /tmp/aether.tar.gz
   chmod -R 777 /media/developer/cleanyourtv/home-overlay /media/developer/cleanyourtv/app
   
   # Restart home service
   sh /media/developer/cleanyourtv/reload-home.sh
   ```

### Option 2: Desktop & Web Browser

Simply host the static folder on any modern web server (Nginx, Caddy, Python):
```bash
cd aether
python3 -m http.server 8080
```
Open `http://localhost:8080` in Chrome, Safari, or Edge and press `F11` for full-screen kiosk mode.

---

## 🛡️ Television Problem Fixes

### 1. Layout Resetting on Power Off / Unplug (Solved)
Stock TV browsers frequently wipe `localStorage` when power is disconnected. AETHER routes all state changes (`saveState`) through a non-volatile flash bridge (`/api/aether/state` on port 8765) saving directly to `/media/developer/cleanyourtv/aether-state.json`. Upon reboot, AETHER automatically reads this file to restore themes, wallpapers, shortcuts, and widget data.

### 2. Auto-Booting to HDMI 1 Instead of Home (Solved)
By binding into webOS system startup scripts (`/media/developer/cleanyourtv/10-cleanyourtv-home`), AETHER re-asserts foreground priority 8 and 15 seconds after TV boot, preventing HDMI-CEC from hijacking the display on power-up.

---

## 📄 License
MIT License. Free for personal and commercial customization. No rights reserved by LG or Apple; all trademarks belong to their respective owners.
