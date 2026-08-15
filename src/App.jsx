import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
/* =========================================================
   CONFIG
========================================================= */

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAEPIh3nGXRyGDzYt";

/* =========================================================
   API DATA
========================================================= */

const API_CATEGORIES = [
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
    name: "AI",
    icon: "✦",
    color: "mint",
    path: "/docs/ai",
    endpoints: [
      {
        name: "AI Aiko",
        method: "GET",
        path: "/api/ai/aiko",
        description: "AI chat assistant.",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Halo, apa kabar?",
            required: true,
          },
          {
            name: "reset",
            label: "Reset",
            placeholder: "false",
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
            <span>ROBOT SYSTEM</span>
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

/* =========================================================
   ENDPOINT CARD
   Turnstile hanya dilakukan sekali saat website dibuka.
========================================================= */

function EndpointCard({ endpoint }) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateValue = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const execute = async () => {
    setLoading(true);
    setResponse(null);

    try {
      for (const param of endpoint.params) {
        if (
          param.required &&
          !String(values[param.name] || "").trim()
        ) {
          throw new Error(
            `${param.label} wajib diisi.`
          );
        }
      }

      const query = new URLSearchParams();

      endpoint.params.forEach((param) => {
        const value = values[param.name];

        if (
          value !== undefined &&
          value !== ""
        ) {
          query.append(param.name, value);
        }
      });

      const url =
        endpoint.path +
        (query.toString()
          ? `?${query.toString()}`
          : "");

      const res = await fetch(url);

      const contentType =
        res.headers.get("content-type") || "";

      let data;

      if (
        contentType.includes("application/json")
      ) {
        data = await res.json();
      } else {
        data = {
          success: res.ok,
          status: res.status,
          response: await res.text(),
        };
      }

      setResponse(data);
    } catch (error) {
      setResponse({
        success: false,
        message:
          error.message ||
          "Request failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="endpoint">
      <button
        className="endpoint-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="method">
          {endpoint.method}
        </div>

        <div className="endpoint-main">
          <strong>{endpoint.name}</strong>
          <span>{endpoint.path}</span>
        </div>

        <span className="endpoint-chevron">
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div className="endpoint-body">
          <p className="endpoint-description">
            {endpoint.description}
          </p>

          {endpoint.params.length > 0 && (
            <div className="params">
              {endpoint.params.map((param) => (
                <label
                  className="param"
                  key={param.name}
                >
                  <div className="param-label">
                    <span>{param.label}</span>

                    {param.required && (
                      <small>REQUIRED</small>
                    )}
                  </div>

                  <input
                    value={
                      values[param.name] || ""
                    }
                    onChange={(e) =>
                      updateValue(
                        param.name,
                        e.target.value
                      )
                    }
                    placeholder={param.placeholder}
                  />
                </label>
              ))}
            </div>
          )}

          <button
            className="execute-button"
            onClick={execute}
            disabled={loading}
          >
            {loading
              ? "EXECUTING..."
              : "EXECUTE →"}
          </button>

          {response && (
            <pre className="response">
              {JSON.stringify(
                response,
                null,
                2
              )}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
