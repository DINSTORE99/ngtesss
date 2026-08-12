import React, { useMemo, useState } from "react";
import "./style.css";

/* =========================================================
   DATA API
========================================================= */

const API_CATEGORIES = [
  {
    name: "AI",
    icon: "✦",
    path: "/docs/ai",
    color: "purple",
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

  {
    name: "ADMIN",
    icon: "◇",
    path: "/docs/admin",
    color: "pink",
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

  {
    name: "CACHE",
    icon: "▣",
    path: "/docs/cache",
    color: "blue",
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
    path: "/docs/download",
    color: "cyan",
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

  /* =====================================================
     CATEGORY YANG BELUM ADA ENDPOINT
     ===================================================== */

  {
    name: "FUN",
    icon: "🎮",
    path: "/docs/fun",
    color: "pink",
    endpoints: [],
  },

  {
    name: "LEADERBOARD",
    icon: "🏆",
    path: "/docs/leaderboard",
    color: "orange",
    endpoints: [],
  },

  {
    name: "LIBRARY",
    icon: "▤",
    path: "/docs/library",
    color: "yellow",
    endpoints: [],
  },

  {
    name: "MAKER",
    icon: "✦",
    path: "/docs/maker",
    color: "pink",
    endpoints: [],
  },

  {
    name: "NEWS",
    icon: "▣",
    path: "/docs/news",
    color: "cyan",
    endpoints: [],
  },

  {
    name: "RANDOM",
    icon: "◈",
    path: "/docs/random",
    color: "purple",
    endpoints: [],
  },

  {
    name: "SEARCH",
    icon: "⌕",
    path: "/docs/search",
    color: "green",
    endpoints: [],
  },

  {
    name: "STALK",
    icon: "◉",
    path: "/docs/stalk",
    color: "blue",
    endpoints: [],
  },

  {
    name: "TOOLS",
    icon: "⌘",
    path: "/docs/tools",
    color: "orange",
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

  /* =====================================================
     SEARCH
  ===================================================== */

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


  /* =====================================================
     NAVIGATION
  ===================================================== */

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


  const goHome = () => {
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <div className="app">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="top-header">

        <button
          className={`nav-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() =>
            setMenuOpen(true)
          }
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>

      </header>


      {/* =================================================
          OVERLAY
      ================================================= */}

      <div
        className={`nav-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={() =>
          setMenuOpen(false)
        }
      />


      {/* =================================================
          SIDE NAVIGATION
      ================================================= */}

      <aside
        className={`side-nav ${
          menuOpen ? "open" : ""
        }`}
      >

        <div className="nav-top">

          <div>
            <small>
              NAVIGATION
            </small>

            <h2>
              DINSTORE API
            </h2>
          </div>


          <button
            className="close-nav"
            onClick={() =>
              setMenuOpen(false)
            }
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>


        <div className="nav-list">

          {/* HOME */}

          <button
            className="nav-item home-item"
            onClick={goHome}
          >
            <span className="nav-icon">
              ⌂
            </span>

            <strong>
              HOME
            </strong>

            <small>
              —
            </small>
          </button>


          {/* ALL CATEGORY */}

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

                <span className="nav-icon">
                  {category.icon}
                </span>

                <strong>
                  {category.name}
                </strong>

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


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="content">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          <div className="status">
            <span />
            API SYSTEM ONLINE
          </div>


          <h1>
            DINSTORE{" "}
            <strong>
              API
            </strong>
          </h1>


          <p>
            API downloader, AI, tools,
            search dan utilities
            <br />
            untuk kebutuhan aplikasi kamu.
          </p>


          {/* STATS */}

          <div className="stats">

            <div className="stat">

              <strong>
                {API_CATEGORIES.length}
              </strong>

              <span>
                CATEGORIES
              </span>

            </div>


            <div className="stat">

              <strong>
                {totalEndpoints}
              </strong>

              <span>
                ENDPOINTS
              </span>

            </div>


            <div className="stat">

              <strong>
                JSON
              </strong>

              <span>
                RESPONSE
              </span>

            </div>

          </div>

        </section>


        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="search-section">

          <div className="search-box">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
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


        {/* =================================================
            CATEGORY LIST
        ================================================= */}

        <section className="category-container">

          {filteredCategories.map(
            (category) => {

              const isOpen =
                openCategory ===
                category.name;

              return (
                <article
                  key={category.name}
                  id={`category-${category.name.toLowerCase()}`}
                  className={`category-section ${
                    isOpen
                      ? "opened"
                      : ""
                  }`}
                >

                  {/* CATEGORY HEADER */}

                  <button
                    className="category-header"
                    onClick={() =>
                      setOpenCategory(
                        isOpen
                          ? null
                          : category.name
                      )
                    }
                  >

                    <div className="category-left">

                      <div
                        className={`category-icon ${category.color}`}
                      >
                        {category.icon}
                      </div>


                      <div>

                        <h2>
                          {category.name}
                        </h2>

                        <span>
                          {category.endpoints.length} ENDPOINTS
                        </span>

                      </div>

                    </div>


                    <div className="category-right">

                      <span className="endpoint-count">
                        {String(
                          category.endpoints.length
                        ).padStart(
                          2,
                          "0"
                        )}{" "}
                        EP
                      </span>

                      <span
                        className={`category-chevron ${
                          isOpen
                            ? "rotate"
                            : ""
                        }`}
                      >
                       ⌄
                      </span>

                    </div>

                  </button>


                  {/* API PATH */}

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

                    {category.endpoints.length >
                    0 ? (

                      category.endpoints.map(
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
                      )

                    ) : (

                      <div className="no-endpoint">

                        <span>
                          ◌
                        </span>

                        <div>
                          <strong>
                            Belum ada endpoint
                          </strong>

                          <small>
                            Endpoint untuk kategori ini
                            belum ditambahkan.
                          </small>
                        </div>

                      </div>

                    )}

                  </div>

                </article>
              );
            }
          )}


          {/* EMPTY SEARCH */}

          {filteredCategories.length ===
            0 && (

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


  /* =====================================================
     EXECUTE API
  ===================================================== */

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
        );


      if (
        contentType &&
        contentType.includes(
          "application/json"
        )
      ) {

        const data =
          await res.json();

        setResponse(data);

      } else {

        const text =
          await res.text();

        setResponse({
          status: res.ok,
          response: text,
        });

      }

    } catch (error) {

      setResponse({
        status: false,
        message:
          error.message ||
          "Request gagal",
      });

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="endpoint">

      {/* HEADER */}

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


      {/* BODY */}

      {expanded && (

        <div className="endpoint-body">

          <p className="endpoint-description">
            {endpoint.description}
          </p>


          {/* PARAMETERS */}

          {endpoint.params.length >
            0 && (

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
                          REQUIRED
                        </small>
                      )}

                    </div>


                    <input
                      type="text"
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


          {/* EXECUTE */}

          <button
            className="execute-button"
            onClick={execute}
            disabled={loading}
          >

            {loading
              ? "EXECUTING..."
              : "EXECUTE →"}

          </button>


          {/* RESPONSE */}

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
