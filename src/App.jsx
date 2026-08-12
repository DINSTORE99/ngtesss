import React, { useMemo, useState } from "react";
import "./style.css";

/* =========================================================
   DATA API
   ========================================================= */

const API_CATEGORIES = [
  /* =========================
     AI
  ========================= */
  {
    name: "AI",
    icon: "✦",
    color: "mint",
    path: "/api/ai",
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
    ],
  },

  /* =========================
     ADMIN
  ========================= */
  {
    name: "ADMIN",
    icon: "◇",
    color: "pink",
    path: "/api/admin",
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
        description: "Get information",
        params: [],
      },
    ],
  },

  /* =========================
     CACHE
  ========================= */
  {
    name: "CACHE",
    icon: "▣",
    color: "blue",
    path: "/api/cache",
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

  /* =========================
     DOWNLOAD
  ========================= */
  {
    name: "DOWNLOAD",
    icon: "⇩",
    color: "purple",
    path: "/api/download",
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
    ],
  },

  /* =========================
     FUN
  ========================= */
  {
    name: "FUN",
    icon: "🎮",
    color: "pink",
    path: "/api/fun",
    endpoints: [
      {
        name: "Fun",
        method: "GET",
        path: "/api/fun",
        description: "Fun utilities",
        params: [],
      },
    ],
  },

  /* =========================
     LEADERBOARD
  ========================= */
  {
    name: "LEADERBOARD",
    icon: "🏆",
    color: "orange",
    path: "/api/leaderboard",
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

  /* =========================
     LIBRARY
  ========================= */
  {
    name: "LIBRARY",
    icon: "▤",
    color: "orange",
    path: "/api/library",
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

  /* =========================
     MAKER
  ========================= */
  {
    name: "MAKER",
    icon: "✿",
    color: "pink",
    path: "/api/maker",
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

  /* =========================
     NEWS
  ========================= */
  {
    name: "NEWS",
    icon: "▤",
    color: "blue",
    path: "/api/news",
    endpoints: [
      {
        name: "News",
        method: "GET",
        path: "/api/news",
        description: "Get latest news",
        params: [],
      },
    ],
  },

  /* =========================
     RANDOM
  ========================= */
  {
    name: "RANDOM",
    icon: "◈",
    color: "purple",
    path: "/api/random",
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

  /* =========================
     SEARCH
  ========================= */
  {
    name: "SEARCH",
    icon: "⌕",
    color: "mint",
    path: "/api/search",
    endpoints: [
      {
        name: "Search",
        method: "GET",
        path: "/api/search",
        description: "Search utilities",
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

  /* =========================
     STALK
  ========================= */
  {
    name: "STALK",
    icon: "◉",
    color: "purple",
    path: "/api/stalk",
    endpoints: [
      {
        name: "Stalk",
        method: "GET",
        path: "/api/stalk",
        description: "Social media stalk utilities",
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

  /* =========================
     TOOLS
  ========================= */
  {
    name: "TOOLS",
    icon: "⌘",
    color: "orange",
    path: "/api/tools",
    endpoints: [
      {
        name: "Domain Info",
        method: "GET",
        path: "/api/tools/domaininfo",
        description: "Check information domain",
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


  const scrollToCategory = (categoryName) => {
    setMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(
        `category-${categoryName.toLowerCase()}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };


  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <div className="header-inner">

          <button
            className={`menu-button ${
              menuOpen ? "active" : ""
            }`}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </header>


      {/* OVERLAY */}

      <div
        className={`nav-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={() => setMenuOpen(false)}
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

          {/* HOME */}

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
          </button>


          {/* ALL CATEGORIES */}

          {API_CATEGORIES.map(
            (category, index) => (
              <button
                key={category.name}
                className="nav-item"
                onClick={() =>
                  scrollToCategory(
                    category.name
                  )
                }
              >

                <span>
                  {category.icon}
                </span>

                <b>
                  {category.name}
                </b>

                <small>
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </small>

              </button>
            )
          )}

        </div>

      </aside>


      {/* MAIN */}

      <main className="main">

        {/* HERO */}

        <section className="hero">

          <div className="terminal-badge">
            <span />
            TERMINAL ACTIVE
          </div>


          <div className="hero-title">

            <h1>
              DIN API🔥 
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

              <strong className="mint">
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
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search endpoint atau category..."
            />

            {search && (
              <button
                className="clear-search"
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
            (category) => {

              const isOpen =
                openCategory ===
                category.name;

              return (
                <article
                  key={category.name}
                  id={`category-${category.name.toLowerCase()}`}
                  className={`category-card ${
                    isOpen ? "opened" : ""
                  }`}
                >

                  {/* CATEGORY HEADER */}

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


                  {/* PATH */}

                  <div className="category-path">
                    {category.path}
                  </div>


                  {/* ENDPOINTS */}

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
                          key={endpoint.path}
                          endpoint={endpoint}
                        />
                      )
                    )}

                  </div>

                </article>
              );
            }
          )}


          {/* EMPTY */}

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

  const [expanded, setExpanded] =
    useState(false);

  const [values, setValues] =
    useState({});

  const [response, setResponse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const updateValue = (
    name,
    value
  ) => {

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const execute = async () => {

    setLoading(true);
    setResponse(null);

    try {

      const query =
        new URLSearchParams();

      endpoint.params.forEach(
        (param) => {

          const value =
            values[param.name];

          if (
            value !== undefined &&
            value !== ""
          ) {
            query.append(
              param.name,
              value
            );
          }

        }
      );


      const url =
        endpoint.path +
        (
          query.toString()
            ? `?${query.toString()}`
            : ""
        );


      const res =
        await fetch(url);


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


      setResponse(data);

    } catch (error) {

      setResponse({
        status: false,
        message:
          error.message,
      });

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="endpoint">

      <button
        className="endpoint-header"
        onClick={() =>
          setExpanded(
            !expanded
          )
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
          {expanded
            ? "−"
            : "+"}
        </span>

      </button>


      {expanded && (
        <div className="endpoint-body">

          <p className="endpoint-description">
            {endpoint.description}
          </p>


          {endpoint.params.length >
            0 && (

            <div className="params">

              {endpoint.params.map(
                (param) => (

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
                        param.placeholder
                      }
                    />

                  </label>

                )
              )}

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


          {response !== null && (
            <pre className="response">

              {typeof response ===
              "string"
                ? response
                : JSON.stringify(
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
