import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./style.css";

/* =========================================================
   CONFIG
========================================================= */

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY ||
  "0x4AAAAAAEPIh3nGXRyGDzYt";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "";

/* =========================================================
   API DATA
========================================================= */

const API_CATEGORIES = [
  {
    name: "AI",
    icon: "✦",
    color: "blue",
    path: "/docs/ai",
    endpoints: [
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
        description: "Generate image menggunakan Flixier AI.",
        params: [
          {
            name: "prompt",
            label: "PROMPT",
            placeholder: "futuristic warrior cat",
            required: true,
          },
          {
            name: "style",
            label: "STYLE",
            placeholder: "cinematic",
            required: false,
          },
          {
            name: "negative",
            label: "NEGATIVE PROMPT",
            placeholder: "blur",
            required: false,
          },
          {
            name: "ratio",
            label: "ASPECT RATIO",
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
            label: "THEME",
            placeholder: "persahabatan",
            required: true,
          },
          {
            name: "genre",
            label: "GENRE",
            placeholder: "pop",
            required: false,
          },
          {
            name: "emotion",
            label: "EMOTION",
            placeholder: "happy",
            required: false,
          },
          {
            name: "lang",
            label: "LANGUAGE",
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
            label: "PROMPT",
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
            label: "QUESTION",
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
            label: "KEY",
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
        name: "DramaBox Downloader",
        method: "GET",
        path: "/api/download/dramabox",
        description:
          "Download video dan mengambil data DramaBox.",
        params: [
          {
            name: "url",
            label: "URL DRAMABOX",
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
            label: "QUERY",
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
            label: "QUERY",
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
            label: "QUERY",
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
            label: "TEXT",
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
            label: "TEXT",
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
        name: "Kompas News",
        method: "GET",
        path: "/api/news/kompas",
        description:
          "Mengambil berita terbaru dari Kompas.com.",
        params: [],
      },

      {
        name: "Detik News",
        method: "GET",
        path: "/api/news/detik",
        description:
          "Mengambil berita terbaru dari Detik.com.",
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
            label: "QUERY",
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
            label: "MINIMUM",
            placeholder: "1",
            required: false,
          },
          {
            name: "max",
            label: "MAXIMUM",
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
            label: "QUERY",
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
            label: "QUERY",
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
        description:
          "Get public TikTok profile information.",
        params: [
          {
            name: "username",
            label: "USERNAME",
            placeholder: "username",
            required: true,
          },
        ],
      },

      {
        name: "Instagram Stalk",
        method: "GET",
        path: "/api/stalk/instagram",
        description:
          "Get public Instagram profile information.",
        params: [
          {
            name: "username",
            label: "USERNAME",
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
        name: "WhatsApp Ban Checker",
        method: "GET",
        path: "/api/tools/checker-ban-wa",
        category: "TOOLS",
        description:
          "Check whether a WhatsApp number is blocked/banned.",
        params: [
          {
            name: "number",
            label: "NUMBER",
            type: "text",
            placeholder: "628123456789",
            required: true,
          },
        ],
      },

      {
        name: "Domain Info",
        method: "GET",
        path: "/api/tools/domaininfo",
        description: "Check domain information.",
        params: [
          {
            name: "domain",
            label: "DOMAIN",
            placeholder: "domainmu.com",
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
   HELPERS
========================================================= */

function buildUrl(path, values = {}) {
  const query = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      query.append(key, String(value));
    }
  });

  const base = API_BASE_URL.replace(/\/+$/, "");

  const cleanPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return (
    base +
    cleanPath +
    (query.toString()
      ? `?${query.toString()}`
      : "")
  );
}

function makeCurl(url, method = "GET") {
  return `curl -X ${method} "${url}"`;
}

function formatResponse(data) {
  if (typeof data === "string") {
    return data;
  }

  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 70 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.floor(Math.random() * 4) + 2,
      delay: Math.random() * 8,
      duration: Math.floor(Math.random() * 15) + 10,
    }));
  }, []);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle-square"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [openCategory, setOpenCategory] = useState("AI");

  const [selectedEndpoint, setSelectedEndpoint] =
    useState(API_CATEGORIES[0].endpoints[0]);

  const [values, setValues] = useState({});

  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState("");

  const [activeTab, setActiveTab] = useState("response");

  const [showDevPopup, setShowDevPopup] = useState(true);

  const [turnstileReady, setTurnstileReady] =
    useState(false);

  const [verified, setVerified] = useState(false);

  const turnstileRef = useRef(null);

  const totalEndpoints =
    API_CATEGORIES.reduce(
      (total, category) =>
        total + category.endpoints.length,
      0
    );

  /* =======================================================
     TURNSTILE
  ======================================================= */

  useEffect(() => {
    if (window.turnstile) {
      setTurnstileReady(true);
      return;
    }

    const existing = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    );

    if (existing) {
      existing.addEventListener("load", () =>
        setTurnstileReady(true)
      );

      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

    script.async = true;
    script.defer = true;

    script.onload = () => {
      setTurnstileReady(true);
    };

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  useEffect(() => {
    if (
      turnstileReady &&
      turnstileRef.current &&
      window.turnstile &&
      !verified
    ) {
      try {
        window.turnstile.render(
          turnstileRef.current,
          {
            sitekey: TURNSTILE_SITE_KEY,

            callback: () => {
              setVerified(true);
            },

            "expired-callback": () => {
              setVerified(false);
            },

            "error-callback": () => {
              setVerified(false);
            },
          }
        );
      } catch {
        // Turnstile gagal render tidak membuat aplikasi crash.
      }
    }
  }, [turnstileReady, verified]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return API_CATEGORIES;
    }

    return API_CATEGORIES
      .map((category) => {
        const categoryMatch =
          category.name
            .toLowerCase()
            .includes(keyword);

        const endpoints =
          category.endpoints.filter((endpoint) => {
            return (
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
          });

        if (categoryMatch) {
          return category;
        }

        if (endpoints.length > 0) {
          return {
            ...category,
            endpoints,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [search]);

  /* =======================================================
     SELECT ENDPOINT
  ======================================================= */

  function selectEndpoint(category, endpoint) {
    setSelectedEndpoint({
      ...endpoint,
      category: category.name,
    });

    const defaults = {};

    endpoint.params?.forEach((param) => {
      if (param.default !== undefined) {
        defaults[param.name] = param.default;
      }
    });

    setValues(defaults);

    setResponse(null);
    setError("");
    setActiveTab("response");

    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =======================================================
     INPUT
  ======================================================= */

  function updateValue(name, value) {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /* =======================================================
     URL
  ======================================================= */

  const requestUrl = useMemo(() => {
    if (!selectedEndpoint) {
      return "";
    }

    return buildUrl(
      selectedEndpoint.path,
      values
    );
  }, [selectedEndpoint, values]);

  const curlCode = useMemo(() => {
    return makeCurl(
      requestUrl,
      selectedEndpoint?.method || "GET"
    );
  }, [requestUrl, selectedEndpoint]);

  /* =======================================================
     COPY
  ======================================================= */

  async function copyText(text, type = "text") {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1800);
    } catch {
      setError("Gagal menyalin ke clipboard.");
    }
  }

  /* =======================================================
     TEST API
  ======================================================= */

  async function testApi() {
    if (!selectedEndpoint) {
      return;
    }

    setError("");
    setResponse(null);

    /* Required validation */

    const missing = [];

    selectedEndpoint.params?.forEach((param) => {
      if (
        param.required &&
        !String(values[param.name] || "").trim()
      ) {
        missing.push(param.label || param.name);
      }
    });

    if (missing.length > 0) {
      setError(
        `Field wajib diisi: ${missing.join(", ")}`
      );

      return;
    }

    setLoading(true);

    const startedAt = performance.now();

    try {
      const url = buildUrl(
        selectedEndpoint.path,
        values
      );

      const res = await fetch(url, {
        method: selectedEndpoint.method || "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
        },
      });

      const contentType =
        res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      const duration =
        Math.round(performance.now() - startedAt);

      setResponse({
        status: res.status,
        ok: res.ok,
        duration,
        data,
        url,
      });

      setActiveTab("response");
    } catch (err) {
      setError(
        err?.message ||
          "Request gagal. Periksa URL API dan koneksi server."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    function handleKeyDown(event) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        document
          .querySelector(".docs-search-input")
          ?.focus();
      }

      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  function scrollToDocs() {
    document
      .querySelector(".docs-content")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="app">

      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <Particles />

      <div className="background-grid" />

      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="top-header">

        <div className="header-left">

          <button
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>

          <div
            className="brand"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <div className="brand-logo">
              D
            </div>

            <div className="brand-text">
              <strong>DIN API</strong>
              <span>Developer Platform</span>
            </div>
          </div>

        </div>

        <div className="header-center">

          <div className="search-box">

            <span className="search-icon">
              ⌕
            </span>

            <input
              className="docs-search-input"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search endpoints..."
            />

            <kbd>Ctrl K</kbd>

          </div>

        </div>

        <div className="header-right">

          <div className="status-pill">
            <span className="status-dot" />
            API ONLINE
          </div>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="header-link"
          >
            GitHub
          </a>

        </div>

      </header>

      {/* ===================================================
          LAYOUT
      =================================================== */}

      <div className="docs-layout">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className={`docs-sidebar ${
            menuOpen ? "sidebar-open" : ""
          }`}
        >

          <div className="sidebar-top">

            <div className="sidebar-title">
              DOCUMENTATION
            </div>

            <div className="sidebar-subtitle">
              API REFERENCE
            </div>

          </div>

          <div className="sidebar-scroll">

            <button
              className="overview-button"
              onClick={() => {
                setSearch("");
                setMenuOpen(false);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <span className="overview-icon">
                ◈
              </span>

              <span>
                Overview
              </span>
            </button>

            <div className="category-list">

              {filteredCategories.map(
                (category) => {

                  const isOpen =
                    openCategory ===
                    category.name;

                  return (
                    <div
                      className="category"
                      key={category.name}
                    >

                      <button
                        className={`category-button ${
                          isOpen
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          setOpenCategory(
                            isOpen
                              ? null
                              : category.name
                          );
                        }}
                      >

                        <span
                          className={`category-icon ${category.color}`}
                        >
                          {category.icon}
                        </span>

                        <span className="category-name">
                          {category.name}
                        </span>

                        <span className="category-count">
                          {
                            category.endpoints
                              .length
                          }
                        </span>

                        <span
                          className={`category-arrow ${
                            isOpen
                              ? "rotate"
                              : ""
                          }`}
                        >
                          ›
                        </span>

                      </button>

                      {isOpen && (
                        <div className="endpoint-list">

                          {category.endpoints.map(
                            (endpoint) => {

                              const active =
                                selectedEndpoint
                                  ?.path ===
                                endpoint.path;

                              return (
                                <button
                                  key={
                                    endpoint.path
                                  }
                                  className={`endpoint-button ${
                                    active
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    selectEndpoint(
                                      category,
                                      endpoint
                                    )
                                  }
                                >

                                  <span
                                    className={`method-dot ${category.color}`}
                                  />

                                  <span className="endpoint-name">
                                    {
                                      endpoint.name
                                    }
                                  />

                                </button>
                              );
                            }
                          )}

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>

          <div className="sidebar-bottom">

            <div className="sidebar-stat">
              <span>ENDPOINTS</span>
              <strong>
                {totalEndpoints}
              </strong>
            </div>

            <div className="sidebar-stat">
              <span>VERSION</span>
              <strong>v2</strong>
            </div>

          </div>

        </aside>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="docs-main">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="hero-section">

            <div className="hero-badge">
              <span className="hero-badge-dot" />
              DIN API V2
            </div>

            <h1>
              Powerful APIs.
              <br />

              <span>
                Built for developers.
              </span>
            </h1>

            <p>
              Simple, fast, and reliable API
              endpoints for your next project.
              Explore the documentation and
              test every endpoint directly.
            </p>

            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={scrollToDocs}
              >
                <span>Explore API</span>
                <span>→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() =>
                  copyText(
                    API_BASE_URL ||
                      window.location.origin,
                    "base"
                  )
                }
              >
                {copied === "base"
                  ? "Copied!"
                  : "Copy Base URL"}
              </button>

            </div>

            <div className="hero-stats">

              <div className="hero-stat">
                <strong>
                  {API_CATEGORIES.length}
                </strong>
                <span>
                  Categories
                </span>
              </div>

              <div className="hero-stat">
                <strong>
                  {totalEndpoints}
                </strong>
                <span>
                  Endpoints
                </span>
              </div>

              <div className="hero-stat">
                <strong>
                  99.9%
                </strong>
                <span>
                  Uptime Target
                </span>
              </div>

            </div>

          </section>

          {/* =================================================
              API TESTER
          ================================================= */}

          <section
            className="docs-content"
            id="api-tester"
          >

            <div className="section-heading">

              <div>

                <div className="eyebrow">
                  API REFERENCE
                </div>

                <h2>
                  {selectedEndpoint?.name ||
                    "Select an endpoint"}
                </h2>

                <p>
                  {selectedEndpoint?.description ||
                    "Choose an endpoint from the sidebar."}
                </p>

              </div>

              {selectedEndpoint && (
                <div className="endpoint-badge">
                  <span>
                    {selectedEndpoint.method}
                  </span>

                  <code>
                    {selectedEndpoint.path}
                  </code>
                </div>
              )}

            </div>

            {/* =================================================
                REQUEST CARD
            ================================================= */}

            {selectedEndpoint && (
              <div className="tester-card">

                <div className="card-header">

                  <div>
                    <span className="card-kicker">
                      REQUEST
                    </span>

                    <h3>
                      Test this endpoint
                    </h3>
                  </div>

                  <span className="live-badge">
                    LIVE
                  </span>

                </div>

                <div className="request-url">

                  <span className="url-method">
                    {selectedEndpoint.method}
                  </span>

                  <code>
                    {requestUrl ||
                      selectedEndpoint.path}
                  </code>

                  <button
                    className="copy-button"
                    onClick={() =>
                      copyText(
                        requestUrl,
                        "url"
                      )
                    }
                  >
                    {copied === "url"
                      ? "✓"
                      : "Copy"}
                  </button>

                </div>

                {selectedEndpoint.params?.length >
                  0 ? (
                  <div className="params-area">

                    <div className="params-title">
                      QUERY PARAMETERS
                    </div>

                    <div className="params-grid">

                      {selectedEndpoint.params.map(
                        (param) => {

                          const value =
                            values[
                              param.name
                            ] ??
                            param.default ??
                            "";

                          return (
                            <div
                              className="param-field"
                              key={
                                param.name
                              }
                            >

                              <label>
                                <span>
                                  {
                                    param.label ||
                                    param.name
                                  }
                                </span>

                                {param.required && (
                                  <b>
                                    REQUIRED
                                  </b>
                                )}
                              </label>

                              {param.type ===
                                "select" ? (
                                <select
                                  value={
                                    value
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateValue(
                                      param.name,
                                      event.target
                                        .value
                                    )
                                  }
                                >
                                  {param.options?.map(
                                    (option) => (
                                      <option
                                        value={
                                          option
                                        }
                                        key={
                                          option
                                        }
                                      >
                                        {
                                          option
                                        }
                                      </option>
                                    )
                                  )}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={
                                    value
                                  }
                                  placeholder={
                                    param.placeholder ||
                                    ""
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateValue(
                                      param.name,
                                      event.target
                                        .value
                                    )
                                  }
                                />
                              )}

                              {param.placeholder && (
                                <small>
                                  Example:{" "}
                                  {
                                    param.placeholder
                                  }
                                </small>
                              )}

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>
                ) : (
                  <div className="no-params">
                    <span>✓</span>
                    This endpoint does not
                    require parameters.
                  </div>
                )}

                {/* TURNSTILE */}

                <div className="security-box">

                  <div className="security-icon">
                    ◈
                  </div>

                  <div className="security-text">
                    <strong>
                      Security verification
                    </strong>

                    <span>
                      Complete verification
                      before testing the API.
                    </span>
                  </div>

                  <div
                    ref={turnstileRef}
                    className="turnstile-container"
                  />

                </div>

                {error && (
                  <div className="error-box">
                    <span>!</span>
                    {error}
                  </div>
                )}

                <button
                  className="test-button"
                  onClick={testApi}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Sending request...
                    </>
                  ) : (
                    <>
                      <span>▶</span>
                      Send Request
                    </>
                  )}
                </button>

              </div>
            )}

            {/* =================================================
                RESPONSE
            ================================================= */}

            {response && (
              <div className="response-card">

                <div className="response-header">

                  <div>

                    <span className="card-kicker">
                      RESPONSE
                    </span>

                    <h3>
                      API Response
                    </h3>

                  </div>

                  <div className="response-meta">

                    <span
                      className={
                        response.ok
                          ? "response-success"
                          : "response-error"
                      }
                    >
                      {response.status}
                    </span>

                    <span>
                      {response.duration}ms
                    </span>

                  </div>

                </div>

                <div className="response-tabs">

                  <button
                    className={
                      activeTab === "response"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(
                        "response"
                      )
                    }
                  >
                    Response
                  </button>

                  <button
                    className={
                      activeTab === "curl"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab("curl")
                    }
                  >
                    cURL
                  </button>

                </div>

                {activeTab === "response" && (
                  <div className="code-container">

                    <div className="code-toolbar">

                      <span>
                        JSON / TEXT
                      </span>

                      <button
                        onClick={() =>
                          copyText(
                            formatResponse(
                              response.data
                            ),
                            "response"
                          )
                        }
                      >
                        {copied ===
                        "response"
                          ? "Copied!"
                          : "Copy"}
                      </button>

                    </div>

                    <pre>
                      <code>
                        {formatResponse(
                          response.data
                        )}
                      </code>
                    </pre>

                  </div>
                )}

                {activeTab === "curl" && (
                  <div className="code-container">

                    <div className="code-toolbar">

                      <span>
                        CURL
                      </span>

                      <button
                        onClick={() =>
                          copyText(
                            curlCode,
                            "curl"
                          )
                        }
                      >
                        {copied === "curl"
                          ? "Copied!"
                          : "Copy"}
                      </button>

                    </div>

                    <pre>
                      <code>
                        {curlCode}
                      </code>
                    </pre>

                  </div>
                )}

              </div>
            )}

            {/* =================================================
                QUICK ENDPOINTS
            ================================================= */}

            <section className="quick-section">

              <div className="section-heading small">

                <div>

                  <div className="eyebrow">
                    BROWSE
                  </div>

                  <h2>
                    All endpoints
                  </h2>

                </div>

              </div>

              <div className="endpoint-cards">

                {API_CATEGORIES.map(
                  (category) => (
                    <div
                      className="endpoint-category-card"
                      key={category.name}
                    >

                      <div className="mini-category">

                        <span
                          className={`category-icon ${category.color}`}
                        >
                          {category.icon}
                        </span>

                        <div>

                          <strong>
                            {category.name}
                          </strong>

                          <span>
                            {
                              category.endpoints
                                .length
                            }{" "}
                            endpoints
                          </span>

                        </div>

                      </div>

                      <div className="mini-endpoints">

                        {category.endpoints
                          .slice(0, 5)
                          .map(
                            (endpoint) => (
                              <button
                                key={
                                  endpoint.path
                                }
                                onClick={() =>
                                  selectEndpoint(
                                    category,
                                    endpoint
                                  )
                                }
                              >
                                <span>
                                  {
                                    endpoint
                                      .method
                                  }
                                </span>

                                <code>
                                  {
                                    endpoint.path
                                  }
                                </code>

                                <b>
                                  →
                                </b>
                              </button>
                            )
                          )}

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>

          </section>

        </main>

      </div>

      {/* =====================================================
          DEVELOPER POPUP
      ===================================================== */}

      {showDevPopup && (
        <div className="dev-popup">

          <button
            className="popup-close"
            onClick={() =>
              setShowDevPopup(false)
            }
          >
            ×
          </button>

          <div className="popup-icon">
            ✦
          </div>

          <div className="popup-content">

            <strong>
              DIN API V2
            </strong>

            <span>
              Developer documentation is
              ready to use.
            </span>

          </div>

        </div>
      )}

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}

    </div>
  );
}
