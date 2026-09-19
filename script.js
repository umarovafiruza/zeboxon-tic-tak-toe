/* ==========================================================
   TIC TAC TOE (X-0) ARENA - ENGINE & AUDIO FX
   ========================================================== */

(function () {
  'use strict';

  // --- Sound Effects Generator (Web Audio API) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playMoveX() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    }

    playMoveO() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.12);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    }

    playRoundWin() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const now = this.ctx.currentTime + index * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      });
    }

    playDraw() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [440, 392, 349.23];
      notes.forEach((freq, index) => {
        const now = this.ctx.currentTime + index * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      });
    }

    playChampionship() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const melody = [
        { f: 523.25, d: 0.14 },
        { f: 659.25, d: 0.14 },
        { f: 783.99, d: 0.16 },
        { f: 1046.50, d: 0.4 },
        { f: 783.99, d: 0.15 },
        { f: 1046.50, d: 0.6 }
      ];

      let elapsed = 0;
      melody.forEach(item => {
        const now = this.ctx.currentTime + elapsed;
        elapsed += item.d + 0.03;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(item.f, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + item.d);
      });
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }

    playTick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(950, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    }

    playTimeUp() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.25);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    }

    playVanish() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    }

    playExplosion() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }

    playBlock() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    }

    playAchievement() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [587.33, 739.99, 880, 1174.66];
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      });
    }
  }

  // --- Lightweight Canvas Confetti Engine ---
  class ConfettiMaster {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animating = false;
      this.colors = ['#00f2fe', '#ff2a7a', '#ffb703', '#ffffff', '#7928ca', '#00ff88'];
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    fire(durationMs = 2500, count = 120) {
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: this.canvas.width * (0.2 + Math.random() * 0.6),
          y: this.canvas.height * 0.4 + (Math.random() * 50 - 25),
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.7) * 16,
          size: Math.random() * 8 + 5,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          decay: Math.random() * 0.004 + 0.008
        });
      }

      if (!this.animating) {
        this.animating = true;
        this.render();
      }

      setTimeout(() => {
        this.stop();
      }, durationMs);
    }

    stop() {
      this.particles = [];
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
      if (!this.animating) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let aliveCount = 0;
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity > 0 && p.y < this.canvas.height + 50) {
          aliveCount++;
          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = Math.max(0, p.opacity);
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          this.ctx.restore();
        }
      });

      if (aliveCount > 0 && this.animating) {
        requestAnimationFrame(() => this.render());
      } else {
        this.stop();
      }
    }
  }

  // --- Game Engine ---
  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const TOTAL_ROUNDS = 3;

  // State
  let currentRound = 1;
  let scores = { X: 0, O: 0, draw: 0 };
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let roundStarter = 'X';
  let isGameActive = true;
  let gameMode = 'pvp'; // 'pvp' or 'ai'
  let aiDifficulty = 'easy'; // 'easy' or 'hard'
  let isAiThinking = false;

  // Blitz & Infinite Modifiers State
  let isBlitzEnabled = false;
  let isInfiniteEnabled = false;
  let blitzTimer = null;
  let blitzTimeLeft = 5.0;
  let historyX = [];
  let historyO = [];

  // Power-ups State
  let powerUps = {
    X: { bomb: true, skip: true },
    O: { bomb: true, skip: true }
  };
  let isBombMode = false;

  // Stats & Achievements State
  let stats = {
    totalMatches: 0,
    xWins: 0,
    oWins: 0,
    draws: 0,
    winStreak: 0,
    achievements: {}
  };

  // Power-up DOM Elements (Dock & Fallback)
  const activeBombBtn = document.getElementById('active-bomb-btn');
  const activeSkipBtn = document.getElementById('active-skip-btn');
  const bombStatusBadge = document.getElementById('bomb-status-badge');
  const skipStatusBadge = document.getElementById('skip-status-badge');
  const powerActiveName = document.getElementById('power-active-name');

  const bombXBtn = document.getElementById('bomb-x-btn');
  const skipXBtn = document.getElementById('skip-x-btn');
  const bombOBtn = document.getElementById('bomb-o-btn');
  const skipOBtn = document.getElementById('skip-o-btn');

  // Player Display Elements
  const playerXNameDisplay = document.getElementById('player-x-name-display');
  const playerONameDisplay = document.getElementById('player-o-name-display');

  // Stats DOM Elements
  const statsModalBtn = document.getElementById('stats-modal-btn');
  const statsModal = document.getElementById('stats-modal');
  const closeStatsBtn = document.getElementById('close-stats-btn');
  const resetStatsBtn = document.getElementById('reset-stats-btn');

  const statTotalMatchesEl = document.getElementById('stat-total-matches');
  const statXWinsEl = document.getElementById('stat-x-wins');
  const statOWinsEl = document.getElementById('stat-o-wins');
  const statDrawsEl = document.getElementById('stat-draws');

  // Elements
  const soundFX = new SoundFX();
  const confetti = new ConfettiMaster(document.getElementById('confetti-canvas'));

  const cells = document.querySelectorAll('.cell');
  const boardEl = document.getElementById('board');
  const strikeLineEl = document.getElementById('strike-line');

  // Mode & Difficulty elements
  const modePvpBtn = document.getElementById('mode-pvp-btn');
  const modeAiBtn = document.getElementById('mode-ai-btn');
  const difficultyGroup = document.getElementById('difficulty-group');
  const diffEasyBtn = document.getElementById('diff-easy-btn');
  const diffHardBtn = document.getElementById('diff-hard-btn');

  // Modifiers & Rule Elements
  const ruleClassicBtn = document.getElementById('rule-classic-btn');
  const ruleInfiniteBtn = document.getElementById('rule-infinite-btn');
  const infiniteModeBanner = document.getElementById('infinite-mode-banner');
  const toggleBlitzBtn = document.getElementById('toggle-blitz-btn');
  const blitzStatus = document.getElementById('blitz-status');
  const toggleInfiniteBtn = document.getElementById('toggle-infinite-btn');
  const infiniteStatus = document.getElementById('infinite-status');
  const blitzTimerContainer = document.getElementById('blitz-timer-container');
  const blitzTimeText = document.getElementById('blitz-time-text');
  const blitzFill = document.getElementById('blitz-fill');

  const playerXCard = document.getElementById('player-x-card');
  const playerOCard = document.getElementById('player-o-card');
  const scoreXEl = document.getElementById('score-x');
  const scoreOEl = document.getElementById('score-o');
  const scoreDrawEl = document.getElementById('score-draw');

  const playerXNameInput = document.getElementById('player-x-name');
  const playerONameInput = document.getElementById('player-o-name');

  const currentRoundNumEl = document.getElementById('current-round-number');
  const roundPills = [
    document.getElementById('pill-1'),
    document.getElementById('pill-2'),
    document.getElementById('pill-3')
  ];

  const bannerText = document.getElementById('banner-text');
  const bannerIcon = document.getElementById('banner-icon');

  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundIconOff = document.getElementById('sound-icon-off');
  const resetMatchBtn = document.getElementById('reset-match-btn');

  // Modals
  const roundModal = document.getElementById('round-modal');
  const roundModalTag = document.getElementById('round-modal-tag');
  const roundModalTitle = document.getElementById('round-modal-title');
  const roundModalDesc = document.getElementById('round-modal-desc');
  const summaryXName = document.getElementById('summary-x-name');
  const summaryOName = document.getElementById('summary-o-name');
  const summaryXScore = document.getElementById('summary-x-score');
  const summaryOScore = document.getElementById('summary-o-score');
  const nextRoundBtn = document.getElementById('next-round-btn');

  const championModal = document.getElementById('champion-modal');
  const championName = document.getElementById('champion-name');
  const championDesc = document.getElementById('champion-desc');
  const finalXName = document.getElementById('final-x-name');
  const finalOName = document.getElementById('final-o-name');
  const finalXScore = document.getElementById('final-x-score');
  const finalOScore = document.getElementById('final-o-score');
  const finalDrawsText = document.getElementById('final-draws-text');
  const newMatchBtn = document.getElementById('new-match-btn');

  // SVG & Symbol Sets Configurations
  const SVG_X = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;

  const SVG_O = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
      <circle cx="12" cy="12" r="8"></circle>
    </svg>
  `;

  const SYMBOL_SETS = {
    classic: { name: 'Klassik Neon', x: 'X', o: 'O', type: 'svg' },
    fire_ice: { name: 'Olov vs Muz', x: '🔥', o: '❄️', type: 'emoji' },
    thunder_skull: { name: 'Yashin vs Ritsar', x: '⚡', o: '💀', type: 'emoji' },
    crown_diamond: { name: 'Toj vs Olmos', x: '👑', o: '💎', type: 'emoji' },
    lion_tiger: { name: 'Sher vs Yo\'lbars', x: '🦁', o: '🐯', type: 'emoji' }
  };

  let currentSymbolSet = 'classic';
  let currentTheme = 'cyberpunk';

  function getSymbolContent(player) {
    const set = SYMBOL_SETS[currentSymbolSet];
    if (set.type === 'svg') {
      return player === 'X' ? SVG_X : SVG_O;
    }
    const char = player === 'X' ? set.x : set.o;
    return `<span class="cell-emoji-symbol">${char}</span>`;
  }

  function updatePlayerCardSymbols() {
    const set = SYMBOL_SETS[currentSymbolSet];
    const tagX = document.querySelector('.tag-x');
    const tagO = document.querySelector('.tag-o');
    const avatarX = document.querySelector('.x-avatar');
    const avatarO = document.querySelector('.o-avatar');

    if (tagX) tagX.textContent = set.x;
    if (tagO) tagO.textContent = set.o;

    if (avatarX && avatarO) {
      if (set.type === 'svg') {
        avatarX.innerHTML = SVG_X;
        avatarO.innerHTML = SVG_O;
      } else {
        avatarX.innerHTML = `<span style="font-size: 1.5rem;">${set.x}</span>`;
        avatarO.innerHTML = `<span style="font-size: 1.5rem;">${set.o}</span>`;
      }
    }
  }

  // --- Helper Functions ---
  function getPlayerName(player) {
    if (player === 'X') {
      const disp = playerXNameDisplay ? playerXNameDisplay.textContent.trim() : '';
      return disp || (playerXNameInput ? playerXNameInput.value.trim() : '') || "O'yinchi 1";
    }
    const disp = playerONameDisplay ? playerONameDisplay.textContent.trim() : '';
    return disp || (playerONameInput ? playerONameInput.value.trim() : '') || (gameMode === 'ai' ? 'AI Bot' : "O'yinchi 2");
  }

  function updateActivePlayerUI() {
    const set = SYMBOL_SETS[currentSymbolSet];
    const symbolX = set.x;
    const symbolO = set.o;

    if (currentPlayer === 'X') {
      playerXCard.classList.add('active-turn');
      playerOCard.classList.remove('active-turn');
      playerXCard.querySelector('.turn-status').textContent = 'Navbatda';
      playerOCard.querySelector('.turn-status').textContent = 'Kutmoqda';
      bannerIcon.textContent = set.type === 'emoji' ? symbolX : '⚡';
      bannerText.textContent = `${getPlayerName('X')} (${symbolX}) ning navbati!`;
    } else {
      playerOCard.classList.add('active-turn');
      playerXCard.classList.remove('active-turn');
      playerOCard.querySelector('.turn-status').textContent = 'Navbatda';
      playerXCard.querySelector('.turn-status').textContent = 'Kutmoqda';
      bannerIcon.textContent = set.type === 'emoji' ? symbolO : '🌸';
      bannerText.textContent = `${getPlayerName('O')} (${symbolO}) ning navbati!`;
    }
  }

  function updateRoundIndicator() {
    currentRoundNumEl.textContent = currentRound;
    roundPills.forEach((pill, idx) => {
      pill.classList.remove('active', 'completed');
      if (idx + 1 === currentRound) {
        pill.classList.add('active');
      } else if (idx + 1 < currentRound) {
        pill.classList.add('completed');
      }
    });
  }

  // --- Mobile Tactile Haptic Vibration ---
  function triggerHaptic(type = 'light') {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (type === 'light') navigator.vibrate(15);
        else if (type === 'medium') navigator.vibrate(35);
        else if (type === 'heavy') navigator.vibrate([40, 30, 40]);
        else if (type === 'win') navigator.vibrate([80, 40, 80, 40, 120]);
      } catch (e) {}
    }
  }

  // --- Dynamic Strike Line Positioner ---
  function drawStrikeLine(combo, winner) {
    const firstCell = cells[combo[0]];
    const lastCell = cells[combo[2]];

    const boardRect = boardEl.getBoundingClientRect();
    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();

    const x1 = firstRect.left + firstRect.width / 2 - boardRect.left;
    const y1 = firstRect.top + firstRect.height / 2 - boardRect.top;
    const x2 = lastRect.left + lastRect.width / 2 - boardRect.left;
    const y2 = lastRect.top + lastRect.height / 2 - boardRect.top;

    const rad = Math.atan2(y2 - y1, x2 - x1);
    const angle = rad * (180 / Math.PI);
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const pad = 18; // extend symmetrically on both sides
    const startX = x1 - Math.cos(rad) * pad;
    const startY = y1 - Math.sin(rad) * pad;
    const totalDist = dist + pad * 2;

    strikeLineEl.className = 'strike-line' + (winner === 'O' ? ' pink-line' : '');
    strikeLineEl.style.top = `${startY}px`;
    strikeLineEl.style.left = `${startX}px`;
    strikeLineEl.style.transform = `translate(0, -50%) rotate(${angle}deg)`;
    strikeLineEl.style.opacity = '1';
    strikeLineEl.style.width = '0px';

    // Trigger animation
    requestAnimationFrame(() => {
      strikeLineEl.style.width = `${totalDist}px`;
    });
  }

  function hideStrikeLine() {
    strikeLineEl.style.opacity = '0';
    strikeLineEl.style.width = '0px';
  }

  // --- Blitz Timer & Infinite Mode Engines ---
  function startBlitzTimer() {
    stopBlitzTimer();
    if (!isBlitzEnabled || !isGameActive) return;

    blitzTimeLeft = 5.0;
    updateBlitzDisplay();

    blitzTimer = setInterval(() => {
      if (!isGameActive) {
        stopBlitzTimer();
        return;
      }

      blitzTimeLeft = Math.max(0, parseFloat((blitzTimeLeft - 0.1).toFixed(1)));
      updateBlitzDisplay();

      // Audio countdown alert in danger zone
      if (blitzTimeLeft === 2.0 || blitzTimeLeft === 1.0) {
        soundFX.playTick();
      }

      if (blitzTimeLeft <= 0) {
        stopBlitzTimer();
        handleTimeUp();
      }
    }, 100);
  }

  function stopBlitzTimer() {
    if (blitzTimer) {
      clearInterval(blitzTimer);
      blitzTimer = null;
    }
    if (blitzTimerContainer) {
      blitzTimerContainer.classList.remove('blitz-danger');
    }
  }

  function updateBlitzDisplay() {
    if (!blitzTimeText || !blitzFill) return;
    blitzTimeText.textContent = `${blitzTimeLeft.toFixed(1)}s`;
    const percent = Math.max(0, Math.min(100, (blitzTimeLeft / 5.0) * 100));
    blitzFill.style.width = `${percent}%`;

    if (blitzTimeLeft <= 2.0) {
      blitzTimerContainer.classList.add('blitz-danger');
    } else {
      blitzTimerContainer.classList.remove('blitz-danger');
    }
  }

  function handleTimeUp() {
    if (!isGameActive) return;
    soundFX.playTimeUp();
    const timedOutPlayer = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateActivePlayerUI();
    updateGhostIndicators();

    bannerIcon.textContent = '⏰';
    bannerText.textContent = `${getPlayerName(timedOutPlayer)} vaqti tugadi! Navbat ${getPlayerName(currentPlayer)}ga o'tdi.`;

    startBlitzTimer();

    if (gameMode === 'ai' && currentPlayer === 'O' && isGameActive) {
      scheduleAiMove();
    }
  }

  function removeCellMark(index) {
    const cell = cells[index];
    if (!cell) return;

    cell.classList.remove('ghost-fade');
    cell.classList.add('vanishing');
    soundFX.playVanish();

    setTimeout(() => {
      board[index] = null;
      cell.innerHTML = '';
      cell.className = 'cell';
    }, 280);
  }

  function updateGhostIndicators() {
    cells.forEach(c => c.classList.remove('ghost-fade'));
    if (!isInfiniteEnabled || !isGameActive) return;

    if (currentPlayer === 'X' && historyX.length >= 3) {
      const oldestX = historyX[0];
      if (cells[oldestX] && board[oldestX] === 'X') {
        cells[oldestX].classList.add('ghost-fade');
        if (bannerText && isGameActive) {
          bannerText.textContent = `${getPlayerName('X')}: ⚠️ Keyingi yurishingizda 1-belgingiz g'oyib bo'ladi!`;
        }
      }
    } else if (currentPlayer === 'O' && historyO.length >= 3) {
      const oldestO = historyO[0];
      if (cells[oldestO] && board[oldestO] === 'O') {
        cells[oldestO].classList.add('ghost-fade');
        if (bannerText && isGameActive && gameMode !== 'ai') {
          bannerText.textContent = `${getPlayerName('O')}: ⚠️ Keyingi yurishingizda 1-belgingiz g'oyib bo'ladi!`;
        }
      }
    }
  }

  // --- Power-ups Engine ---
  function updatePowerUpUI() {
    const currentName = getPlayerName(currentPlayer);
    if (powerActiveName) {
      powerActiveName.textContent = currentName;
    }

    const hasBomb = powerUps[currentPlayer].bomb;
    const hasSkip = powerUps[currentPlayer].skip;

    // Power-ups Dock
    if (activeBombBtn) {
      activeBombBtn.classList.toggle('used', !hasBomb);
      activeBombBtn.classList.toggle('active-power', isBombMode);
    }
    if (bombStatusBadge) {
      bombStatusBadge.textContent = isBombMode ? 'Faol!' : (hasBomb ? '1x' : '0x');
    }

    if (activeSkipBtn) {
      activeSkipBtn.classList.toggle('used', !hasSkip);
    }
    if (skipStatusBadge) {
      skipStatusBadge.textContent = hasSkip ? '1x' : '0x';
    }

    // Hide or dim dock for AI turn & update bomb-active state
    const dockEl = document.getElementById('powerups-dock');
    if (dockEl) {
      dockEl.classList.toggle('bomb-active', isBombMode);
      if (gameMode === 'ai' && currentPlayer === 'O') {
        dockEl.style.opacity = '0.35';
        dockEl.style.pointerEvents = 'none';
      } else {
        dockEl.style.opacity = '1';
        dockEl.style.pointerEvents = 'auto';
      }
    }

    // Fallback buttons
    if (bombXBtn) {
      bombXBtn.classList.toggle('used', !powerUps.X.bomb);
      bombXBtn.classList.toggle('active-power', isBombMode && currentPlayer === 'X');
    }
    if (skipXBtn) {
      skipXBtn.classList.toggle('used', !powerUps.X.skip);
    }
    if (bombOBtn) {
      bombOBtn.classList.toggle('used', !powerUps.O.bomb);
      bombOBtn.classList.toggle('active-power', isBombMode && currentPlayer === 'O');
    }
    if (skipOBtn) {
      skipOBtn.classList.toggle('used', !powerUps.O.skip);
    }

    // Targetable cells during Bomb mode
    cells.forEach((cell, idx) => {
      cell.classList.remove('bomb-targetable');
      if (isBombMode && isGameActive) {
        const opponent = currentPlayer === 'X' ? 'O' : 'X';
        if (board[idx] === opponent) {
          cell.classList.add('bomb-targetable');
        }
      }
    });
  }

  function activateBomb(player) {
    if (currentPlayer !== player || !isGameActive || !powerUps[player].bomb) return;
    const opponent = player === 'X' ? 'O' : 'X';
    const hasOpponentMark = board.some(mark => mark === opponent);
    if (!hasOpponentMark) {
      bannerText.textContent = "Portlatish uchun raqib katagi yo'q!";
      return;
    }

    soundFX.playClick();
    isBombMode = !isBombMode;
    if (isBombMode) {
      bannerIcon.textContent = '💣';
      bannerText.textContent = `${getPlayerName(player)}: Portlatmoqchi bo'lgan raqib katagini bosing! (Bekor qilish uchun qayta bosing)`;
    } else {
      updateActivePlayerUI();
    }
    updatePowerUpUI();
  }

  function activateSkip(player) {
    if (currentPlayer !== player || !isGameActive || !powerUps[player].skip) return;
    powerUps[player].skip = false;
    soundFX.playBlock();
    triggerHaptic('medium');
    bannerIcon.textContent = '🛑';
    bannerText.textContent = `${getPlayerName(player)} raqib yurishini blokladi! Qayta sizning navbatingiz!`;

    startBlitzTimer();
    updatePowerUpUI();
  }

  function handleBombExplode(index) {
    const cell = cells[index];
    cell.classList.remove('bomb-targetable');
    cell.classList.add('exploded');
    soundFX.playExplosion();
    triggerHaptic('heavy');

    board[index] = null;
    if (isInfiniteEnabled) {
      historyX = historyX.filter(i => i !== index);
      historyO = historyO.filter(i => i !== index);
      updateGhostIndicators();
    }

    powerUps[currentPlayer].bomb = false;
    isBombMode = false;
    unlockAchievement('bomb_master');

    setTimeout(() => {
      cell.className = 'cell';
      cell.innerHTML = '';
      updatePowerUpUI();

      // Turn passes to opponent after using bomb
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateActivePlayerUI();
      startBlitzTimer();

      if (gameMode === 'ai' && currentPlayer === 'O' && isGameActive) {
        scheduleAiMove();
      }
    }, 450);
  }

  // --- Game Moves & Flow ---
  function handleCellClick(e) {
    if (isAiThinking || !isGameActive) return;

    const cell = e.currentTarget;
    const index = parseInt(cell.dataset.index, 10);

    // If bomb mode is active, handle bomb target
    if (isBombMode) {
      const opponent = currentPlayer === 'X' ? 'O' : 'X';
      if (board[index] === opponent) {
        handleBombExplode(index);
      } else {
        // Tapped own cell or empty cell: cancel bomb mode cleanly
        isBombMode = false;
        soundFX.playClick();
        bannerText.textContent = "Bomba bekor qilindi. O'z yurishingizni qiling.";
        updatePowerUpUI();
        updateActivePlayerUI();
      }
      return;
    }

    if (gameMode === 'ai' && currentPlayer === 'O') return; // AI's turn, human cannot click
    if (board[index] !== null || cell.classList.contains('vanishing')) return;

    executeMove(index);
  }

  function executeMove(index) {
    stopBlitzTimer();
    triggerHaptic('light');

    const cell = cells[index];
    board[index] = currentPlayer;
    cell.classList.add('taken');
    cell.classList.add(currentPlayer === 'X' ? 'x-cell' : 'o-cell');
    cell.innerHTML = getSymbolContent(currentPlayer);

    // Play move audio
    if (currentPlayer === 'X') {
      soundFX.playMoveX();
    } else {
      soundFX.playMoveO();
    }

    // Infinite Mode Queue Processing:
    // Max 3 marks per player. When 4th is placed, the oldest mark is freed immediately from logic.
    if (isInfiniteEnabled) {
      if (currentPlayer === 'X') {
        historyX.push(index);
        if (historyX.length > 3) {
          const toRemove = historyX.shift();
          board[toRemove] = null; // Clear logic state immediately
          removeCellMark(toRemove);
        }
      } else {
        historyO.push(index);
        if (historyO.length > 3) {
          const toRemove = historyO.shift();
          board[toRemove] = null; // Clear logic state immediately
          removeCellMark(toRemove);
        }
      }
    }

    // Check Outcome
    const winCombo = checkWin(currentPlayer);
    if (winCombo) {
      handleRoundWin(currentPlayer, winCombo);
    } else if (!isInfiniteEnabled && checkDraw()) {
      handleRoundDraw();
    } else {
      // Toggle player turn
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateActivePlayerUI();
      updateGhostIndicators();

      // Start Blitz Timer for next player
      startBlitzTimer();

      // If next player is AI, trigger AI move
      if (gameMode === 'ai' && currentPlayer === 'O' && isGameActive) {
        scheduleAiMove();
      }
    }
  }

  // --- AI Logic & Minimax Algorithm ---
  function scheduleAiMove() {
    if (!isGameActive || currentPlayer !== 'O') return;
    isAiThinking = true;
    bannerIcon.textContent = '🤖';
    bannerText.textContent = "AI Bot o'ylamoqda...";

    setTimeout(() => {
      if (!isGameActive || currentPlayer !== 'O') {
        isAiThinking = false;
        return;
      }

      let chosenIndex;
      if (aiDifficulty === 'easy') {
        chosenIndex = getRandomMove();
      } else {
        chosenIndex = getBestMoveMinimax();
      }

      isAiThinking = false;
      if (chosenIndex !== undefined && chosenIndex !== null && board[chosenIndex] === null) {
        executeMove(chosenIndex);
      }
    }, 450);
  }

  function getRandomMove() {
    const available = [];
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) available.push(i);
    }
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }

  function simulateInfiniteWin(player, moveIdx) {
    const queue = player === 'X' ? [...historyX] : [...historyO];
    const b = [...board];
    b[moveIdx] = player;
    queue.push(moveIdx);
    if (queue.length > 3) {
      const rem = queue.shift();
      b[rem] = null;
    }
    for (const combo of WINNING_COMBOS) {
      if (b[combo[0]] === player && b[combo[1]] === player && b[combo[2]] === player) {
        return true;
      }
    }
    return false;
  }

  function getBestMoveMinimax() {
    let bestScore = -Infinity;
    let bestMove = null;

    const available = [];
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) available.push(i);
    }

    // Quick optimal heuristic for early moves
    if (available.length === 9) return 4; // Center
    if (available.length === 8 && board[4] === null) return 4; // Grab center if empty

    // In Disappearing (Infinite) Mode:
    if (isInfiniteEnabled) {
      // Tactical check 1: Can AI win immediately with vanishing logic?
      for (let i = 0; i < available.length; i++) {
        const idx = available[i];
        if (simulateInfiniteWin('O', idx)) {
          return idx;
        }
      }

      // Tactical check 2: Can human win on next move? Block them!
      for (let i = 0; i < available.length; i++) {
        const idx = available[i];
        if (simulateInfiniteWin('X', idx)) {
          return idx;
        }
      }

      // Tactical check 3: Prioritize center, then corners
      if (board[4] === null) return 4;
      const corners = [0, 2, 6, 8].filter(c => board[c] === null);
      if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
      return getRandomMove();
    }

    // Classic Minimax Mode:
    // Direct tactical check 1: Can AI win immediately?
    for (let i = 0; i < available.length; i++) {
      const idx = available[i];
      board[idx] = 'O';
      if (checkWin('O')) {
        board[idx] = null;
        return idx;
      }
      board[idx] = null;
    }

    // Direct tactical check 2: Can human win on next move? Block them!
    for (let i = 0; i < available.length; i++) {
      const idx = available[i];
      board[idx] = 'X';
      if (checkWin('X')) {
        board[idx] = null;
        return idx;
      }
      board[idx] = null;
    }

    for (let i = 0; i < available.length; i++) {
      const idx = available[i];
      board[idx] = 'O';
      let score = minimax(board, 0, false);
      board[idx] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = idx;
      }
    }

    return bestMove !== null ? bestMove : getRandomMove();
  }

  function checkWinnerOnBoard(bd) {
    for (const combo of WINNING_COMBOS) {
      if (bd[combo[0]] && bd[combo[0]] === bd[combo[1]] && bd[combo[0]] === bd[combo[2]]) {
        return bd[combo[0]];
      }
    }
    if (bd.every(c => c !== null)) return 'draw';
    return null;
  }

  function minimax(bd, depth, isMaximizing) {
    const result = checkWinnerOnBoard(bd);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'draw') return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (bd[i] === null) {
          bd[i] = 'O';
          let evaluation = minimax(bd, depth + 1, false);
          bd[i] = null;
          maxEval = Math.max(maxEval, evaluation);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (bd[i] === null) {
          bd[i] = 'X';
          let evaluation = minimax(bd, depth + 1, true);
          bd[i] = null;
          minEval = Math.min(minEval, evaluation);
        }
      }
      return minEval;
    }
  }

  function checkWin(player) {
    for (const combo of WINNING_COMBOS) {
      if (
        board[combo[0]] === player &&
        board[combo[1]] === player &&
        board[combo[2]] === player
      ) {
        return combo;
      }
    }
    return null;
  }

  function checkDraw() {
    return board.every(cell => cell !== null);
  }

  function handleRoundWin(winner, combo) {
    stopBlitzTimer();
    isGameActive = false;
    scores[winner]++;

    // Highlight winning cells
    combo.forEach(idx => {
      cells[idx].classList.add('win-highlight');
    });

    drawStrikeLine(combo, winner);
    soundFX.playRoundWin();
    triggerHaptic('win');
    confetti.fire(1800, 80);

    // Update score elements
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;

    const winnerName = getPlayerName(winner);
    bannerIcon.textContent = '🎉';
    bannerText.textContent = `${winnerName} (${winner}) ushbu roundda g'alaba qozondi!`;

    setTimeout(() => {
      onRoundFinished(winner);
    }, 1200);
  }

  function handleRoundDraw() {
    stopBlitzTimer();
    isGameActive = false;
    scores.draw++;
    scoreDrawEl.textContent = scores.draw;

    soundFX.playDraw();
    bannerIcon.textContent = '🤝';
    bannerText.textContent = `Durang! Hech kim ball olmadi.`;

    setTimeout(() => {
      onRoundFinished('draw');
    }, 1100);
  }

  function onRoundFinished(winner) {
    stopBlitzTimer();
    if (currentRound < TOTAL_ROUNDS) {
      // Show Round Modal
      roundModalTag.textContent = `${currentRound}-ROUND YAKUNI`;
      if (winner === 'draw') {
        roundModalTitle.textContent = "Durang!";
        roundModalDesc.textContent = "Ushbu round teng yakunlandi.";
      } else {
        roundModalTitle.textContent = `${winner}-G'olib!`;
        roundModalDesc.textContent = `${getPlayerName(winner)} 1 ballni qo'lga kiritdi!`;
      }

      summaryXName.textContent = getPlayerName('X');
      summaryOName.textContent = getPlayerName('O');
      summaryXScore.textContent = scores.X;
      summaryOScore.textContent = scores.O;

      roundModal.classList.remove('hidden');
    } else {
      // 3 Rounds Completed -> Grand Championship
      showGrandChampionModal();
    }
  }

  function startNextRound() {
    soundFX.playClick();
    roundModal.classList.add('hidden');

    currentRound++;
    updateRoundIndicator();

    // Alternate starting player for balance
    roundStarter = roundStarter === 'X' ? 'O' : 'X';
    currentPlayer = roundStarter;

    resetBoardOnly();
    updateActivePlayerUI();
    startBlitzTimer();

    // If AI's turn to start this round
    if (gameMode === 'ai' && currentPlayer === 'O') {
      scheduleAiMove();
    }
  }

  function resetBoardOnly() {
    stopBlitzTimer();
    board = Array(9).fill(null);
    historyX = [];
    historyO = [];
    isGameActive = true;
    hideStrikeLine();

    powerUps = {
      X: { bomb: true, skip: true },
      O: { bomb: true, skip: true }
    };
    isBombMode = false;

    cells.forEach(cell => {
      cell.innerHTML = '';
      cell.className = 'cell';
    });

    updateGhostIndicators();
    updatePowerUpUI();
  }

  function showGrandChampionModal() {
    confetti.fire(4500, 200);
    soundFX.playChampionship();

    // Update match stats in localStorage
    stats.totalMatches++;
    if (scores.X > scores.O) {
      stats.xWins++;
      stats.winStreak++;
      unlockAchievement('first_win');
      if (stats.winStreak >= 3) unlockAchievement('streak_3');
      if (isBlitzEnabled) unlockAchievement('blitz_master');
      if (gameMode === 'ai' && aiDifficulty === 'hard') unlockAchievement('ai_slayer');
    } else if (scores.O > scores.X) {
      stats.oWins++;
      stats.winStreak = 0;
    } else {
      stats.draws++;
      stats.winStreak = 0;
      if (gameMode === 'ai' && aiDifficulty === 'hard') unlockAchievement('ai_slayer');
    }
    saveStats();
    renderStatsUI();

    finalXName.textContent = getPlayerName('X');
    finalOName.textContent = getPlayerName('O');
    finalXScore.textContent = `${scores.X} ball`;
    finalOScore.textContent = `${scores.O} ball`;
    finalDrawsText.textContent = `Duranglar soni: ${scores.draw}`;

    if (scores.X > scores.O) {
      championName.textContent = getPlayerName('X').toUpperCase();
      championDesc.textContent = `Ajoyib o'yin ko'rsatib, 3 round natijasiga ko'ra mutlaq Chempion bo'ldi! 🏆`;
    } else if (scores.O > scores.X) {
      championName.textContent = getPlayerName('O').toUpperCase();
      championDesc.textContent = `Ajoyib o'yin ko'rsatib, 3 round natijasiga ko'ra mutlaq Chempion bo'ldi! 🏆`;
    } else {
      championName.textContent = "DO'STLIK G'ALABA QOZONDI!";
      championDesc.textContent = `3 round yakunida hisob teng bo'ldi (${scores.X} : ${scores.O}). Haqiqiy shiddatli jang!`;
    }

    championModal.classList.remove('hidden');
  }

  function resetEntireMatch() {
    soundFX.playClick();
    championModal.classList.add('hidden');
    roundModal.classList.add('hidden');

    currentRound = 1;
    scores = { X: 0, O: 0, draw: 0 };
    scoreXEl.textContent = '0';
    scoreOEl.textContent = '0';
    scoreDrawEl.textContent = '0';

    roundStarter = 'X';
    currentPlayer = 'X';

    updateRoundIndicator();
    resetBoardOnly();
    updateActivePlayerUI();
    startBlitzTimer();
  }

  // --- Event Listeners ---
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  nextRoundBtn.addEventListener('click', startNextRound);
  newMatchBtn.addEventListener('click', resetEntireMatch);

  resetMatchBtn.addEventListener('click', () => {
    if (confirm("Butun o'yinni va ballarni boshidan boshlamoqchimisiz?")) {
      resetEntireMatch();
    }
  });

  soundToggleBtn.addEventListener('click', () => {
    const isNowOn = soundFX.toggle();
    if (isNowOn) {
      soundIconOn.classList.remove('hidden');
      soundIconOff.classList.add('hidden');
      soundFX.playClick();
    } else {
      soundIconOn.classList.add('hidden');
      soundIconOff.classList.remove('hidden');
    }
  });

  // Name change real-time sync
  playerXNameInput.addEventListener('input', () => {
    if (currentPlayer === 'X') updateActivePlayerUI();
  });

  playerONameInput.addEventListener('input', () => {
    if (currentPlayer === 'O') updateActivePlayerUI();
  });

  // Mode Selection Handlers
  modePvpBtn.addEventListener('click', () => {
    if (gameMode === 'pvp') return;
    soundFX.playClick();
    gameMode = 'pvp';
    modePvpBtn.classList.add('active');
    modeAiBtn.classList.remove('active');
    difficultyGroup.classList.add('hidden');
    if (playerONameDisplay) playerONameDisplay.textContent = "O'yinchi 2";
    playerONameInput.value = "O'yinchi 2";
    playerONameInput.disabled = false;
    resetEntireMatch();
  });

  modeAiBtn.addEventListener('click', () => {
    if (gameMode === 'ai') return;
    soundFX.playClick();
    gameMode = 'ai';
    modeAiBtn.classList.add('active');
    modePvpBtn.classList.remove('active');
    difficultyGroup.classList.remove('hidden');
    if (playerONameDisplay) playerONameDisplay.textContent = "AI Bot";
    playerONameInput.value = "AI Bot";
    playerONameInput.disabled = true;
    resetEntireMatch();
  });

  // Difficulty Handlers
  diffEasyBtn.addEventListener('click', () => {
    soundFX.playClick();
    aiDifficulty = 'easy';
    diffEasyBtn.classList.add('active');
    diffHardBtn.classList.remove('active');
  });

  diffHardBtn.addEventListener('click', () => {
    soundFX.playClick();
    aiDifficulty = 'hard';
    diffHardBtn.classList.add('active');
    diffEasyBtn.classList.remove('active');
  });

  // Modifiers & Rule Handlers (Blitz & Infinite)
  toggleBlitzBtn.addEventListener('click', () => {
    soundFX.playClick();
    isBlitzEnabled = !isBlitzEnabled;
    if (isBlitzEnabled) {
      toggleBlitzBtn.classList.add('active');
      blitzStatus.textContent = 'ON';
      blitzTimerContainer.classList.remove('hidden');
      startBlitzTimer();
    } else {
      toggleBlitzBtn.classList.remove('active');
      blitzStatus.textContent = 'OFF';
      blitzTimerContainer.classList.add('hidden');
      stopBlitzTimer();
    }
  });

  function setInfiniteMode(enabled) {
    soundFX.playClick();
    isInfiniteEnabled = enabled;

    if (ruleClassicBtn) ruleClassicBtn.classList.toggle('active', !isInfiniteEnabled);
    if (ruleInfiniteBtn) ruleInfiniteBtn.classList.toggle('active', isInfiniteEnabled);
    if (toggleInfiniteBtn) toggleInfiniteBtn.classList.toggle('active', isInfiniteEnabled);
    if (infiniteStatus) infiniteStatus.textContent = isInfiniteEnabled ? 'ON' : 'OFF';
    if (infiniteModeBanner) infiniteModeBanner.classList.toggle('hidden', !isInfiniteEnabled);

    // Clean reset of match state for seamless transition
    resetEntireMatch();

    bannerIcon.textContent = isInfiniteEnabled ? '🔥' : '⚔️';
    bannerText.textContent = isInfiniteEnabled
      ? "G'oyib bo'luvchi rejim yoqildi! Doskada har o'yinchida ko'pi bilan 3 ta belgi turadi."
      : "Klassik rejim faol! 3 ta ketma-ket katakni egallang.";
  }

  if (ruleClassicBtn) {
    ruleClassicBtn.addEventListener('click', () => {
      if (!isInfiniteEnabled) return;
      setInfiniteMode(false);
    });
  }

  if (ruleInfiniteBtn) {
    ruleInfiniteBtn.addEventListener('click', () => {
      if (isInfiniteEnabled) return;
      setInfiniteMode(true);
    });
  }

  if (toggleInfiniteBtn) {
    toggleInfiniteBtn.addEventListener('click', () => {
      setInfiniteMode(!isInfiniteEnabled);
    });
  }

  // Creator Modal Handlers
  const aboutCreatorBtn = document.getElementById('about-creator-btn');
  const openCreatorModalFooter = document.getElementById('open-creator-modal-footer');
  const creatorModal = document.getElementById('creator-modal');
  const closeCreatorBtn = document.getElementById('close-creator-btn');

  function openCreatorModal() {
    soundFX.playClick();
    creatorModal.classList.remove('hidden');
  }

  function closeCreatorModal() {
    soundFX.playClick();
    creatorModal.classList.add('hidden');
  }

  if (aboutCreatorBtn) aboutCreatorBtn.addEventListener('click', openCreatorModal);
  if (openCreatorModalFooter) openCreatorModalFooter.addEventListener('click', openCreatorModal);
  if (closeCreatorBtn) closeCreatorBtn.addEventListener('click', closeCreatorModal);

  if (creatorModal) {
    creatorModal.addEventListener('click', (e) => {
      if (e.target === creatorModal) {
        closeCreatorModal();
      }
    });
  }

  // Theme & Symbols Modal Handlers
  const themeModalBtn = document.getElementById('theme-modal-btn');
  const symbolsModalBtn = document.getElementById('symbols-modal-btn');
  const themeModal = document.getElementById('theme-modal');
  const symbolsModal = document.getElementById('symbols-modal');
  const closeThemeBtn = document.getElementById('close-theme-btn');
  const closeSymbolsBtn = document.getElementById('close-symbols-btn');

  function openThemeModal() {
    soundFX.playClick();
    themeModal.classList.remove('hidden');
  }

  function closeThemeModal() {
    soundFX.playClick();
    themeModal.classList.add('hidden');
  }

  function openSymbolsModal() {
    soundFX.playClick();
    symbolsModal.classList.remove('hidden');
  }

  function closeSymbolsModal() {
    soundFX.playClick();
    symbolsModal.classList.add('hidden');
  }

  function setTheme(themeName) {
    soundFX.playClick();
    currentTheme = themeName;
    if (themeName === 'cyberpunk') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', themeName);
    }
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.toggle('active', card.dataset.theme === themeName);
    });
  }

  function setSymbolSet(setName) {
    if (!SYMBOL_SETS[setName]) return;
    soundFX.playClick();
    currentSymbolSet = setName;
    document.querySelectorAll('.symbol-card').forEach(card => {
      card.classList.toggle('active', card.dataset.symbolSet === setName);
    });
    updatePlayerCardSymbols();
    updateActivePlayerUI();
  }

  if (themeModalBtn) themeModalBtn.addEventListener('click', openThemeModal);
  if (closeThemeBtn) closeThemeBtn.addEventListener('click', closeThemeModal);
  if (themeModal) {
    themeModal.addEventListener('click', (e) => {
      if (e.target === themeModal) closeThemeModal();
    });
  }

  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
      setTheme(card.dataset.theme);
    });
  });

  if (symbolsModalBtn) symbolsModalBtn.addEventListener('click', openSymbolsModal);
  if (closeSymbolsBtn) closeSymbolsBtn.addEventListener('click', closeSymbolsModal);
  if (symbolsModal) {
    symbolsModal.addEventListener('click', (e) => {
      if (e.target === symbolsModal) closeSymbolsModal();
    });
  }

  document.querySelectorAll('.symbol-card').forEach(card => {
    card.addEventListener('click', () => {
      setSymbolSet(card.dataset.symbolSet);
    });
  });

  // --- Power-ups Event Listeners ---
  if (activeBombBtn) {
    activeBombBtn.addEventListener('click', () => activateBomb(currentPlayer));
  }
  if (activeSkipBtn) {
    activeSkipBtn.addEventListener('click', () => activateSkip(currentPlayer));
  }

  // Fallback listeners for individual player buttons
  if (bombXBtn) bombXBtn.addEventListener('click', () => activateBomb('X'));
  if (skipXBtn) skipXBtn.addEventListener('click', () => activateSkip('X'));
  if (bombOBtn) bombOBtn.addEventListener('click', () => activateBomb('O'));
  if (skipOBtn) skipOBtn.addEventListener('click', () => activateSkip('O'));

  // --- In-game Rename Modal Logic (Mobile Optimized) ---
  const renameModal = document.getElementById('rename-modal');
  const renameModalTitle = document.getElementById('rename-modal-title');
  const renameModalDesc = document.getElementById('rename-modal-desc');
  const renameModalInput = document.getElementById('rename-modal-input');
  const saveRenameBtn = document.getElementById('save-rename-btn');
  const cancelRenameBtn = document.getElementById('cancel-rename-btn');
  let renamingPlayerKey = null;

  function openRenameModal(playerKey) {
    if (gameMode === 'ai' && playerKey === 'O') return;
    renamingPlayerKey = playerKey;
    const currentName = playerKey === 'X' ? getPlayerName('X') : getPlayerName('O');
    if (renameModalTitle) {
      renameModalTitle.textContent = playerKey === 'X' ? "1-O'yinchi (X) Ismi" : "2-O'yinchi (O) Ismi";
    }
    if (renameModalDesc) {
      renameModalDesc.textContent = "Yangi ismni kiriting (maksimal 12 harf):";
    }
    if (renameModalInput) {
      renameModalInput.value = currentName;
      setTimeout(() => {
        renameModalInput.focus();
        renameModalInput.select();
      }, 100);
    }
    soundFX.playClick();
    triggerHaptic('light');
    if (renameModal) renameModal.classList.remove('hidden');
  }

  function closeRenameModal() {
    if (renameModal) renameModal.classList.add('hidden');
    renamingPlayerKey = null;
  }

  function savePlayerRename() {
    if (!renamingPlayerKey || !renameModalInput) return;
    const raw = renameModalInput.value.trim();
    const fallback = renamingPlayerKey === 'X' ? "O'yinchi 1" : (gameMode === 'ai' ? "AI Bot" : "O'yinchi 2");
    const clean = (raw || fallback).substring(0, 12);

    if (renamingPlayerKey === 'X') {
      if (playerXNameDisplay) playerXNameDisplay.textContent = clean;
      if (playerXNameInput) playerXNameInput.value = clean;
    } else {
      if (playerONameDisplay) playerONameDisplay.textContent = clean;
      if (playerONameInput) playerONameInput.value = clean;
    }

    soundFX.playClick();
    triggerHaptic('medium');
    closeRenameModal();
    updateActivePlayerUI();
    updatePowerUpUI();
  }

  if (saveRenameBtn) saveRenameBtn.addEventListener('click', savePlayerRename);
  if (cancelRenameBtn) cancelRenameBtn.addEventListener('click', () => {
    soundFX.playClick();
    closeRenameModal();
  });
  if (renameModal) {
    renameModal.addEventListener('click', (e) => {
      if (e.target === renameModal) {
        soundFX.playClick();
        closeRenameModal();
      }
    });
  }
  if (renameModalInput) {
    renameModalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        savePlayerRename();
      } else if (e.key === 'Escape') {
        closeRenameModal();
      }
    });
  }

  const playerXTrigger = document.getElementById('player-x-name-trigger');
  const playerOTrigger = document.getElementById('player-o-name-trigger');
  if (playerXTrigger) playerXTrigger.addEventListener('click', () => openRenameModal('X'));
  if (playerOTrigger) playerOTrigger.addEventListener('click', () => openRenameModal('O'));
  if (playerXNameDisplay) playerXNameDisplay.addEventListener('click', () => openRenameModal('X'));
  if (playerONameDisplay) playerONameDisplay.addEventListener('click', () => openRenameModal('O'));

  // One-time mobile audio unlock on first touch/click
  const unlockAudio = () => {
    soundFX.init();
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('pointerdown', unlockAudio);
  };
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('pointerdown', unlockAudio, { passive: true });

  // --- Stats & Achievements Engine ---
  const LOCAL_STORAGE_KEY = 'x0_arena_stats_v1';

  function loadStats() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          stats = Object.assign({
            totalMatches: 0,
            xWins: 0,
            oWins: 0,
            draws: 0,
            winStreak: 0,
            achievements: {}
          }, parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
    if (!stats.achievements || typeof stats.achievements !== 'object') {
      stats.achievements = {};
    }
    renderStatsUI();
  }

  function saveStats() {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  }

  function renderStatsUI() {
    if (statTotalMatchesEl) statTotalMatchesEl.textContent = stats.totalMatches || 0;
    if (statXWinsEl) statXWinsEl.textContent = stats.xWins || 0;
    if (statOWinsEl) statOWinsEl.textContent = stats.oWins || 0;
    if (statDrawsEl) statDrawsEl.textContent = stats.draws || 0;

    const achieveIds = {
      first_win: 'achieve-first-win',
      streak_3: 'achieve-streak-3',
      ai_slayer: 'achieve-ai-slayer',
      bomb_master: 'achieve-bomb-master',
      blitz_master: 'achieve-blitz-master'
    };

    Object.keys(achieveIds).forEach(key => {
      const el = document.getElementById(achieveIds[key]);
      if (el) {
        const isUnlocked = !!(stats && stats.achievements && stats.achievements[key]);
        el.classList.toggle('unlocked', isUnlocked);
        el.classList.toggle('locked', !isUnlocked);
        const statusSpan = el.querySelector('.achieve-badge-status');
        if (statusSpan) {
          statusSpan.textContent = isUnlocked ? 'Ochilgan ✨' : 'Qulflangan 🔒';
        }
      }
    });
  }

  function unlockAchievement(key) {
    if (!stats.achievements[key]) {
      stats.achievements[key] = true;
      saveStats();
      renderStatsUI();
      soundFX.playAchievement();
      confetti.fire(2200, 70);
    }
  }

  function resetStats() {
    if (confirm("Haqiqatan ham barcha statistika va yutuqlarni tozalashni xohlaysizmi?")) {
      stats = {
        totalMatches: 0,
        xWins: 0,
        oWins: 0,
        draws: 0,
        winStreak: 0,
        achievements: {}
      };
      saveStats();
      renderStatsUI();
      soundFX.playClick();
    }
  }

  function openStatsModal() {
    soundFX.playClick();
    renderStatsUI();
    statsModal.classList.remove('hidden');
  }

  function closeStatsModal() {
    soundFX.playClick();
    statsModal.classList.add('hidden');
  }

  if (statsModalBtn) statsModalBtn.addEventListener('click', openStatsModal);
  if (closeStatsBtn) closeStatsBtn.addEventListener('click', closeStatsModal);
  if (resetStatsBtn) resetStatsBtn.addEventListener('click', resetStats);

  if (statsModal) {
    statsModal.addEventListener('click', (e) => {
      if (e.target === statsModal) closeStatsModal();
    });
  }

  // Initialize
  loadStats();
  updateRoundIndicator();
  updatePlayerCardSymbols();
  updateActivePlayerUI();
  updatePowerUpUI();

})();
