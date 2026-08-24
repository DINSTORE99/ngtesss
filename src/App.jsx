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

/*
  Kalau API dan website berada di domain yang sama:
  VITE_API_BASE_URL tidak perlu diisi.

  Kalau API berbeda domain:
  VITE_API_BASE_URL=https://api.siputzz.my.id
*/

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "";


/* =========================================================
   API DATA
========================================================= */

const API_CATEGORIES = [

  /* =======================================================
     AI
  ======================================================= */

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
            placeholder:
              "What is the meaning of life?",
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


  /* =======================================================
     ADMIN
  ======================================================= */

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


  /* =======================================================
     CACHE
  ======================================================= */

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


  /* =======================================================
     DOWNLOAD
  ======================================================= */

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


  /* =======================================================
     FUN
  ======================================================= */

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


  /* =======================================================
     LEADERBOARD
  ======================================================= */

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


  /* =======================================================
     LIBRARY
  ======================================================= */

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


  /* =======================================================
     MAKER
  ======================================================= */

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


  /* =======================================================
     NEWS
  ======================================================= */

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


  /* =======================================================
     RANDOM
  ======================================================= */

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


  /* =======================================================
     SEARCH
  ======================================================= */

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


  /* =======================================================
     STALK
  ======================================================= */

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


  /* =======================================================
     TOOLS
  ======================================================= */

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
  description: "Check whether a WhatsApp number is blocked/banned.",
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
        query.append(key, String(value));
      }
    }
  );

  const base =
    API_BASE_URL.replace(/\/+$/, "");

  const cleanPath =
    path.startsWith("/")
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


/* =========================================================
   APP
========================================================= */

export default function App() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [openCategory, setOpenCategory] =
    useState(null);

  const [turnstileReady, setTurnstileReady] =
    useState(false);

  const [verified, setVerified] =
    useState(false);

  const [showDevPopup, setShowDevPopup] =
    useState(true);


  const totalEndpoints =
    API_CATEGORIES.reduce(
      (total, category) =>
        total + category.endpoints.length,
      0
    );


  /* =======================================================
     TURNSTILE SCRIPT
  ======================================================= */

  useEffect(() => {

    if (window.turnstile) {
      setTurnstileReady(true);
      return;
    }

    const existing =
      document.querySelector(
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

    const onLoad = () =>
      setTurnstileReady(true);

    if (window.turnstile) {
      setTurnstileReady(true);
    } else {
      script.addEventListener(
        "load",
        onLoad
      );
    }

    return () => {
      script.removeEventListener?.(
        "load",
        onLoad
      );
    };

  }, []);


  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredCategories =
    useMemo(() => {

      const keyword =
        search.trim().toLowerCase();

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


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const scrollToCategory =
    (name) => {

      setMenuOpen(false);

      setTimeout(() => {

        const element =
          document.getElementById(
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


  /* =======================================================
     TURNSTILE GATE
  ======================================================= */

  if (!verified) {

    return (
      <TurnstileGate
        ready={turnstileReady}
        onVerified={() =>
          setVerified(true)
        }
      />
    );
  }


  /* =======================================================
     MAIN
  ======================================================= */

  return (

    <div className="app">

      {/* DEVELOPMENT POPUP */}

      {showDevPopup && (

        <div className="dev-popup-overlay">

          <div className="dev-popup">

            <button
              className="dev-popup-close"
              onClick={() =>
                setShowDevPopup(false)
              }
            >
              ×
            </button>

            <div className="dev-popup-header">

              <div className="dev-popup-icon">
                🚧
              </div>

              <div>

                <h2>
                  DINSTORE API
                </h2>

                <p>
                  Website masih dalam
                  pengembangan
                </p>

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

                <span>
                  Progress Website
                </span>

                <b>
                  50%
                </b>

              </div>

            </div>


            <p className="dev-popup-text">

              Website ini masih dalam
              tahap pengembangan.
              Beberapa API mungkin
              masih mengalami perubahan
              atau belum bisa digunakan.

            </p>


            <button
              className="dev-popup-button"
              onClick={() =>
                setShowDevPopup(false)
              }
            >
              LANJUTKAN
            </button>

          </div>

        </div>

      )}


      <div className="grid-background" />


      {/* ROBOT */}

      <div className="robot-decoration robot-one">

        <span />
        <span />
        <span />

      </div>


      {/* HEADER */}

      <header className="header">

        <div className="header-inner">

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Open menu"
          >

            <span />
            <span />
            <span />

          </button>


          <div className="brand">

            <div className="brand-core">
              D
            </div>

            <div>

              <strong>
                DINSTORE
              </strong>

              <small>
                API SYSTEM
              </small>

            </div>

          </div>


          <div className="header-status">

            <span />

            ONLINE

          </div>

        </div>

      </header>


      {/* OVERLAY */}

      <div
        className={`nav-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={() =>
          setMenuOpen(false)
        }
      />


      {/* SIDE NAV */}

      <aside
        className={`side-nav ${
          menuOpen ? "open" : ""
        }`}
      >

        <div className="side-nav-header">

          <div>

            <span className="nav-label">
              NAVIGATION
            </span>

            <h2>
              DINSTORE API
            </h2>

          </div>


          <button
            className="close-button"
            onClick={() =>
              setMenuOpen(false)
            }
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

            <span>
              ⌂
            </span>

            <b>
              HOME
            </b>

            <small>
              00
            </small>

          </button>


          {API_CATEGORIES.map(
            (category, index) => (

              <button
                className="nav-item"
                key={category.name}
                onClick={() =>
                  scrollToCategory(
                    category.name
                  )
                }
              >

                <span
                  className={
                    category.color
                  }
                >
                  {category.icon}
                </span>

                <b>
                  {category.name}
                </b>

                <small>
                  {String(index + 1)
                    .padStart(2, "0")}
                </small>

              </button>

            )
          )}

        </div>


        <div className="side-footer">

          <span>
            SYSTEM STATUS
          </span>

          <strong>
            ● OPERATIONAL
          </strong>

        </div>

      </aside>


      {/* MAIN */}

      <main className="main">


        {/* HERO */}

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

            <h1>
              DINSTORE
            </h1>

            <span>
              3.0.0
            </span>

          </div>


          <p className="hero-description">

            A comprehensive and user
            friendly API solution for
            modern applications.

          </p>


          <div className="stats">

            <div className="stat">

              <span>
                CATEGORIES
              </span>

              <strong>
                {API_CATEGORIES.length}
              </strong>

            </div>


            <div className="stat green">

              <span>
                ENDPOINTS
              </span>

              <strong>
                {totalEndpoints}
              </strong>

            </div>


            <div className="stat status">

              <span>
                STATUS
              </span>

              <strong>
                ONLINE
              </strong>

            </div>

          </div>

        </section>


        {/* SEARCH */}

        <section className="search-section">

          <div className="search-box">

            <span>
              ⌕
            </span>


            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="SEARCH ENDPOINT / CATEGORY..."
            />


            {search && (

              <button
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>

            )}

          </div>

        </section>


        {/* CATEGORIES */}

        <section className="categories">

          {filteredCategories.map(
            (category, index) => {

              const isOpen =
                openCategory ===
                category.name;


              return (

                <article
                  key={category.name}
                  id={`category-${category.name.toLowerCase()}`}
                  className={`category-card ${
                    isOpen
                      ? "opened"
                      : ""
                  }`}
                >

                  <button
                    className="category-top"
                    onClick={() =>
                      setOpenCategory(
                        isOpen
                          ? null
                          : category.name
                      )
                    }
                  >

                    <div
                      className={`category-icon ${
                        category.color
                      }`}
                    >
                      {category.icon}
                    </div>


                    <div className="category-info">

                      <small>

                        MODULE{" "}

                        {String(index + 1)
                          .padStart(
                            2,
                            "0"
                          )}

                      </small>


                      <h2>
                        {category.name}
                      </h2>


                      <span>

                        {category.endpoints.length}

                        {" "}ENDPOINTS

                      </span>

                    </div>


                    <span className="open-label">

                      {isOpen
                        ? "CLOSE ↑"
                        : "OPEN →"}

                    </span>

                  </button>


                  <div className="category-path">

                    <span>
                      PATH
                    </span>

                    {category.path}

                  </div>


                  <div
                    className={`endpoint-list ${
                      isOpen
                        ? "visible"
                        : ""
                    }`}
                  >

                    {category.endpoints.map(
                      (endpoint) => (

                        <EndpointCard
                          key={
                            endpoint.path
                          }
                          endpoint={
                            endpoint
                          }
                        />

                      )
                    )}

                  </div>

                </article>

              );
            }
          )}


          {!filteredCategories.length && (

            <div className="empty">

              <strong>
                ENDPOINT NOT FOUND
              </strong>

              <span>
                Try another keyword.
              </span>

            </div>

          )}

        </section>

      </main>


      {/* FLOATING WHATSAPP */}

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
   TURNSTILE
========================================================= */

function TurnstileGate({
  ready,
  onVerified,
}) {

  const widgetRef =
    useRef(null);

  const widgetIdRef =
    useRef(null);

  const [error, setError] =
    useState("");

  const [checking, setChecking] =
    useState(false);


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
      import.meta.env
        .VITE_TURNSTILE_SITE_KEY;


    if (!siteKey) {

      setError(
        "VITE_TURNSTILE_SITE_KEY belum dikonfigurasi di Vercel."
      );

      return;
    }


    try {

      widgetIdRef.current =
        window.turnstile.render(
          widgetRef.current,
          {

            sitekey: siteKey,

            theme: "dark",


            callback:
              async (token) => {

                setError("");
                setChecking(true);


                try {

                  const verify =
                    await fetch(
                      "/api/verify-turnstile",
                      {
                        method:
                          "POST",

                        headers: {
                          "Content-Type":
                            "application/json",
                        },

                        body:
                          JSON.stringify({
                            token,
                          }),
                      }
                    );


                  const data =
                    await verify.json();


                  if (
                    !verify.ok ||
                    !data.success
                  ) {

                    throw new Error(
                      data.message ||
                        "Verifikasi Cloudflare gagal."
                    );
                  }


                  onVerified();

                } catch (err) {

                  setError(
                    err.message ||
                      "Verifikasi gagal."
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


            "expired-callback":
              () => {

                setError(
                  "Verifikasi kedaluwarsa. Silakan ulangi."
                );

              },


            "error-callback":
              () => {

                setError(
                  "Cloudflare Turnstile gagal dimuat."
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


      widgetIdRef.current =
        null;

    };

  }, [
    ready,
    onVerified,
  ]);


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

            <strong>
              DIN API🔥
            </strong>

            <span>
              API SYSTEM
            </span>

          </div>

        </div>


        <div className="verification-line" />


        <div className="verification-icon">
          ◉
        </div>


        <span className="verification-eyebrow">
          SECURITY CHECK
        </span>


        <h1>
          VERIFY ACCESS
        </h1>


        <p>

          Selesaikan verifikasi
          Cloudflare terlebih dahulu
          untuk masuk ke DIN API.

        </p>


        <div className="verification-status">

          <span
            className={
              checking
                ? "checking"
                : ""
            }
          />

          {checking
            ? "VERIFYING..."
            : "WAITING FOR VERIFICATION"}

        </div>


        <div className="turnstile-gate-widget">

          {ready ? (

            <div
              ref={widgetRef}
            />

          ) : (

            <div className="turnstile-loading">

              MEMUAT CLOUDFLARE...

            </div>

          )}

        </div>


        {error && (

          <div className="verification-error">

            <b>
              !
            </b>

            <span>
              {error}
            </span>

          </div>

        )}


        <small className="verification-note">

          Your connection is protected
          by Cloudflare Turnstile.

        </small>

      </div>

    </div>

  );
}


/* =========================================================
   ENDPOINT CARD
   FITUR:
   - GET / POST
   - REQUEST PARAMETER
   - EXECUTE
   - CLEAR
   - PREVIEW
   - HEADERS
   - CURL
   - STATUS
   - PING / LATENCY
   - COPY CURL
   - COPY RESPONSE
========================================================= */

function EndpointCard({
  endpoint,
}) {

  const [expanded, setExpanded] =
    useState(false);

  const [values, setValues] =
    useState(() => {

      const initial = {};

      endpoint.params.forEach(
        (param) => {

          if (
            param.default !==
            undefined
          ) {

            initial[param.name] =
              param.default;

          }

        }
      );

      return initial;

    });


  const [response, setResponse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("preview");

  const [latency, setLatency] =
    useState(null);

  const [statusCode, setStatusCode] =
    useState(null);

  const [statusText, setStatusText] =
    useState("");

  const [responseHeaders, setResponseHeaders] =
    useState({});

  const [requestUrl, setRequestUrl] =
    useState(
      buildUrl(
        endpoint.path,
        {}
      )
    );


  const updateValue = (
    name,
    value
  ) => {

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  /* =======================================================
     CLEAR
  ======================================================= */

  const clearRequest = () => {

    const initial = {};

    endpoint.params.forEach(
      (param) => {

        if (
          param.default !==
          undefined
        ) {

          initial[param.name] =
            param.default;

        }

      }
    );


    setValues(initial);

    setResponse(null);

    setLatency(null);

    setStatusCode(null);

    setStatusText("");

    setResponseHeaders({});

    setRequestUrl(
      buildUrl(
        endpoint.path,
        {}
      )
    );

    setActiveTab("preview");

  };


  /* =======================================================
     EXECUTE
  ======================================================= */

  const execute = async () => {

    setLoading(true);

    setResponse(null);

    setLatency(null);

    setStatusCode(null);

    setStatusText("");

    setResponseHeaders({});


    try {

      /* REQUIRED CHECK */

      for (
        const param of endpoint.params
      ) {

        if (
          param.required &&
          !String(
            values[param.name] ||
              ""
          ).trim()
        ) {

          throw new Error(
            `${param.label} wajib diisi.`
          );

        }

      }


      /* URL */

      const url =
        buildUrl(
          endpoint.path,
          values
        );


      setRequestUrl(url);


      /*
        performance.now()
        digunakan untuk menghitung
        ping / latency request.
      */

      const start =
        performance.now();


      const res =
        await fetch(
          url,
          {
            method:
              endpoint.method ||
              "GET",

            headers: {
              Accept:
                "application/json",
            },
          }
        );


      const end =
        performance.now();


      const requestTime =
        Math.round(
          end - start
        );


      setLatency(
        requestTime
      );


      setStatusCode(
        res.status
      );


      setStatusText(
        res.statusText ||
          ""
      );


      /* RESPONSE HEADERS */

      const headers = {};

      res.headers.forEach(
        (value, key) => {

          headers[key] =
            value;

        }
      );

      setResponseHeaders(
        headers
      );


      /* RESPONSE BODY */

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

        const text =
          await res.text();

        try {

          data =
            JSON.parse(text);

        } catch {

          data = {
            success:
              res.ok,

            status:
              res.status,

            response:
              text,
          };

        }

      }


      setResponse(data);

      setActiveTab(
        "preview"
      );

    } catch (error) {

      const message =
        error?.message ||
        "Request failed.";


      setResponse({
        success: false,
        message,
      });


      setStatusCode(
        0
      );


      setStatusText(
        "ERROR"
      );


      setActiveTab(
        "preview"
      );

    } finally {

      setLoading(false);

    }

  };


  const curl =
    makeCurl(
      requestUrl,
      endpoint.method ||
        "GET"
    );


  const copyText = async (
    text
  ) => {

    try {

      await navigator.clipboard.writeText(
        text
      );

    } catch {

      const textarea =
        document.createElement(
          "textarea"
        );

      textarea.value =
        text;

      document.body.appendChild(
        textarea
      );

      textarea.select();

      document.execCommand(
        "copy"
      );

      textarea.remove();

    }

  };


  const statusLabel =
    statusCode
      ? `${statusCode} ${
          statusText || ""
        }`
      : "—";


  return (

    <div
      className={`endpoint ${
        expanded
          ? "endpoint-open"
          : ""
      }`}
    >

      {/* =================================================
          ENDPOINT HEADER
      ================================================= */}

      <button
        className="endpoint-header"
        onClick={() =>
          setExpanded(
            !expanded
          )
        }
      >

        <div className="method">

          {endpoint.method ||
            "GET"}

        </div>


        <div className="endpoint-main">

          <strong>
            {endpoint.name}
          </strong>

          <span>
            {endpoint.path}
          </span>

        </div>


        <span className="endpoint-chevron">

          {expanded
            ? "−"
            : "+"}

        </span>

      </button>


      {/* =================================================
          BODY
      ================================================= */}

      {expanded && (

        <div className="endpoint-body">

          {/* DESCRIPTION */}

          <p className="endpoint-description">

            {endpoint.description}

          </p>


          {/* METHOD */}

          <div className="request-methods">

            <button
              className="request-method active"
              type="button"
            >
              GET
            </button>


            <button
              className="request-method disabled"
              type="button"
              disabled
            >
              POST
            </button>

          </div>


          {/* REQUEST PARAMETERS */}

          {endpoint.params.length >
            0 && (

            <div className="request-section">

              <div className="request-title">

                REQUEST PARAMETERS

              </div>


              <div className="params">

                {endpoint.params.map(
                  (param) => (

                    <label
                      className="param"
                      key={
                        param.name
                      }
                    >

                      <div className="param-label">

                        <span>
                          {param.label}
                        </span>


                        {param.required && (

                          <small>
                            *
                          </small>

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
                          onChange={(e) =>
                            updateValue(
                              param.name,
                              e.target.value
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
                                {option}
                              </option>

                            )
                          )}

                        </select>

                      ) : (

                        <input
                          value={
                            values[
                              param.name
                            ] || ""
                          }
                          onChange={(e) =>
                            updateValue(
                              param.name,
                              e.target.value
                            )
                          }
                          placeholder={
                            param.placeholder ||
                            ""
                          }
                        />

                      )}

                    </label>

                  )
                )}

              </div>

            </div>

          )}


          {/* =================================================
              EXECUTE
          ================================================= */}

          <button
            className="execute-button"
            onClick={execute}
            disabled={loading}
          >

            {loading
              ? "EXECUTING REQUEST..."
              : "EXECUTE REQUEST →"}

          </button>


          {/* =================================================
              CLEAR
          ================================================= */}

          <button
            className="clear-button"
            type="button"
            onClick={clearRequest}
          >
            CLEAR
          </button>


          {/* =================================================
              REQUEST INFO
          ================================================= */}

          <div className="request-preview-line">

            <span>
              REQUEST
            </span>

            <code>
              {requestUrl}
            </code>

          </div>


          {/* =================================================
              RESPONSE PANEL
          ================================================= */}

          {(response ||
            loading) && (

            <div className="response-panel">

              {/* RESPONSE HEADER */}

              <div className="response-top">

                <div className="response-tabs">

                  <button
                    className={
                      activeTab ===
                      "preview"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(
                        "preview"
                      )
                    }
                  >
                    PREVIEW
                  </button>


                  <button
                    className={
                      activeTab ===
                      "headers"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(
                        "headers"
                      )
                    }
                  >
                    HEADERS
                  </button>


                  <button
                    className={
                      activeTab ===
                      "curl"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(
                        "curl"
                      )
                    }
                  >
                    CURL
                  </button>

                </div>


                <button
                  className="copy-button"
                  onClick={() => {

                    if (
                      activeTab ===
                      "curl"
                    ) {

                      copyText(
                        curl
                      );

                    } else if (
                      activeTab ===
                      "headers"
                    ) {

                      copyText(
                        JSON.stringify(
                          responseHeaders,
                          null,
                          2
                        )
                      );

                    } else {

                      copyText(
                        formatResponse(
                          response
                        )
                      );

                    }

                  }}
                  title="Copy"
                >
                  ▣
                </button>


                <div className="response-status">

                  <span
                    className={
                      statusCode >=
                      200 &&
                      statusCode <
                        300
                        ? "success"
                        : "error"
                    }
                  >
                    {statusLabel}
                  </span>


                  {latency !==
                    null && (

                    <small>
                      {latency}ms
                    </small>

                  )}

                </div>

              </div>


              {/* =================================================
                  PREVIEW
              ================================================= */}

              {activeTab ===
                "preview" && (

                <pre className="response">

                  {loading
                    ? "Loading..."
                    : formatResponse(
                        response
                      )}

                </pre>

              )}


              {/* =================================================
                  HEADERS
              ================================================= */}

              {activeTab ===
                "headers" && (

                <div className="headers-view">

                  {Object.keys(
                    responseHeaders
                  ).length ===
                  0 ? (

                    <div className="headers-empty">
                      No response headers.
                    </div>

                  ) : (

                    Object.entries(
                      responseHeaders
                    ).map(
                      ([key, value]) => (

                        <div
                          className="header-row"
                          key={key}
                        >

                          <strong>
                            {key}:
                          </strong>

                          <span>
                            {value}
                          </span>

                        </div>

                      )
                    )

                  )}

                </div>

              )}


              {/* =================================================
                  CURL
              ================================================= */}

              {activeTab ===
                "curl" && (

                <pre className="curl-view">

                  {curl}

                </pre>

              )}

            </div>

          )}

        </div>

      )}

    </div>

  );
}
