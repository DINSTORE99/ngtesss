import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
/* ========================================================
   CONFIG
========================================================= */

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAEPIh3nGXRyGDzYt";

/* =========================================================
   API DATA
========================================================= */

const API_CATEGORIES = [ 
   /* =========================================================
   AI
========================================================= */
{
  name: "AI Duckai",
  method: "GET",
  path: "/api/ai/duckai",
  description: "Chat with DuckAI using various AI models.",
  params: [
    {
      name: "message",
      label: "MESSAGE",
      placeholder: "What is the meaning of life?",
      required: true,
    },
    {
      name: "model",
      label: "MODEL",
      type: "select",
      default: "gpt-4o-mini",
      options: [
        "gpt-4o-mini",
        "claude-3-5-haiku-latest",
        "meta-llama/Llama-4-Scout-17B-16E-Instruct",
        "mistralai/Mistral-Small-24B-Instruct-2501",
        "openai/gpt-oss-120b",
        "gpt-5-mini",
      ],
      required: false,
    },
    {
      name: "systemPrompt",
      label: "SYSTEMPROMPT",
      placeholder: "You are a helpful assistant.",
      required: false,
    },
  ],
},
      {
  name: "Flixier AI Image",
  method: "GET",
  path: "/api/ai/flixier",
  description: "Generate image menggunakan Flixier AI",
  params: [
    {
      name: "prompt",
      label: "Prompt",
      placeholder: "futuristic warrior cat",
      required: true,
    },
    {
      name: "style",
      label: "Style",
      placeholder: "cinematic",
      required: false,
    },
    {
      name: "negative",
      label: "Negative Prompt",
      placeholder: "blur",
      required: false,
    },
    {
      name: "ratio",
      label: "Aspect Ratio",
      placeholder: "2:3",
      required: false,
    },
  ],
}, 
      {
        name: "AI Lyrics Generator",
        method: "GET",
        path: "/api/ai/lyricsgen",
        description: "Generate lyrics menggunakan AI.",
        params: [
          {
            name: "theme",
            label: "Theme",
            placeholder: "persahabatan",
            required: true,
          },
          {
            name: "genre",
            label: "Genre",
            placeholder: "pop",
            required: false,
          },
          {
            name: "emotion",
            label: "Emotion",
            placeholder: "happy",
            required: false,
          },
          {
            name: "lang",
            label: "Language",
            placeholder: "Indonesia",
            required: false,
          },
        ],
      },
      {
        name: "AI Coder",
        method: "GET",
        path: "/api/tools/aicoder",
        description: "Generate source code menggunakan AI.",
        params: [
          {
            name: "prompt",
            label: "Prompt",
            placeholder: "buat landing page modern",
            required: true,
          },
        ],
      },
      {
        name: "AI Chat",
        method: "GET",
        path: "/api/ai/chat",
        description: "General AI chat endpoint.",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Jelaskan JavaScript",
            required: true,
          },
        ],
      },
    ],
  },
/* =========================================================
   ADMIN
========================================================= */
  {
    name: "ADMIN",
    icon: "◇",
    color: "red",
    path: "/docs/admin",
    endpoints: [
      {
        name: "Admin Status",
        method: "GET",
        path: "/api/admin/status",
        description: "Check API admin status.",
        params: [],
      },
      {
        name: "Admin Info",
        method: "GET",
        path: "/api/admin/info",
        description: "Get admin information.",
        params: [],
      },
      {
        name: "Server Status",
        method: "GET",
        path: "/api/admin/server",
        description: "Check server status.",
        params: [],
      },
    ],
  },
/* =========================================================
   CACHE
========================================================= */
  {
    name: "CACHE",
    icon: "▣",
    color: "cyan",
    path: "/docs/cache",
    endpoints: [
      {
        name: "Cache Get",
        method: "GET",
        path: "/api/cache/get",
        description: "Get cached data.",
        params: [
          {
            name: "key",
            label: "Key",
            placeholder: "example",
            required: true,
          },
        ],
      },
      {
        name: "Cache Clear",
        method: "GET",
        path: "/api/cache/clear",
        description: "Clear cache.",
        params: [],
      },
    ],
  },
/* =========================================================
   DOWNLOAD 
========================================================= */
  {
    name: "DOWNLOAD",
    icon: "⇩",
    color: "blue",
    path: "/docs/download",
    endpoints: [
      {
        name: "TikTok Downloader",
        method: "GET",
        path: "/api/download/tiktok",
        description: "Download video TikTok.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://vt.tiktok.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Instagram Downloader",
        method: "GET",
        path: "/api/download/instagram",
        description: "Download Instagram media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://instagram.com/...",
            required: true,
          },
        ],
      },
      {
        name: "CapCut Downloader",
        method: "GET",
        path: "/api/download/capcut",
        description: "Download CapCut media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.capcut.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Facebook Downloader",
        method: "GET",
        path: "/api/download/facebook",
        description: "Download Facebook media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://facebook.com/...",
            required: true,
          },
        ],
      },
      {
        name: "MediaFire Downloader",
        method: "GET",
        path: "/api/download/mediafire",
        description: "Download MediaFire files.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://mediafire.com/...",
            required: true,
          },
        ],
      },
      {
  name: "DramaBox Downloader",
  method: "GET",
  path: "/api/download/dramabox",
  description: "Download video dan mengambil data DramaBox",
  params: [
    {
      name: "url",
      label: "URL DramaBox",
      placeholder: "https://dramabox.com/...",
      required: true,
    },
  ],
}, 
      {
        name: "Pinterest Downloader",
        method: "GET",
        path: "/api/download/pinterest",
        description: "Download Pinterest media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://pinterest.com/...",
            required: true,
          },
        ],
      },
    ],
  },

  /* =========================================================
   FUN
========================================================= */ 
  {
    name: "FUN",
    icon: "🎮",
    color: "pink",
    path: "/docs/fun",
    endpoints: [
      {
        name: "Truth",
        method: "GET",
        path: "/api/fun/truth",
        description: "Random truth question.",
        params: [],
      },
      {
        name: "Dare",
        method: "GET",
        path: "/api/fun/dare",
        description: "Random dare challenge.",
        params: [],
      },
      {
        name: "Joke",
        method: "GET",
        path: "/api/fun/joke",
        description: "Generate random joke.",
        params: [],
      },
    ],
  },
/* =========================================================
   LEADERBOARD 
========================================================= */
  {
    name: "LEADERBOARD",
    icon: "🏆",
    color: "yellow",
    path: "/docs/leaderboard",
    endpoints: [
      {
        name: "Leaderboard",
        method: "GET",
        path: "/api/leaderboard",
        description: "Get leaderboard data.",
        params: [],
      },
    ],
  },
/* =========================================================
   LIBARY
========================================================= */
  {
    name: "LIBRARY",
    icon: "▤",
    color: "orange",
    path: "/docs/library",
    endpoints: [
      {
        name: "Books",
        method: "GET",
        path: "/api/library/books",
        description: "Search library books.",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "javascript",
            required: true,
          },
        ],
      },
      {
        name: "Anime",
        method: "GET",
        path: "/api/library/anime",
        description: "Search anime library.",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "naruto",
            required: true,
          },
        ],
      },
      {
        name: "Movies",
        method: "GET",
        path: "/api/library/movies",
        description: "Search movie library.",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "avengers",
            required: true,
          },
        ],
      },
    ],
  },
/* =========================================================
   MAKER
========================================================= */
  {
    name: "MAKER",
    icon: "🎨",
    color: "purple",
    path: "/docs/maker",
    endpoints: [
      {
        name: "QR Maker",
        method: "GET",
        path: "/api/maker/qr",
        description: "Generate QR code.",
        params: [
          {
            name: "text",
            label: "Text",
            placeholder: "Hello World",
            required: true,
          },
        ],
      },
      {
        name: "Logo Maker",
        method: "GET",
        path: "/api/maker/logo",
        description: "Generate logo.",
        params: [
          {
            name: "text",
            label: "Text",
            placeholder: "DINSTORE",
            required: true,
          },
        ],
      },
    ],
  },
/* =========================================================
   NEWS
========================================================= */
{
  name: "NEWS",
  icon: "▤",
  color: "cyan",
  path: "/docs/news",

  endpoints: [
    {
      name: "Latest News",
      method: "GET",
      path: "/api/news/latest",
      description: "Get latest news.",
      params: [],
    },

    {
      name: "Kompas News",
      method: "GET",
      path: "/api/news/kompas",
      description: "Mengambil berita terbaru dari Kompas.com",
      params: [],
    },

    {
      name: "Detik News",
      method: "GET",
      path: "/api/news/detik",
      description: "Mengambil berita terbaru dari Detik.com",
      params: [],
    },

    {
      name: "Search News",
      method: "GET",
      path: "/api/news/search",
      description: "Search news.",
      params: [
        {
          name: "q",
          label: "Query",
          placeholder: "teknologi",
          required: true,
        },
      ],
    },
  ],
},
/* =========================================================
   RANDOM
========================================================= */
  {
    name: "RANDOM",
    icon: "◆",
    color: "violet",
    path: "/docs/random",
    endpoints: [
      {
        name: "Random Image",
        method: "GET",
        path: "/api/random/image",
        description: "Get random image.",
        params: [],
      },
      {
        name: "Random Number",
        method: "GET",
        path: "/api/random/number",
        description: "Generate random number.",
        params: [
          {
            name: "min",
            label: "Minimum",
            placeholder: "1",
            required: false,
          },
          {
            name: "max",
            label: "Maximum",
            placeholder: "100",
            required: false,
          },
        ],
      },
    ],
  },
/* =========================================================
   SEARCH 
========================================================= */
  {
    name: "SEARCH",
    icon: "⌕",
    color: "green",
    path: "/docs/search",
    endpoints: [
      {
        name: "Google Search",
        method: "GET",
        path: "/api/search/google",
        description: "Search Google.",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "DINSTORE API",
            required: true,
          },
        ],
      },
      {
        name: "YouTube Search",
        method: "GET",
        path: "/api/search/youtube",
        description: "Search YouTube.",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "music",
            required: true,
          },
        ],
      },
    ],
  },
/* =========================================================
   STALK 
========================================================= */
  {
    name: "STALK",
    icon: "◉",
    color: "pink",
    path: "/docs/stalk",
    endpoints: [
      {
        name: "TikTok Stalk",
        method: "GET",
        path: "/api/stalk/tiktok",
        description: "Get public TikTok profile information.",
        params: [
          {
            name: "username",
            label: "Username",
            placeholder: "username",
            required: true,
          },
        ],
      },
      {
        name: "Instagram Stalk",
        method: "GET",
        path: "/api/stalk/instagram",
        description: "Get public Instagram profile information.",
        params: [
          {
            name: "username",
            label: "Username",
            placeholder: "username",
            required: true,
          },
        ],
      },
    ],
  },
/* =========================================================
   TOOLS 
========================================================= */
  {
    name: "TOOLS",
    icon: "⌘",
    color: "orange",
    path: "/docs/tools",
    endpoints: [
      {
        name: "Domain Info",
        method: "GET",
        path: "/api/tools/domaininfo",
        description: "Check domain information.",
        params: [
          {
            name: "domain",
            label: "Domain",
            placeholder: "domainmu.com",
            required: true,
          },
        ],
      },
      {
        name: "WhatsApp Ban Checker",
        method: "GET",
        path: "/api/tools/checker-ban-wa",
        description: "Check whether a WhatsApp number is blocked/banned.",
        params: [
          {
            name: "number",
            label: "NUMBER",
            placeholder: "628123456789",
            required: true,
          },
        ],
      },
      {
        name: "QR Generator",
        method: "GET",
        path: "/api/tools/qr",
        description: "Generate QR code.",
        params: [
          {
            name: "text",
            label: "Text",
            placeholder: "Hello World",
            required: true,
          },
        ],
      },
      {
        name: "Short URL",
        method: "GET",
        path: "/api/tools/shorturl",
        description: "Shorten URL.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://example.com",
            required: true,
          },
        ],
      },
    ],
  },
];

/* =========================================================
   APP / TURNSTILE GATE
========================================================= */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [verified, setVerified] = useState(false);
   /// tess
const [showDevPopup, setShowDevPopup] = useState(true);
  const totalEndpoints = API_CATEGORIES.reduce(
    (total, category) => total + category.endpoints.length,
    0
  );

  /* Load Cloudflare Turnstile once, before the documentation is shown. */
  useEffect(() => {
    if (window.turnstile) {
      setTurnstileReady(true);
      return;
    }

    const existing = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    );

    const script =
      existing ||
      document.createElement("script");

    if (!existing) {
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const onLoad = () => setTurnstileReady(true);

    if (window.turnstile) {
      setTurnstileReady(true);
    } else {
      script.addEventListener("load", onLoad);
    }

    return () => {
      script.removeEventListener?.("load", onLoad);
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return API_CATEGORIES;
    }

    return API_CATEGORIES
      .map((category) => {
        const categoryMatch = category.name
          .toLowerCase()
          .includes(keyword);

        const endpoints = category.endpoints.filter(
          (endpoint) =>
            endpoint.name
              .toLowerCase()
              .includes(keyword) ||
            endpoint.path
              .toLowerCase()
              .includes(keyword) ||
            endpoint.description
              .toLowerCase()
              .includes(keyword)
        );

        if (categoryMatch) {
          return category;
        }

        if (endpoints.length) {
          return {
            ...category,
            endpoints,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [search]);

  const scrollToCategory = (name) => {
    setMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(
        `category-${name.toLowerCase()}`
      );

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/6287776581216",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* The whole documentation stays locked until Turnstile succeeds. */
  if (!verified) {
    return (
      <TurnstileGate
        ready={turnstileReady}
        onVerified={() => setVerified(true)}
      />
    );
  }

  return (
    <div className="app">
      {/* POPUP UJI COBA */}
    {showDevPopup && (
      <div className="dev-popup-overlay">
        <div className="dev-popup">

          <button
            className="dev-popup-close"
            onClick={() => setShowDevPopup(false)}
          >
            ×
          </button>

          <div className="dev-popup-header">
            <div className="dev-popup-icon">
              🚧
            </div>

            <div>
              <h2>DINSTORE API</h2>
              <p>Website masih dalam pengembangan</p>
            </div>
          </div>

          <div className="dev-popup-status">
            <span />
            DEVELOPMENT 50%
          </div>

          <div className="dev-popup-progress">
            <div className="dev-popup-progress-bar">
              <div className="dev-popup-progress-fill" />
            </div>

            <div className="dev-popup-progress-info">
              <span>Progress Website</span>
              <b>50%</b>
            </div>
          </div>

          <p className="dev-popup-text">
            Website ini masih dalam tahap pengembangan.
            Beberapa api mungkin masih mengalami perubahan
            atau belum bisa di pake.
          </p>

          <button
            className="dev-popup-button"
            onClick={() => setShowDevPopup(false)}
          >
            LANJUTKAN
          </button>

        </div>
      </div>
    )}
      <div className="grid-background" />

      <div className="robot-decoration robot-one">
        <span />
        <span />
        <span />
      </div>

      <header className="header">
        <div className="header-inner">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>

          <div className="brand">
            <div className="brand-core">D</div>

            <div>
              <strong>DINSTORE</strong>
              <small>API SYSTEM</small>
            </div>
          </div>

          <div className="header-status">
            <span />
            ONLINE
          </div>
        </div>
      </header>

      <div
        className={`nav-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`side-nav ${menuOpen ? "open" : ""}`}>
        <div className="side-nav-header">
          <div>
            <span className="nav-label">NAVIGATION</span>
            <h2>DINSTORE API</h2>
          </div>

          <button
            className="close-button"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="nav-items">
          <button
            className="nav-item home"
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <span>⌂</span>
            <b>HOME</b>
            <small>00</small>
          </button>

          {API_CATEGORIES.map((category, index) => (
            <button
              className="nav-item"
              key={category.name}
              onClick={() => scrollToCategory(category.name)}
            >
              <span className={category.color}>
                {category.icon}
              </span>

              <b>{category.name}</b>

              <small>
                {String(index + 1).padStart(2, "0")}
              </small>
            </button>
          ))}
        </div>

        <div className="side-footer">
          <span>SYSTEM STATUS</span>
          <strong>● OPERATIONAL</strong>
        </div>
      </aside>

      <main className="main">
        <section className="hero">
          <div className="hero-machine">
            <div className="machine-ring" />

            <div className="machine-core">
              <div className="eye eye-left" />
              <div className="eye eye-right" />
              <div className="machine-mouth" />
            </div>
          </div>

          <div className="terminal-badge">
            <span />
            TERMINAL ACTIVE
          </div>

          <div className="hero-title">
            <h1>DINSTORE</h1>
            <span>3.0.0</span>
          </div>

          <p className="hero-description">
            A comprehensive and user friendly API
            solution for modern applications.
          </p>

          <div className="stats">
            <div className="stat">
              <span>CATEGORIES</span>
              <strong>{API_CATEGORIES.length}</strong>
            </div>

            <div className="stat green">
              <span>ENDPOINTS</span>
              <strong>{totalEndpoints}</strong>
            </div>

            <div className="stat status">
              <span>STATUS</span>
              <strong>ONLINE</strong>
            </div>
          </div>
        </section>

        <section className="search-section">
          <div className="search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH ENDPOINT / CATEGORY..."
            />

            {search && (
              <button onClick={() => setSearch("")}>×</button>
            )}
          </div>
        </section>

        <section className="categories">
          {filteredCategories.map((category, index) => {
            const isOpen =
              openCategory === category.name;

            return (
              <article
                key={category.name}
                id={`category-${category.name.toLowerCase()}`}
                className={`category-card ${
                  isOpen ? "opened" : ""
                }`}
              >
                <button
                  className="category-top"
                  onClick={() =>
                    setOpenCategory(
                      isOpen ? null : category.name
                    )
                  }
                >
                  <div
                    className={`category-icon ${category.color}`}
                  >
                    {category.icon}
                  </div>

                  <div className="category-info">
                    <small>
                      MODULE{" "}
                      {String(index + 1).padStart(2, "0")}
                    </small>

                    <h2>{category.name}</h2>

                    <span>
                      {category.endpoints.length} ENDPOINTS
                    </span>
                  </div>

                  <span className="open-label">
                    {isOpen ? "CLOSE ↑" : "OPEN →"}
                  </span>
                </button>

                <div className="category-path">
                  <span>PATH</span>
                  {category.path}
                </div>

                <div
                  className={`endpoint-list ${
                    isOpen ? "visible" : ""
                  }`}
                >
                  {category.endpoints.map((endpoint) => (
                    <EndpointCard
                      key={endpoint.path}
                      endpoint={endpoint}
                    />
                  ))}
                </div>
              </article>
            );
          })}

          {!filteredCategories.length && (
            <div className="empty">
              <strong>ENDPOINT NOT FOUND</strong>
              <span>Try another keyword.</span>
            </div>
          )}
        </section>
      </main>

      <button
        className="floating-robot"
        onClick={openWhatsApp}
        aria-label="Contact WhatsApp"
      >
        <div className="robot-face">
          <span className="robot-eye left" />
          <span className="robot-eye right" />

          <div className="robot-mouth">
            <i />
            <i />
            <i />
          </div>
        </div>

        <span className="robot-dot" />
      </button>
    </div>
  );
}

/* =========================================================
   INITIAL TURNSTILE GATE
========================================================= */

function TurnstileGate({ ready, onVerified }) {
  const widgetRef = React.useRef(null);
  const widgetIdRef = React.useRef(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (
      !ready ||
      !window.turnstile ||
      !widgetRef.current ||
      widgetIdRef.current !== null
    ) {
      return;
    }

    const siteKey =
      import.meta.env.VITE_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      setError(
        "VITE_TURNSTILE_SITE_KEY belum dikonfigurasi di Vercel."
      );
      return;
    }

    try {
      widgetIdRef.current = window.turnstile.render(
        widgetRef.current,
        {
          sitekey: siteKey,
          theme: "dark",

          callback: async (token) => {
            setError("");
            setChecking(true);

            try {
              const verify = await fetch(
                "/api/verify-turnstile",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ token }),
                }
              );

              const data = await verify.json();

              if (!verify.ok || !data.success) {
                throw new Error(
                  data.message ||
                    "Verifikasi Cloudflare gagal."
                );
              }

              onVerified();
            } catch (err) {
              setError(
                err.message ||
                  "Verifikasi gagal. Silakan coba lagi."
              );

              try {
                window.turnstile.reset(
                  widgetIdRef.current
                );
              } catch {}
            } finally {
              setChecking(false);
            }
          },

          "expired-callback": () => {
            setError(
              "Verifikasi kedaluwarsa. Silakan ulangi."
            );
          },

          "error-callback": () => {
            setError(
              "Cloudflare Turnstile gagal dimuat. Periksa koneksi dan hostname."
            );
          },
        }
      );
    } catch (err) {
      console.error(err);
      setError(
        "Turnstile tidak dapat dijalankan."
      );
    }

    return () => {
      try {
        if (
          window.turnstile &&
          widgetIdRef.current !== null
        ) {
          window.turnstile.remove(
            widgetIdRef.current
          );
        }
      } catch {}

      widgetIdRef.current = null;
    };
  }, [ready, onVerified]);

  return (
    <div className="verification-screen">
      <div className="verification-grid" />
      <div className="verification-glow verification-glow-one" />
      <div className="verification-glow verification-glow-two" />

      <div className="verification-card">
        <div className="verification-brand">
          <div className="verification-logo">
            D
          </div>

          <div>
            <strong>DIN API🔥</strong>
            <span>API SYSTEM</span>
          </div>
        </div>

        <div className="verification-line" />

        <div className="verification-icon">
          ◉
        </div>

        <span className="verification-eyebrow">
          SECURITY CHECK
        </span>

        <h1>VERIFY ACCESS</h1>

        <p>
          Selesaikan verifikasi Cloudflare terlebih
          dahulu untuk masuk ke DIN API.
        </p>

        <div className="verification-status">
          <span className={checking ? "checking" : ""} />
          {checking
            ? "VERIFYING..."
            : "WAITING FOR VERIFICATION"}
        </div>

        <div className="turnstile-gate-widget">
          {ready ? (
            <div ref={widgetRef} />
          ) : (
            <div className="turnstile-loading">
              MEMUAT CLOUDFLARE...
            </div>
          )}
        </div>

        {error && (
          <div className="verification-error">
            <b>!</b>
            <span>{error}</span>
          </div>
        )}

        <small className="verification-note">
          Your connection is protected by Cloudflare
          Turnstile.
        </small>
      </div>
    </div>
  );
}
/*======================================================
   ENDPOINT CARD
========================================================= */

function EndpointCard({ endpoint }) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState({});
  const [response, setResponse] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState([]);
  const [requestUrl, setRequestUrl] = useState("");
  const [curlCommand, setCurlCommand] = useState("");
  const [responseTime, setResponseTime] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseTab, setResponseTab] = useState("preview");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const buildUrl = () => {
    const query = new URLSearchParams();
    (endpoint.params || []).forEach((param) => {
      const value = values[param.name] ?? param.default ?? "";
      if (value !== "" && value !== null && value !== undefined) {
        query.append(param.name, value);
      }
    });
    return endpoint.path + (query.toString() ? `?${query}` : "");
  };

  const execute = async () => {
    setLoading(true);
    setResponse(null);
    setResponseHeaders([]);
    setResponseStatus(null);
    setResponseTime(null);
    setResponseTab("preview");

    const started = performance.now();

    try {
      for (const param of endpoint.params || []) {
        if (param.required && !String(values[param.name] || "").trim()) {
          throw new Error(`${param.label || param.name} wajib diisi.`);
        }
      }

      const url = buildUrl();
      const absoluteUrl = new URL(url, window.location.origin).href;
      setRequestUrl(url);
      setCurlCommand(`curl -X ${endpoint.method || "GET"} '${absoluteUrl}'`);

      const res = await fetch(url, {
        method: endpoint.method || "GET",
        headers: { Accept: "application/json,text/plain,*/*" },
      });

      setResponseTime(Math.round(performance.now() - started));
      setResponseStatus({
        code: res.status,
        ok: res.ok,
        text: res.statusText || (res.ok ? "OK" : "ERROR"),
      });
      setResponseHeaders(Array.from(res.headers.entries()));

      const contentType = res.headers.get("content-type") || "";
      let data;

      if (contentType.includes("application/json") || contentType.includes("+json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { success: res.ok, status: res.status, response: text };
        }
      }

      setResponse(data);
    } catch (error) {
      setResponseTime(Math.round(performance.now() - started));
      setResponseStatus({ code: 0, ok: false, text: "REQUEST ERROR" });
      setResponse({ success: false, error: true, message: error?.message || "Request failed." });
      const url = buildUrl();
      const absoluteUrl = new URL(url, window.location.origin).href;
      setRequestUrl(url);
      setCurlCommand(`curl -X ${endpoint.method || "GET"} '${absoluteUrl}'`);
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const findMediaUrls = (data) => {
    const urls = [];
    const scan = (value) => {
      if (typeof value === "string") {
        const matches = value.match(/https?:\/\/[^\s"'<>]+/g) || [];
        matches.forEach((url) => urls.push(url.replace(/[),.;]+$/, "")));
        return;
      }
      if (Array.isArray(value)) return value.forEach(scan);
      if (value && typeof value === "object") Object.values(value).forEach(scan);
    };
    scan(data);
    return [...new Set(urls)];
  };

  const mediaType = (url) => {
    const path = url.split("?")[0].toLowerCase();
    if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/.test(path)) return "image";
    if (/\.(mp4|webm|mov|m4v|mkv)$/.test(path)) return "video";
    if (/\.(mp3|wav|ogg|m4a|aac|flac)$/.test(path)) return "audio";
    return "url";
  };

  const findValue = (data, keys) => {
    if (!data || typeof data !== "object") return null;
    if (Array.isArray(data)) {
      for (const item of data) {
        const found = findValue(item, keys);
        if (found !== null) return found;
      }
      return null;
    }
    for (const key of keys) {
      if (data[key] !== undefined && data[key] !== null) return data[key];
    }
    for (const value of Object.values(data)) {
      const found = findValue(value, keys);
      if (found !== null) return found;
    }
    return null;
  };

  const renderBanChecker = () => {
    if (!endpoint.path.includes("checker-ban-wa")) return null;
    const result = response?.result || response?.data?.result || response?.data;
    if (!result || typeof result !== "object") return null;
    const banned = result.banned === true || result.status === "Blocked";
    const safe = result.banned === false || result.status === "Safe";
    return (
      <div className={`ban-result ${banned ? "ban-blocked" : safe ? "ban-safe" : ""}`}>
        <div className="ban-result-icon">{banned ? "✕" : "✓"}</div>
        <div className="ban-result-main">
          <span>WHATSAPP CHECK</span>
          <strong>{banned ? "BLOCKED" : safe ? "SAFE" : result.status || "UNKNOWN"}</strong>
          <small>{result.phone || result.masked || "Number checked"}</small>
        </div>
        <div className="ban-result-info">
          <div><span>BANNED</span><b>{result.banned === true ? "YES" : "NO"}</b></div>
          <div><span>EXISTS</span><b>{result.exists === true ? "YES" : "NO"}</b></div>
        </div>
      </div>
    );
  };

  const renderAI = () => {
    if (!endpoint.path.includes("/api/ai/")) return null;
    const message = findValue(response, ["message", "answer", "response", "text", "content"]);
    if (message === null || typeof message === "object") return null;
    return (
      <div className="ai-result">
        <div className="ai-result-header"><span>✦</span><div><small>AI RESPONSE</small><strong>{response?.model || values.model || "AI"}</strong></div></div>
        <div className="ai-result-content">{String(message)}</div>
      </div>
    );
  };

  const renderMedia = () => {
    const urls = findMediaUrls(response);
    const media = urls.filter((url) => ["image", "video", "audio"].includes(mediaType(url)));
    if (!media.length) return null;
    return (
      <div className="media-result">
        <div className="media-result-title">◉ MEDIA PREVIEW</div>
        <div className="media-grid">
          {media.map((url, index) => {
            const type = mediaType(url);
            return (
              <div className="media-card" key={`${url}-${index}`}>
                {type === "image" && <img src={url} alt="API result" loading="lazy" />}
                {type === "video" && <video src={url} controls playsInline preload="metadata" />}
                {type === "audio" && <audio src={url} controls />}
                <a href={url} target="_blank" rel="noreferrer">OPEN {type.toUpperCase()} ↗</a>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLinks = () => {
    const urls = findMediaUrls(response).filter((url) => mediaType(url) === "url");
    if (!urls.length) return null;
    return (
      <div className="url-result">
        <div className="media-result-title">LINKS</div>
        {urls.map((url, index) => (
          <a className="url-result-item" href={url} target="_blank" rel="noreferrer" key={`${url}-${index}`}>
            <span>{url}</span><b>↗</b>
          </a>
        ))}
      </div>
    );
  };

  const renderPreview = () => {
    if (!response) return <div className="response-empty"><strong>NO RESPONSE</strong><small>Execute endpoint untuk melihat hasil.</small></div>;
    const ban = renderBanChecker();
    return (
      <div className="response-preview-wrap">
        {ban}
        {renderAI()}
        {renderMedia()}
        {renderLinks()}
        <div className="raw-response">
          <div className="raw-response-head"><span>RAW RESPONSE</span><button onClick={() => copyText(JSON.stringify(response, null, 2))}>{copied ? "COPIED" : "COPY"}</button></div>
          <pre>{typeof response === "string" ? response : JSON.stringify(response, null, 2)}</pre>
        </div>
      </div>
    );
  };

  return (
    <div className={`endpoint ${expanded ? "endpoint-expanded" : ""}`}>
      <button className="endpoint-header" onClick={() => setExpanded(!expanded)}>
        <div className="method">{endpoint.method}</div>
        <div className="endpoint-main"><strong>{endpoint.name}</strong><span>{endpoint.path}</span></div>
        <span className="endpoint-chevron">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="endpoint-body">
          <p className="endpoint-description">{endpoint.description}</p>

          {endpoint.params?.length > 0 && (
            <div className="params">
              {endpoint.params.map((param) => (
                <label className="param" key={param.name}>
                  <div className="param-label">
                    <span>{param.label || param.name}</span>
                    {param.required && <small>REQUIRED</small>}
                  </div>
                  {param.type === "select" ? (
                    <select value={values[param.name] ?? param.default ?? ""} onChange={(e) => updateValue(param.name, e.target.value)}>
                      {param.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input value={values[param.name] ?? ""} onChange={(e) => updateValue(param.name, e.target.value)} placeholder={param.placeholder || ""} />
                  )}
                </label>
              ))}
            </div>
          )}

          <button className="execute-button" onClick={execute} disabled={loading}>
            {loading ? "EXECUTING..." : "EXECUTE →"}
          </button>

          {response && (
            <div className="api-response-panel">
              <div className="response-toolbar">
                <div className="response-tabs">
                  {[["preview", "PREVIEW"], ["headers", "HEADERS"], ["curl", "CURL"]].map(([key, label]) => (
                    <button key={key} className={`response-tab ${responseTab === key ? "active" : ""}`} onClick={() => setResponseTab(key)}>{label}</button>
                  ))}
                </div>
                <div className="response-info">
                  {responseStatus && <span className={`response-status ${responseStatus.ok ? "" : "error"}`}>{responseStatus.code ? `${responseStatus.code} ${responseStatus.text}` : responseStatus.text}</span>}
                  {responseTime !== null && <span className="response-time">{responseTime} ms</span>}
                  {responseTab === "curl" && <button className="response-copy" onClick={() => copyText(curlCommand)}>{copied ? "✓" : "⧉"}</button>}
                </div>
              </div>

              {responseTab === "preview" && <div className="response-content">{renderPreview()}</div>}
              {responseTab === "headers" && (
                <div className="response-headers">
                  {responseHeaders.length ? responseHeaders.map(([name, value]) => (
                    <div className="response-header-row" key={name}><span className="response-header-name">{name}</span><span className="response-header-value">{value}</span></div>
                  )) : <div className="response-empty">No response headers.</div>}
                </div>
              )}
              {responseTab === "curl" && <div className="response-curl"><pre>{curlCommand || "No request generated."}</pre></div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

