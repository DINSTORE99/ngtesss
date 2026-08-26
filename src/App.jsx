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
        description:
          "Chat with DuckAI using various AI models.",
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
            placeholder:
              "You are a helpful assistant.",
            required: false,
          },
        ],
      },

      {
        name: "Flixier AI Image",
        method: "GET",
        path: "/api/ai/flixier",
        description:
          "Generate image menggunakan Flixier AI.",
        params: [
          {
            name: "prompt",
            label: "PROMPT",
            placeholder:
              "futuristic warrior cat",
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
        description:
          "Generate lyrics menggunakan AI.",
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
        description:
          "Generate source code menggunakan AI.",
        params: [
          {
            name: "prompt",
            label: "PROMPT",
            placeholder:
              "buat landing page modern",
            required: true,
          },
        ],
      },

      {
        name: "AI Chat",
        method: "GET",
        path: "/api/ai/chat",
        description:
          "General AI chat endpoint.",
        params: [
          {
            name: "q",
            label: "QUESTION",
            placeholder:
              "Jelaskan JavaScript",
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
        description:
          "Check API admin status.",
        params: [],
      },
      {
        name: "Admin Info",
        method: "GET",
        path: "/api/admin/info",
        description:
          "Get admin information.",
        params: [],
      },
      {
        name: "Server Status",
        method: "GET",
        path: "/api/admin/server",
        description:
          "Check server status.",
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
        description:
          "Get cached data.",
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
        description:
          "Clear cache.",
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
        description:
          "Download video TikTok.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder:
              "https://vt.tiktok.com/...",
            required: true,
          },
        ],
      },

      {
        name: "Instagram Downloader",
        method: "GET",
        path: "/api/download/instagram",
        description:
          "Download Instagram media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder:
              "https://instagram.com/...",
            required: true,
          },
        ],
      },

      {
        name: "CapCut Downloader",
        method: "GET",
        path: "/api/download/capcut",
        description:
          "Download CapCut media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder:
              "https://www.capcut.com/...",
            required: true,
          },
        ],
      },

      {
        name: "Facebook Downloader",
        method: "GET",
        path: "/api/download/facebook",
        description:
          "Download Facebook media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder:
              "https://facebook.com/...",
            required: true,
          },
        ],
      },

      {
        name: "MediaFire Downloader",
        method: "GET",
        path: "/api/download/mediafire",
        description:
          "Download MediaFire files.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder:
              "https://mediafire.com/...",
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
            placeholder:
              "https://dramabox.com/...",
            required: true,
          },
        ],
      },

      {
        name: "Pinterest Downloader",
        method: "GET",
        path: "/api/download/pinterest",
        description:
          "Download Pinterest media.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder:
              "https://pinterest.com/...",
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
        description:
          "Random truth question.",
        params: [],
      },
      {
        name: "Dare",
        method: "GET",
        path: "/api/fun/dare",
        description:
          "Random dare challenge.",
        params: [],
      },
      {
        name: "Joke",
        method: "GET",
        path: "/api/fun/joke",
        description:
          "Generate random joke.",
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
        description:
          "Get leaderboard data.",
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
        description:
          "Search library books.",
        params: [
          {
            name: "q",
            label: "QUERY",
            placeholder:
              "javascript",
            required: true,
          },
        ],
      },

      {
        name: "Anime",
        method: "GET",
        path: "/api/library/anime",
        description:
          "Search anime library.",
        params: [
          {
            name: "q",
            label: "QUERY",
            placeholder:
              "naruto",
            required: true,
          },
        ],
      },

      {
        name: "Movies",
        method: "GET",
        path: "/api/library/movies",
        description:
          "Search movie library.",
        params: [
          {
            name: "q",
            label: "QUERY",
            placeholder:
              "avengers",
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
        description:
          "Generate QR code.",
        params: [
          {
            name: "text",
            label: "TEXT",
            placeholder:
              "Hello World",
            required: true,
          },
        ],
      },

      {
        name: "Logo Maker",
        method: "GET",
        path: "/api/maker/logo",
        description:
          "Generate logo.",
        params: [
          {
            name: "text",
            label: "TEXT",
            placeholder:
              "DINSTORE",
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
        description:
          "Get latest news.",
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
        description:
          "Search news.",
        params: [
          {
            name: "q",
            label: "QUERY",
            placeholder:
              "teknologi",
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
        description:
          "Get random image.",
        params: [],
      },

      {
        name: "Random Number",
        method: "GET",
        path: "/api/random/number",
        description:
          "Generate random number.",
        params: [
          {
            name: "min",
            label: "MINIMUM",
            placeholder:
              "1",
            required: false,
          },
          {
            name: "max",
            label: "MAXIMUM",
            placeholder:
              "100",
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
        description:
          "Search Google.",
        params: [
          {
            name: "q",
            label: "QUERY",
            placeholder:
              "DINSTORE API",
            required: true,
          },
        ],
      },

      {
        name: "YouTube Search",
        method: "GET",
        path: "/api/search/youtube",
        description:
          "Search YouTube.",
        params: [
          {
            name: "q",
            label: "QUERY",
            placeholder:
              "music",
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
            placeholder:
              "username",
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
            placeholder:
              "username",
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
            placeholder:
              "628123456789",
            required: true,
          },
        ],
      },

      {
        name: "Domain Info",
        method: "GET",
        path: "/api/tools/domaininfo",
        description:
          "Check domain information.",
        params: [
          {
            name: "domain",
            label: "DOMAIN",
            placeholder:
              "domainmu.com",
            required: true,
          },
        ],
      },

      {
        name: "Short URL",
        method: "GET",
        path: "/api/tools/shorturl",
        description:
          "Shorten URL.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder:
              "https://example.com",
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

  Object.entries(values).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        query.append(
          key,
          String(value)
        );
      }
    }
  );

  const base =
    API_BASE_URL.replace(
      /\/+$/,
      ""
    );

  const cleanPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return (
    base +
    cleanPath +
    (
      query.toString()
        ? `?${query.toString()}`
        : ""
    )
  );
}


function makeCurl(
  url,
  method = "GET"
) {
  return `curl -X ${method} "${url}"`;
}


function formatResponse(data) {
  if (
    typeof data === "string"
  ) {
    return data;
  }

  try {
    return JSON.stringify(
      data,
      null,
      2
    );
  } catch {
    return String(data);
  }
}


function getInitialValues(endpoint) {
  const values = {};

  endpoint.params?.forEach(
    (param) => {
      values[param.name] =
        param.default || "";
    }
  );

  return values;
}


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

function SquareParticles({
  count = 55,
}) {
  const particles = useMemo(
    () => {
      return Array.from(
        {
          length: count,
        },
        (_, index) => ({
          id: index,

          size:
            Math.floor(
              Math.random() * 7
            ) + 3,

          left:
            Math.random() * 100,

          top:
            Math.random() * 100,

          delay:
            Math.random() * 8,

          duration:
            Math.floor(
              Math.random() * 12
            ) + 8,

          opacity:
            (
              Math.random() *
                0.45 +
              0.12
            ).toFixed(2),

          drift:
            Math.floor(
              Math.random() * 100
            ) - 50,
        })
      );
    },
    [count]
  );

  return (
    <div
      className="particle-layer"
      aria-hidden="true"
    >
      {particles.map(
        (particle) => (
          <span
            key={particle.id}
            className="square-particle"
            style={{
              "--particle-size":
                `${particle.size}px`,

              "--particle-left":
                `${particle.left}%`,

              "--particle-top":
                `${particle.top}%`,

              "--particle-delay":
                `${particle.delay}s`,

              "--particle-duration":
                `${particle.duration}s`,

              "--particle-opacity":
                particle.opacity,

              "--particle-drift":
                `${particle.drift}px`,
            }}
          />
        )
      )}
    </div>
  );
}


/* =========================================================
   BACKGROUND EFFECTS
========================================================= */

function BackgroundEffects() {
  return (
    <>
      <div
        className="background-grid"
        aria-hidden="true"
      />

      <div
        className="background-glow background-glow-one"
        aria-hidden="true"
      />

      <div
        className="background-glow background-glow-two"
        aria-hidden="true"
      />

      <SquareParticles />
    </>
  );
}


/* =========================================================
   APP
========================================================= */

export default function App() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [openCategory, setOpenCategory] =
    useState(
      API_CATEGORIES[0]?.name ||
        null
    );

  const [selectedEndpoint, setSelectedEndpoint] =
    useState(
      API_CATEGORIES[0]
        ?.endpoints?.[0] ||
        null
    );

  const [values, setValues] =
    useState({});

  const [response, setResponse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState("");

  const [turnstileReady, setTurnstileReady] =
    useState(false);

  const [verified, setVerified] =
    useState(false);

  const [showDevPopup, setShowDevPopup] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("tester");

  const turnstileRef =
    useRef(null);

  const totalEndpoints =
    API_CATEGORIES.reduce(
      (total, category) =>
        total +
        category.endpoints.length,
      0
    );


  /* =======================================================
     TURNSTILE
  ======================================================= */

  useEffect(() => {
    if (
      window.turnstile
    ) {
      setTurnstileReady(true);
      return;
    }

    const existing =
      document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );

    const script =
      existing ||
      document.createElement(
        "script"
      );

    if (!existing) {
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

      script.async = true;
      script.defer = true;

      document.head.appendChild(
        script
      );
    }

    const handleLoad = () => {
      setTurnstileReady(true);
    };

    script.addEventListener(
      "load",
      handleLoad
    );

    return () => {
      script.removeEventListener(
        "load",
        handleLoad
      );
    };
  }, []);


  useEffect(() => {
    if (
      !turnstileReady ||
      !turnstileRef.current ||
      !window.turnstile
    ) {
      return;
    }

    try {
      window.turnstile.render(
        turnstileRef.current,
        {
          sitekey:
            TURNSTILE_SITE_KEY,

          theme: "dark",

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
      // Turnstile gagal render
    }
  }, [turnstileReady]);


  /* =======================================================
     SELECT ENDPOINT
  ======================================================= */

  function selectEndpoint(
    endpoint,
    categoryName
  ) {
    setSelectedEndpoint(
      endpoint
    );

    setOpenCategory(
      categoryName
    );

    setValues(
      getInitialValues(endpoint)
    );

    setResponse(null);
    setError("");
    setCopied("");
    setActiveTab("tester");

    setMenuOpen(false);

    setTimeout(() => {
      document
        .querySelector(
          ".docs-main"
        )
        ?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    }, 50);
  }


  /* =======================================================
     VALUES
  ======================================================= */

  function updateValue(
    name,
    value
  ) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }


  /* =======================================================
     URL
  ======================================================= */

  const requestUrl =
    selectedEndpoint
      ? buildUrl(
          selectedEndpoint.path,
          values
        )
      : "";


  const curlCommand =
    selectedEndpoint
      ? makeCurl(
          requestUrl,
          selectedEndpoint.method
        )
      : "";


  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredCategories =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword) {
        return API_CATEGORIES;
      }

      return API_CATEGORIES
        .map((category) => {
          const endpoints =
            category.endpoints.filter(
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

          if (
            category.name
              .toLowerCase()
              .includes(keyword)
          ) {
            return category;
          }

          if (
            endpoints.length
          ) {
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
     TEST API
  ======================================================= */

  async function testApi() {
    if (!selectedEndpoint) {
      return;
    }

    setError("");
    setResponse(null);
    setLoading(true);

    try {
      const url =
        buildUrl(
          selectedEndpoint.path,
          values
        );

      const started =
        performance.now();

      const res =
        await fetch(url, {
          method:
            selectedEndpoint.method,
          headers: {
            Accept:
              "application/json, text/plain, */*",
          },
        });

      const elapsed =
        Math.round(
          performance.now() -
            started
        );

      const contentType =
        res.headers.get(
          "content-type"
        ) || "";

      let data;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data =
          await res.json();
      } else {
        data =
          await res.text();
      }

      setResponse({
        status:
          res.status,
        ok: res.ok,
        time:
          elapsed,
        type:
          contentType ||
          "unknown",
        data,
      });

      setActiveTab(
        "response"
      );
    } catch (err) {
      setError(
        err?.message ||
          "Request failed."
      );

      setActiveTab(
        "response"
      );
    } finally {
      setLoading(false);
    }
  }


  /* =======================================================
     COPY
  ======================================================= */

  async function copyText(
    text,
    type = "text"
  ) {
    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1600);
    } catch {
      setCopied("");
    }
  }


  /* =======================================================
     SCROLL
  ======================================================= */

  function scrollToDocs() {
    document
      .querySelector(
        ".docs-main"
      )
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

      <BackgroundEffects />


      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}


      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header className="topbar">

        <div className="topbar-left">

          <button
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>

          <div className="brand">

            <div className="brand-logo">
              <span>◆</span>
            </div>

            <div className="brand-text">
              <strong>
                DIN API
              </strong>

              <small>
                Developer Platform
              </small>
            </div>

          </div>

        </div>


        <div className="topbar-center">

          <div className="global-search">

            <span className="search-icon">
              ⌕
            </span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search endpoints..."
            />

            {search && (
              <button
                className="search-clear"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

            <kbd>
              /
            </kbd>

          </div>

        </div>


        <div className="topbar-right">

          <div className="api-status">
            <span className="status-dot" />
            <span>
              API Online
            </span>
          </div>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="top-link"
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
          className={`sidebar ${
            menuOpen
              ? "sidebar-open"
              : ""
          }`}
        >

          <div className="sidebar-header">

            <div>
              <span className="sidebar-label">
                DOCUMENTATION
              </span>

              <h2>
                API Reference
              </h2>
            </div>

            <button
              className="sidebar-close"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              ×
            </button>

          </div>


          <div className="sidebar-stats">

            <div>
              <strong>
                {API_CATEGORIES.length}
              </strong>

              <span>
                Categories
              </span>
            </div>

            <div>
              <strong>
                {totalEndpoints}
              </strong>

              <span>
                Endpoints
              </span>
            </div>

          </div>


          <nav className="category-list">

            {filteredCategories.length ===
              0 && (
              <div className="no-results">
                <span>
                  ⌕
                </span>

                <p>
                  Endpoint tidak ditemukan
                </p>
              </div>
            )}


            {filteredCategories.map(
              (category) => {
                const isOpen =
                  openCategory ===
                  category.name;

                return (
                  <div
                    className="category-group"
                    key={category.name}
                  >

                    <button
                      className={`category-button ${
                        isOpen
                          ? "category-active"
                          : ""
                      }`}
                      onClick={() =>
                        setOpenCategory(
                          isOpen
                            ? null
                            : category.name
                        )
                      }
                    >

                      <span
                        className={`category-icon category-${category.color}`}
                      >
                        {category.icon}
                      </span>

                      <span className="category-name">
                        {category.name}
                      </span>

                      <span className="category-count">
                        {
                          category
                            .endpoints
                            .length
                        }
                      </span>

                      <span
                        className={`category-arrow ${
                          isOpen
                            ? "arrow-open"
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
                              selectedEndpoint ===
                              endpoint;

                            return (
                              <button
                                key={
                                  endpoint.path
                                }
                                className={`endpoint-nav ${
                                  active
                                    ? "endpoint-nav-active"
                                    : ""
                                }`}
                                onClick={() =>
                                  selectEndpoint(
                                    endpoint,
                                    category.name
                                  )
                                }
                              >

                                <span className="endpoint-method">
                                  {endpoint.method}
                                </span>

                                <span className="endpoint-nav-name">
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

          </nav>


          <div className="sidebar-footer">

            <div className="sidebar-footer-icon">
              ⚡
            </div>

            <div>
              <strong>
                DIN API
              </strong>

              <span>
                Fast & Reliable API
              </span>
            </div>

          </div>

        </aside>


        {/* =================================================
            MAIN
        ================================================= */}

        <main className="docs-main">

          {selectedEndpoint ? (
            <>

              {/* =========================================
                  HERO
              ========================================= */}

              <section className="endpoint-hero">

                <div className="breadcrumb">
                  <span>
                    Docs
                  </span>

                  <span>
                    /
                  </span>

                  <span>
                    {openCategory}
                  </span>

                  <span>
                    /
                  </span>

                  <strong>
                    {
                      selectedEndpoint.name
                    }
                  </strong>
                </div>


                <div className="endpoint-title-row">

                  <div className="endpoint-title">

                    <div className="large-method">
                      {
                        selectedEndpoint.method
                      }
                    </div>

                    <div>

                      <h1>
                        {
                          selectedEndpoint.name
                        }
                      </h1>

                      <p>
                        {
                          selectedEndpoint.description
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* =======================================
                    URL BAR
                ======================================= */}

                <div className="request-url-card">

                  <div className="url-info">

                    <span className="url-method">
                      {
                        selectedEndpoint.method
                      }
                    </span>

                    <code>
                      {
                        selectedEndpoint.path
                      }
                    </code>

                  </div>

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
                      ? "✓ Copied"
                      : "Copy URL"}
                  </button>

                </div>

              </section>


              {/* =========================================
                  CONTENT GRID
              ========================================= */}

              <section className="content-grid">


                {/* =======================================
                    TESTER
                ======================================= */}

                <div className="tester-card">

                  <div className="card-header">

                    <div>

                      <span className="card-kicker">
                        API TESTER
                      </span>

                      <h2>
                        Test Endpoint
                      </h2>

                    </div>

                    <div className="live-badge">
                      <span />
                      LIVE
                    </div>

                  </div>


                  {/* TABS */}

                  <div className="tester-tabs">

                    <button
                      className={
                        activeTab ===
                        "tester"
                          ? "tab-active"
                          : ""
                      }
                      onClick={() =>
                        setActiveTab(
                          "tester"
                        )
                      }
                    >
                      Request
                    </button>

                    <button
                      className={
                        activeTab ===
                        "response"
                          ? "tab-active"
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

                  </div>


                  {activeTab ===
                    "tester" && (
                    <div className="tester-body">

                      {/* =================================
                          PARAMETERS
                      ================================= */}

                      {selectedEndpoint
                        .params
                        ?.length >
                      0 ? (
                        <div className="parameters-section">

                          <div className="section-heading">

                            <div>
                              <span>
                                QUERY PARAMETERS
                              </span>

                              <small>
                                Isi parameter untuk request
                              </small>
                            </div>

                            <span className="parameter-count">
                              {
                                selectedEndpoint
                                  .params
                                  .length
                              }
                            </span>

                          </div>


                          <div className="parameter-list">

                            {selectedEndpoint.params.map(
                              (param) => (
                                <div
                                  className="parameter-row"
                                  key={
                                    param.name
                                  }
                                >

                                  <div className="parameter-label">

                                    <label>
                                      {
                                        param.label ||
                                        param.name
                                      }
                                    </label>

                                    <code>
                                      {
                                        param.name
                                      }
                                    </code>

                                    {param.required && (
                                      <span className="required">
                                        Required
                                      </span>
                                    )}

                                  </div>


                                  {param.type ===
                                    "select" ? (
                                    <select
                                      value={
                                        values[
                                          param.name
                                        ] ??
                                        param.default ??
                                        ""
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateValue(
                                          param.name,
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                    >

                                      {param.options?.map(
                                        (option) => (
                                          <option
                                            key={
                                              option
                                            }
                                            value={
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
                                      type={
                                        param.type ||
                                        "text"
                                      }
                                      value={
                                        values[
                                          param.name
                                        ] ??
                                        ""
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateValue(
                                          param.name,
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                      placeholder={
                                        param.placeholder ||
                                        `Enter ${param.name}`
                                      }
                                    />
                                  )}

                                </div>
                              )
                            )}

                          </div>

                        </div>
                      ) : (
                        <div className="no-params">

                          <div className="no-params-icon">
                            ✓
                          </div>

                          <div>
                            <strong>
                              No parameters required
                            </strong>

                            <span>
                              Endpoint ini dapat langsung
                              dijalankan.
                            </span>
                          </div>

                        </div>
                      )}


                      {/* =================================
                          TURNSTILE
                      ================================= */}

                      <div className="security-box">

                        <div className="security-icon">
                          ◈
                        </div>

                        <div className="security-content">

                          <strong>
                            Security Verification
                          </strong>

                          <span>
                            Verify sebelum menjalankan
                            request.
                          </span>

                          <div
                            ref={
                              turnstileRef
                            }
                            className="turnstile-container"
                          />

                          {!turnstileReady && (
                            <small>
                              Memuat verification...
                            </small>
                          )}

                        </div>

                        <div
                          className={`verify-status ${
                            verified
                              ? "verified"
                              : ""
                          }`}
                        >
                          {verified
                            ? "✓"
                            : "○"}
                        </div>

                      </div>


                      {/* =================================
                          RUN BUTTON
                      ================================= */}

                      <button
                        className="run-button"
                        onClick={
                          testApi
                        }
                        disabled={
                          loading ||
                          !selectedEndpoint
                        }
                      >

                        {loading ? (
                          <>
                            <span className="button-spinner" />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <span>
                              ▶
                            </span>
                            Send Request
                          </>
                        )}

                      </button>

                    </div>
                  )}


                  {/* =======================================
                      RESPONSE
                  ======================================= */}

                  {activeTab ===
                    "response" && (
                    <div className="response-container">

                      {loading && (
                        <div className="response-loading">

                          <span className="big-spinner" />

                          <strong>
                            Request sedang diproses...
                          </strong>

                          <small>
                            Menunggu response dari server
                          </small>

                        </div>
                      )}


                      {!loading &&
                        !response &&
                        !error && (
                          <div className="empty-response">

                            <div className="empty-response-icon">
                              {`{ }`}
                            </div>

                            <strong>
                              Belum ada response
                            </strong>

                            <span>
                              Jalankan endpoint untuk
                              melihat hasil response.
                            </span>

                          </div>
                        )}


                      {!loading &&
                        error && (
                          <div className="error-response">

                            <div className="response-status response-error">
                              ERROR
                            </div>

                            <pre>
                              {error}
                            </pre>

                          </div>
                        )}


                      {!loading &&
                        response && (
                          <div className="response-result">

                            <div className="response-top">

                              <div className="response-status-row">

                                <span
                                  className={`response-status ${
                                    response.ok
                                      ? "response-success"
                                      : "response-error"
                                  }`}
                                >
                                  {response.status}
                                </span>

                                <strong>
                                  {
                                    response.ok
                                      ? "Request successful"
                                      : "Request failed"
                                  }
                                </strong>

                              </div>

                              <div className="response-meta">

                                <span>
                                  ⚡{" "}
                                  {
                                    response.time
                                  } ms
                                </span>

                                <span>
                                  {
                                    response.type
                                  }
                                </span>

                              </div>

                            </div>


                            <div className="response-code">

                              <div className="code-header">

                                <span>
                                  RESPONSE
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
                                    ? "✓ Copied"
                                    : "Copy"}
                                </button>

                              </div>

                              <pre>
                                <code>
                                  {
                                    formatResponse(
                                      response.data
                                    )
                                  }
                                </code>
                              </pre>

                            </div>

                          </div>
                        )}

                    </div>
                  )}

                </div>


                {/* =========================================
                    RIGHT PANEL
                ========================================= */}

                <div className="side-content">


                  {/* =======================================
                      REQUEST PREVIEW
                  ======================================= */}

                  <div className="preview-card">

                    <div className="preview-header">

                      <div>
                        <span>
                          REQUEST
                        </span>

                        <strong>
                          Preview
                        </strong>
                      </div>

                      <button
                        onClick={() =>
                          copyText(
                            curlCommand,
                            "curl"
                          )
                        }
                      >
                        {copied ===
                        "curl"
                          ? "✓"
                          : "Copy"}
                      </button>

                    </div>


                    <div className="code-window">

                      <div className="window-bar">

                        <span className="window-dot" />
                        <span className="window-dot" />
                        <span className="window-dot" />

                        <small>
                          curl
                        </small>

                      </div>

                      <pre>
                        <code>
                          <span className="code-command">
                            curl
                          </span>{" "}
                          -X{" "}
                          <span className="code-method">
                            {
                              selectedEndpoint.method
                            }
                          </span>{" "}
                          <span className="code-url">
                            "{requestUrl}"
                          </span>
                        </code>
                      </pre>

                    </div>

                  </div>


                  {/* =======================================
                      ENDPOINT INFO
                  ======================================= */}

                  <div className="info-card">

                    <div className="info-card-header">
                      <span>
                        ENDPOINT INFO
                      </span>
                    </div>

                    <div className="info-list">

                      <div>
                        <span>
                          Method
                        </span>

                        <strong className="info-get">
                          {
                            selectedEndpoint.method
                          }
                        </strong>
                      </div>

                      <div>
                        <span>
                          Path
                        </span>

                        <code>
                          {
                            selectedEndpoint.path
                          }
                        </code>
                      </div>

                      <div>
                        <span>
                          Parameters
                        </span>

                        <strong>
                          {
                            selectedEndpoint
                              .params
                              ?.length ||
                            0
                          }
                        </strong>
                      </div>

                      <div>
                        <span>
                          Response
                        </span>

                        <strong>
                          JSON
                        </strong>
                      </div>

                    </div>

                  </div>


                  {/* =======================================
                      QUICK START
                  ======================================= */}

                  <div className="quick-card">

                    <div className="quick-icon">
                      ⚡
                    </div>

                    <div>

                      <strong>
                        Quick Start
                      </strong>

                      <p>
                        Isi parameter lalu klik
                        <b>
                          {" "}
                          Send Request
                        </b>{" "}
                        untuk mencoba API.
                      </p>

                    </div>

                  </div>

                </div>

              </section>


              {/* =========================================
                  API BASE URL
              ========================================= */}

              <section className="base-url-section">

                <div className="base-url-icon">
                  ◉
                </div>

                <div className="base-url-content">

                  <span>
                    API BASE URL
                  </span>

                  <code>
                    {
                      API_BASE_URL ||
                      window.location.origin
                    }
                  </code>

                </div>

                <button
                  onClick={() =>
                    copyText(
                      API_BASE_URL ||
                        window.location.origin,
                      "base"
                    )
                  }
                >
                  {copied ===
                  "base"
                    ? "✓ Copied"
                    : "Copy"}
                </button>

              </section>


              {/* =========================================
                  FOOTER
              ========================================= */}

              <footer className="docs-footer">

                <div className="footer-brand">

                  <div className="footer-logo">
                    ◆
                  </div>

                  <div>
                    <strong>
                      DIN API
                    </strong>

                    <span>
                      Powerful API for developers.
                    </span>
                  </div>

                </div>

                <div className="footer-right">

                  <span>
                    ©{" "}
                    {new Date().getFullYear()}{" "}
                    DIN API
                  </span>

                  <span className="footer-separator">
                    •
                  </span>

                  <span>
                    Built for developers
                  </span>

                </div>

              </footer>

            </>
          ) : (

            /* =============================================
               EMPTY STATE
            ============================================= */

            <div className="empty-app">

              <div className="empty-app-icon">
                ◆
              </div>

              <h1>
                DIN API
              </h1>

              <p>
                Pilih endpoint dari sidebar
                untuk mulai.
              </p>

              <button
                onClick={() =>
                  selectEndpoint(
                    API_CATEGORIES[0]
                      .endpoints[0],
                    API_CATEGORIES[0]
                      .name
                  )
                }
              >
                Explore API
              </button>

            </div>

          )}

        </main>

      </div>


      {/* ===================================================
          DEVELOPER POPUP
      =================================================== */}

      {showDevPopup && (
        <div className="developer-popup">

          <div className="developer-popup-icon">
            ⚡
          </div>

          <div className="developer-popup-content">

            <strong>
              DIN API
            </strong>

            <span>
              API siap digunakan.
            </span>

          </div>

          <button
            onClick={() =>
              setShowDevPopup(false)
            }
          >
            ×
          </button>

        </div>
      )}

    </div>
  );
}
