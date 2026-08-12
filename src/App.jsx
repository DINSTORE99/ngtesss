import React, { useMemo, useState } from "react";
import "./style.css";

/* =========================================================
   DATA API
========================================================= */

const API_CATEGORIES = [
  {
    name: "AI",
    icon: "✦",
    count: 3,
    path: "/docs/ai",
    color: "mint",

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

  /* =======================================================
     ADMIN
  ======================================================= */

  {
    name: "ADMIN",
    icon: "◇",
    count: 2,
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

  /* =======================================================
     CACHE
  ======================================================= */

  {
    name: "CACHE",
    icon: "▣",
    count: 2,
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

  /* =======================================================
     DOWNLOAD
  ======================================================= */

  {
    name: "DOWNLOAD",
    icon: "⇩",
    count: 5,
    path: "/docs/download",
    color: "purple",

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

  /* =======================================================
     TOOLS
  ======================================================= */

  {
    name: "TOOLS",
    icon: "⌘",
    count: 3,
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

  /* =======================================================
     TOTAL ENDPOINT
  ======================================================= */

  const totalEndpoints = API_CATEGORIES.reduce(
    (total, category) =>
      total + category.endpoints.length,
    0
  );

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
            count: endpoints.length,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [search]);

  /* =======================================================
     SCROLL CATEGORY
  ======================================================= */

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

  /* =======================================================
     HOME
  ======================================================= */

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

      {/* =================================================
          OVERLAY
      ================================================= */}

      <div
        className={`nav-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* =================================================
          SIDE NAVIGATION
      ================================================= */}

      <aside
        className={`side-nav ${
          menuOpen ? "open" : ""
        }`}
      >

        {/* NAV HEADER */}

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
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>

        {/* NAV ITEMS */}

        <div className="nav-items">

          {/* HOME */}

          <button
            className="nav-item home"
            onClick={goHome}
          >
            <span>
              ⌂
            </span>

            <b>
              HOME
            </b>
          </button>

          {/* CATEGORIES */}

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

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="main">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          {/* TERMINAL */}

          <div className="terminal-badge">

            <span />

            TERMINAL ACTIVE

          </div>

          {/* TITLE */}

          <div className="hero-title">

            <h1>
              ZEL API
            </h1>

            <span>
              3.0.0
            </span>

          </div>

          {/* DESCRIPTION */}

          <p className="hero-description">
            A comprehensive and user friendly API
            solution for modern applications.
          </p>

          {/* =================================================
              STATS
          ================================================= */}

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
              onChange={(event) =>
                setSearch(
                  event.target.value
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
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="categories">

          {filteredCategories.map(
            (category) => {

              const isOpen =
                openCategory ===
                category.name;

              return (
                <article
                  className={`category-card ${
                    isOpen
                      ? "opened"
                      : ""
                  }`}
                  id={`category-${category.name.toLowerCase()}`}
                  key={category.name}
                >

                  {/* ======================================
                      CATEGORY HEADER
                  ====================================== */}

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
                        {
                          category.endpoints.length
                        }{" "}
                        ENDPOINTS
                      </span>

                    </div>

                    <span className="open-label">
                      {isOpen
                        ? "CLOSE"
                        : "OPEN"}{" "}
                      →
                    </span>

                  </button>

                  {/* ======================================
                      DOCUMENTATION PATH
                  ====================================== */}

                  <div className="category-path">
                    {category.path}
                  </div>

                  {/* ======================================
                      ENDPOINT LIST
                  ====================================== */}

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
                          endpoint={endpoint}
                          key={endpoint.path}
                        />
                      )
                    )}

                  </div>

                </article>
              );
            }
          )}

          {/* =================================================
              EMPTY SEARCH
          ================================================= */}

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

  /* =======================================================
     UPDATE PARAMETER
  ======================================================= */

  const updateValue = (
    name,
    value
  ) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =======================================================
     EXECUTE API
  ======================================================= */

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
            value !== null &&
            value !== ""
          ) {
            query.append(
              param.name,
              value
            );
          }
        }
      );

      /* =========================================
         BUILD URL
      ========================================= */

      const url =
        `${endpoint.path}` +
        (
          query.toString()
            ? `?${query.toString()}`
            : ""
        );

      /* =========================================
         REQUEST
      ========================================= */

      const res =
        await fetch(url);

      /* =========================================
         CHECK RESPONSE
      ========================================= */

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

        data = {
          status: res.ok,
          statusCode: res.status,
          response: text,
        };
      }

      setResponse(data);

    } catch (error) {

      setResponse({
        status: false,
        message:
          error?.message ||
          "Request gagal",
      });

    } finally {

      setLoading(false);

    }
  };

  /* =======================================================
     ENDPOINT CARD
  ======================================================= */

  return (
    <div className="endpoint">

      {/* ===================================================
          HEADER
      =================================================== */}

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

      {/* ===================================================
          BODY
      =================================================== */}

      {expanded && (
        <div className="endpoint-body">

          {/* DESCRIPTION */}

          <p className="endpoint-description">
            {endpoint.description}
          </p>

          {/* =================================================
              PARAMETERS
          ================================================= */}

          {endpoint.params.length > 0 && (
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
                      type="text"
                      value={
                        values[
                          param.name
                        ] || ""
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
                )
              )}

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
              ? "EXECUTING..."
              : "EXECUTE →"}
          </button>

          {/* =================================================
              RESPONSE
          ================================================= */}

          {response !== null && (
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
