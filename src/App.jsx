import React, { useMemo, useState } from "react";
import "./style.css";

/* =========================================================
   API CONFIG
========================================================= */

const API_CATEGORIES = [
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
        description: "AI chat assistant",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "tes",
            required: true,
          },
          {
            name: "reset",
            label: "Reset",
            placeholder: "oke",
            required: false,
          },
        ],
      },

      {
        name: "AI Lyrics Generator",
        method: "GET",
        path: "/api/ai/lyricsgen",
        description: "Generate lyrics menggunakan AI",
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
        description: "Generate kode menggunakan AI",
        params: [
          {
            name: "prompt",
            label: "Prompt",
            placeholder: "buat landing page portfolio modern",
            required: true,
          },
        ],
      },

      {
        name: "AI4Chat",
        method: "GET",
        path: "/api/ai/ai4chat",
        description: "AI chat",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "tes",
            required: true,
          },
        ],
      },
    ],
  },

  {
    name: "ADMIN",
    icon: "◇",
    color: "pink",
    path: "/docs/admin",
    endpoints: [
      {
        name: "Admin Status",
        method: "GET",
        path: "/api/admin/status",
        description: "Check admin status",
        params: [],
      },
      {
        name: "Admin Info",
        method: "GET",
        path: "/api/admin/info",
        description: "Get admin information",
        params: [],
      },
    ],
  },

  {
    name: "CACHE",
    icon: "▣",
    color: "blue",
    path: "/docs/cache",
    endpoints: [
      {
        name: "Cache Get",
        method: "GET",
        path: "/api/cache/get",
        description: "Get cached data",
        params: [],
      },
      {
        name: "Cache Clear",
        method: "GET",
        path: "/api/cache/clear",
        description: "Clear cache",
        params: [],
      },
    ],
  },

  {
    name: "DOWNLOAD",
    icon: "⇩",
    color: "purple",
    path: "/docs/download",
    endpoints: [
      {
        name: "TikTok Downloader",
        method: "GET",
        path: "/api/tiktok",
        description: "Download video TikTok",
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
        path: "/api/instagram",
        description: "Download media Instagram",
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
        path: "/api/d/capcut",
        description: "Download CapCut",
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
        description: "Download Facebook media",
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
        description: "Download MediaFire",
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
        description: "Download Pinterest media",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://pinterest.com/...",
            required: true,
          },
        ],
      },

      {
        name: "Spotify Downloader",
        method: "GET",
        path: "/api/download/spotify",
        description: "Download Spotify media",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://open.spotify.com/...",
            required: true,
          },
        ],
      },

      {
        name: "SoundCloud Downloader",
        method: "GET",
        path: "/api/download/soundcloud",
        description: "Download SoundCloud",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://soundcloud.com/...",
            required: true,
          },
        ],
      },

      {
        name: "X Downloader",
        method: "GET",
        path: "/api/download/x",
        description: "Download X media",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://x.com/...",
            required: true,
          },
        ],
      },

      {
        name: "Apple Music Downloader",
        method: "GET",
        path: "/api/download/applemusic",
        description: "Download Apple Music",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "Apple Music URL",
            required: true,
          },
        ],
      },

      {
        name: "Douyin Downloader",
        method: "GET",
        path: "/api/downloader/douyin",
        description: "Download Douyin",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "Douyin URL",
            required: true,
          },
        ],
      },

      {
        name: "DramaBox Downloader",
        method: "GET",
        path: "/api/download/dramabox",
        description: "Download DramaBox",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "DramaBox URL",
            required: true,
          },
        ],
      },

      {
        name: "CapCut",
        method: "GET",
        path: "/api/download/capcut",
        description: "CapCut downloader",
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
        name: "TikTok Slide",
        method: "GET",
        path: "/api/download/tiktokslide",
        description: "TikTok slide downloader",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "TikTok URL",
            required: true,
          },
        ],
      },

      {
        name: "YouTube MP3",
        method: "GET",
        path: "/api/download/ytmp3",
        description: "Convert YouTube to MP3",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "YouTube URL",
            required: true,
          },
        ],
      },

      {
        name: "YouTube Play",
        method: "GET",
        path: "/api/download/ytplay",
        description: "YouTube downloader",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "YouTube URL",
            required: true,
          },
        ],
      },
    ],
  },

  {
    name: "FUN",
    icon: "★",
    color: "yellow",
    path: "/docs/fun",
    endpoints: [
      {
        name: "Fun API",
        method: "GET",
        path: "/api/fun",
        description: "Fun utilities",
        params: [],
      },
    ],
  },

  {
    name: "LEADERBOARD",
    icon: "♛",
    color: "orange",
    path: "/docs/leaderboard",
    endpoints: [
      {
        name: "Leaderboard",
        method: "GET",
        path: "/api/leaderboard",
        description: "Get leaderboard data",
        params: [],
      },
    ],
  },

  {
    name: "LIBRARY",
    icon: "▤",
    color: "blue",
    path: "/docs/library",
    endpoints: [
      {
        name: "Library",
        method: "GET",
        path: "/api/library",
        description: "Library utilities",
        params: [],
      },
    ],
  },

  {
    name: "MAKER",
    icon: "✿",
    color: "pink",
    path: "/docs/maker",
    endpoints: [
      {
        name: "Maker",
        method: "GET",
        path: "/api/maker",
        description: "Maker utilities",
        params: [],
      },
    ],
  },

  {
    name: "NEWS",
    icon: "▰",
    color: "blue",
    path: "/docs/news",
    endpoints: [
      {
        name: "News",
        method: "GET",
        path: "/api/news",
        description: "Latest news",
        params: [],
      },
    ],
  },

  {
    name: "RANDOM",
    icon: "◆",
    color: "purple",
    path: "/docs/random",
    endpoints: [
      {
        name: "Random",
        method: "GET",
        path: "/api/random",
        description: "Random utilities",
        params: [],
      },
    ],
  },

  {
    name: "SEARCH",
    icon: "⌕",
    color: "mint",
    path: "/docs/search",
    endpoints: [
      {
        name: "Search",
        method: "GET",
        path: "/api/search",
        description: "Search API",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "keyword",
            required: true,
          },
        ],
      },
    ],
  },

  {
    name: "STALK",
    icon: "◎",
    color: "purple",
    path: "/docs/stalk",
    endpoints: [
      {
        name: "Stalk",
        method: "GET",
        path: "/api/stalk",
        description: "Social media stalk utility",
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
        description: "Check domain information",
        params: [
          {
            name: "domain",
            label: "Domain",
            placeholder: "dinns.my.id",
            required: true,
          },
        ],
      },

      {
        name: "QR Generator",
        method: "GET",
        path: "/api/tools/qr",
        description: "Generate QR code",
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
        description: "Shorten URL",
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
   APP
========================================================= */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState(null);

  const totalEndpoints = API_CATEGORIES.reduce(
    (total, category) =>
      total + category.endpoints.length,
    0
  );

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return API_CATEGORIES;
    }

    return API_CATEGORIES
      .map((category) => {
        const categoryMatch =
          category.name.toLowerCase().includes(keyword);

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


  const goHome = () => {
    setMenuOpen(false);
    setOpenCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const scrollToCategory = (name) => {
    setMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(
        `category-${name.toLowerCase()}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setOpenCategory(name);
    }, 200);
  };


  return (
    <div className="app">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="header">

        <div className="header-inner">

          <button
            className={`menu-button ${
              menuOpen ? "active" : ""
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <span />
            <span />
            <span />
          </button>

        </div>

      </header>


      {/* =========================================
          NAV OVERLAY
      ========================================= */}

      <div
        className={`nav-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />


      {/* =========================================
          SIDE NAV
      ========================================= */}

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
              ZEL API
            </h2>
          </div>

          <button
            className="close-button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>


        <div className="nav-items">

          <button
            className="nav-item home"
            onClick={goHome}
          >
            <span>⌂</span>
            <b>HOME</b>
            <small>00</small>
          </button>


          {API_CATEGORIES.map(
            (category, index) => (
              <button
                key={category.name}
                className="nav-item"
                onClick={() =>
                  scrollToCategory(category.name)
                }
              >
                <span>
                  {category.icon}
                </span>

                <b>
                  {category.name}
                </b>

                <small>
                  {String(index + 1).padStart(2, "0")}
                </small>
              </button>
            )
          )}

        </div>

      </aside>


      {/* =========================================
          MAIN
      ========================================= */}

      <main className="main">

        {/* HERO */}

        <section className="hero">

          <div className="terminal-badge">
            <span />
            TERMINAL ACTIVE
          </div>


          <div className="hero-title">

            <h1>
              ZEL API
            </h1>

            <span>
              3.0.0
            </span>

          </div>


          <p className="hero-description">
            A comprehensive and user friendly API
            solution for modern applications.
          </p>


          {/* STATS */}

          <div className="stats">

            <div className="stat">

              <span>
                CATEGORIES
              </span>

              <strong>
                {API_CATEGORIES.length}
              </strong>

            </div>


            <div className="stat">

              <span>
                ENDPOINTS
              </span>

              <strong className="mint-text">
                {totalEndpoints}
              </strong>

            </div>

          </div>

        </section>


        {/* SEARCH */}

        <section className="search-section">

          <div className="search-box">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search endpoint atau category..."
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

        </section>


        {/* CATEGORY LIST */}

        <section className="categories">

          {filteredCategories.map(
            (category) => {

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
                        isOpen
                          ? null
                          : category.name
                      )
                    }
                  >

                    <div
                      className={`category-icon ${category.color}`}
                    >
                      {category.icon}
                    </div>


                    <div className="category-info">

                      <h2>
                        {category.name}
                      </h2>

                      <span>
                        {category.endpoints.length} ENDPOINTS
                      </span>

                    </div>


                    <span className="open-label">
                      {isOpen
                        ? "CLOSE"
                        : "OPEN"}{" "}
                      →
                    </span>

                  </button>


                  <div className="category-path">
                    {category.path}
                  </div>


                  <div
                    className={`endpoint-list ${
                      isOpen ? "visible" : ""
                    }`}
                  >

                    {category.endpoints.map(
                      (endpoint) => (
                        <EndpointCard
                          key={`${category.name}-${endpoint.path}`}
                          endpoint={endpoint}
                        />
                      )
                    )}

                  </div>

                </article>
              );
            }
          )}


          {filteredCategories.length === 0 && (
            <div className="empty">

              <strong>
                Endpoint tidak ditemukan
              </strong>

              <span>
                Coba kata kunci lain.
              </span>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   ENDPOINT CARD
========================================================= */

function EndpointCard({ endpoint }) {
  const [expanded, setExpanded] = useState(false);

  const [values, setValues] = useState({});

  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(false);

  const [requestUrl, setRequestUrl] = useState("");


  const updateValue = (name, value) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const execute = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const query = new URLSearchParams();

      endpoint.params.forEach((param) => {
        const value = values[param.name];

        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          query.append(param.name, value);
        }
      });


      const url =
        endpoint.path +
        (
          query.toString()
            ? `?${query.toString()}`
            : ""
        );


      setRequestUrl(url);


      const startTime = performance.now();

      const res = await fetch(url);

      const elapsed = Math.round(
        performance.now() - startTime
      );


      const contentType =
        res.headers.get("content-type") || "";


      let data;

      if (
        contentType.includes("application/json")
      ) {
        data = await res.json();
      } else {
        data = await res.text();
      }


      setResponse({
        httpStatus: res.status,
        responseTime: elapsed,
        data,
      });

    } catch (error) {

      setResponse({
        httpStatus: 0,
        responseTime: 0,
        data: {
          status: false,
          message: error.message,
        },
      });

    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className={`endpoint ${
        expanded ? "endpoint-open" : ""
      }`}
    >

      {/* ENDPOINT HEADER */}

      <button
        className="endpoint-header"
        onClick={() =>
          setExpanded((previous) => !previous)
        }
      >

        <div className="method">
          {endpoint.method}
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
          {expanded ? "−" : "+"}
        </span>

      </button>


      {/* ENDPOINT BODY */}

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

                    <span>
                      {param.label}
                    </span>

                    {param.required && (
                      <small>
                        REQUIRED
                      </small>
                    )}

                  </div>


                  <input
                    type="text"
                    value={
                      values[param.name] || ""
                    }
                    onChange={(event) =>
                      updateValue(
                        param.name,
                        event.target.value
                      )
                    }
                    placeholder={
                      param.placeholder
                    }
                  />

                </label>
              ))}

            </div>
          )}


          {/* EXECUTE */}

          <button
            className="execute-button"
            onClick={execute}
            disabled={loading}
          >

            <span>
              {loading
                ? "EXECUTING..."
                : "EXECUTE"}
            </span>

            {!loading && (
              <span>
                →
              </span>
            )}

          </button>


          {/* REQUEST URL */}

          {requestUrl && (
            <div className="request-url">

              <span>
                REQUEST
              </span>

              <code>
                {requestUrl}
              </code>

            </div>
          )}


          {/* RESPONSE */}

          {response !== null && (
            <div className="response-wrapper">

              <div className="response-header">

                <span>
                  RESPONSE
                </span>

                <div>

                  <small
                    className={
                      response.httpStatus >= 200 &&
                      response.httpStatus < 300
                        ? "success"
                        : "error"
                    }
                  >
                    {response.httpStatus || "ERROR"}
                  </small>

                  <small>
                    {response.responseTime}ms
                  </small>

                </div>

              </div>


              <pre className="response">

                {typeof response.data === "string"
                  ? response.data
                  : JSON.stringify(
                      response.data,
                      null,
                      2
                    )}

              </pre>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
