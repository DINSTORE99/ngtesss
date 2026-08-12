import React, { useEffect, useMemo, useState } from "react";
import "./style.css";

const API_BASE = "https://api.azbry.com";

const categories = [
  {
    id: "ai",
    name: "AI",
    icon: "✦",
    color: "purple",
    endpoints: [
      {
        name: "Aiko AI",
        path: "/api/ai/aiko",
        method: "GET",
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
        name: "AI4Chat",
        path: "/api/ai/ai4chat",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Halo",
            required: true,
          },
        ],
      },
      {
        name: "AI Lyrics Generator",
        path: "/api/ai/lyricsgen",
        method: "GET",
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
            placeholder: "bahagia",
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
    ],
  },

  {
    id: "admin",
    name: "ADMIN",
    icon: "◇",
    color: "red",
    endpoints: [
      {
        name: "API Status",
        path: "/api/health",
        method: "GET",
        params: [],
      },
      {
        name: "Server Information",
        path: "/api/info",
        method: "GET",
        params: [],
      },
    ],
  },

  {
    id: "cache",
    name: "CACHE",
    icon: "▣",
    color: "cyan",
    endpoints: [
      {
        name: "Cache",
        path: "/api/cache",
        method: "GET",
        params: [],
      },
      {
        name: "Clear Cache",
        path: "/api/cache/clear",
        method: "GET",
        params: [],
      },
    ],
  },

  {
    id: "download",
    name: "DOWNLOAD",
    icon: "⇩",
    color: "blue",
    endpoints: [
      {
        name: "TikTok Downloader",
        path: "/api/tiktok",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.tiktok.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Instagram Downloader",
        path: "/api/instagram",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.instagram.com/...",
            required: true,
          },
        ],
      },
      {
        name: "CapCut Downloader",
        path: "/api/d/capcut",
        method: "GET",
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
        name: "Apple Music Downloader",
        path: "/api/download/applemusic",
        method: "GET",
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
        path: "/api/downloader/douyin",
        method: "GET",
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
        name: "Facebook Downloader",
        path: "/api/download/facebook",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "Facebook URL",
            required: true,
          },
        ],
      },
      {
        name: "MediaFire Downloader",
        path: "/api/download/mediafire",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "MediaFire URL",
            required: true,
          },
        ],
      },
    ],
  },

  {
    id: "fun",
    name: "FUN",
    icon: "●",
    color: "pink",
    endpoints: [],
  },

  {
    id: "leaderboard",
    name: "LEADERBOARD",
    icon: "♛",
    color: "yellow",
    endpoints: [],
  },

  {
    id: "library",
    name: "LIBRARY",
    icon: "▤",
    color: "orange",
    endpoints: [],
  },

  {
    id: "maker",
    name: "MAKER",
    icon: "●",
    color: "pink",
    endpoints: [],
  },

  {
    id: "news",
    name: "NEWS",
    icon: "▤",
    color: "cyan",
    endpoints: [],
  },

  {
    id: "random",
    name: "RANDOM",
    icon: "✣",
    color: "purple",
    endpoints: [],
  },

  {
    id: "search",
    name: "SEARCH",
    icon: "⌕",
    color: "green",
    endpoints: [],
  },

  {
    id: "stalk",
    name: "STALK",
    icon: "◉",
    color: "violet",
    endpoints: [],
  },

  {
    id: "tools",
    name: "TOOLS",
    icon: "⌕",
    color: "orange",
    endpoints: [
      {
        name: "Domain Information",
        path: "/api/tools/domaininfo",
        method: "GET",
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
        name: "AI Coder",
        path: "/api/tools/aicoder",
        method: "GET",
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
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [testerOpen, setTesterOpen] = useState(false);

  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  const totalEndpoints = categories.reduce(
    (total, category) => total + category.endpoints.length,
    0
  );

  const filteredCategories = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return categories;

    return categories
      .map((category) => ({
        ...category,
        endpoints: category.endpoints.filter(
          (endpoint) =>
            category.name.toLowerCase().includes(value) ||
            endpoint.name.toLowerCase().includes(value) ||
            endpoint.path.toLowerCase().includes(value)
        ),
      }))
      .filter(
        (category) =>
          category.name.toLowerCase().includes(value) ||
          category.endpoints.length > 0
      );
  }, [search]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToCategory = (id) => {
    setMenuOpen(false);

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const openTester = (category, endpoint) => {
    setSelectedEndpoint({ category, endpoint });

    const initial = {};

    endpoint.params.forEach((param) => {
      initial[param.name] = "";
    });

    setParams(initial);
    setResponse(null);
    setResponseTime(null);
    setTesterOpen(true);
  };

  const buildUrl = () => {
    if (!selectedEndpoint) return "";

    const { endpoint } = selectedEndpoint;

    const query = new URLSearchParams();

    endpoint.params.forEach((param) => {
      const value = params[param.name];

      if (value !== undefined && value !== "") {
        query.append(param.name, value);
      }
    });

    const queryString = query.toString();

    return `${API_BASE}${endpoint.path}${
      queryString ? `?${queryString}` : ""
    }`;
  };

  const executeRequest = async () => {
    if (!selectedEndpoint) return;

    const requiredMissing = selectedEndpoint.endpoint.params.find(
      (param) => param.required && !params[param.name]
    );

    if (requiredMissing) {
      setResponse({
        error: `Parameter "${requiredMissing.name}" wajib diisi.`,
      });
      return;
    }

    const url = buildUrl();
    const started = performance.now();

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(url);
      const elapsed = Math.round(performance.now() - started);

      setResponseTime(elapsed);

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await res.json();

        setResponse({
          statusCode: res.status,
          data,
        });
      } else {
        const text = await res.text();

        setResponse({
          statusCode: res.status,
          data: text,
        });
      }
    } catch (error) {
      setResponse({
        statusCode: "ERROR",
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async () => {
    const url = buildUrl();

    if (!url) return;

    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="app">
      <div className="particles">
        {Array.from({ length: 45 }).map((_, index) => (
          <span
            key={index}
            className="particle"
            style={{
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--delay": `${Math.random() * 8}s`,
              "--duration": `${5 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="grid-background" />

      {/* HEADER */}
<header className="header">
  <div className="header-inner">

    <button
      className="menu-button"
      onClick={() => setMenuOpen(true)}
      aria-label="Open navigation"
    >
      <span />
      <span />
      <span />
    </button>

  </div>
</header>

      <main>
        <section className="hero">
          <div className="status">
            <span className="status-dot" />
            API SYSTEM ONLINE
          </div>

          <h1>
            DINSTORE <em>API</em>
          </h1>

          <p>
            API downloader, AI, tools, search dan utilities
            <br />
            untuk kebutuhan aplikasi kamu.
          </p>

          <div className="stats">
            <div className="stat-card">
              <strong>{categories.length}</strong>
              <span>CATEGORIES</span>
            </div>

            <div className="stat-card">
              <strong>{totalEndpoints}</strong>
              <span>ENDPOINTS</span>
            </div>

            <div className="stat-card">
              <strong>JSON</strong>
              <span>RESPONSE</span>
            </div>
          </div>

          <div className="search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search endpoint atau category..."
            />

            {search && (
              <button onClick={() => setSearch("")}>×</button>
            )}
          </div>
        </section>

        {/* CATEGORIES */}

        <section className="categories">
          {filteredCategories.map((category) => {
            const isOpen = openCategory === category.id;

            return (
              <article
                className={`category-card ${
                  isOpen ? "category-open" : ""
                }`}
                id={category.id}
                key={category.id}
              >
                <button
                  className="category-header"
                  onClick={() =>
                    setOpenCategory(isOpen ? null : category.id)
                  }
                >
                  <div className={`category-icon ${category.color}`}>
                    {category.icon}
                  </div>

                  <div className="category-info">
                    <h2>{category.name}</h2>

                    <span>
                      {category.endpoints.length} ENDPOINT
                      {category.endpoints.length !== 1 ? "S" : ""}
                    </span>
                  </div>

                  <span className={`arrow ${isOpen ? "rotate" : ""}`}>
                   ⌄
                  </span>
                </button>

                {isOpen && (
                  <div className="endpoint-list">
                    {category.endpoints.length === 0 ? (
                      <div className="empty-category">
                        <span>✦</span>
                        Endpoint akan segera tersedia.
                      </div>
                    ) : (
                      category.endpoints.map((endpoint) => (
                        <button
                          className="endpoint-item"
                          key={endpoint.path}
                          onClick={() =>
                            openTester(category, endpoint)
                          }
                        >
                          <span className="method">
                            {endpoint.method}
                          </span>

                          <div className="endpoint-info">
                            <strong>{endpoint.name}</strong>
                            <code>{endpoint.path}</code>
                          </div>

                          <span className="endpoint-arrow">
                            →
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </main>

      {/* NAVIGATION DRAWER */}

      <div
        className={`drawer-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div>
            <span>DINSTORE</span>
            <strong>NAVIGATION</strong>
          </div>

          <button
            className="close-button"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="drawer-home">
          <button
            onClick={() => {
              setMenuOpen(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <span>⌂</span>
            <div>
              <strong>HOME</strong>
              <small>Documentation overview</small>
            </div>
          </button>
        </div>

        <div className="drawer-label">CATEGORIES</div>

        <nav className="drawer-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
            >
              <span className={`drawer-icon ${category.color}`}>
                {category.icon}
              </span>

              <span>{category.name}</span>

              <small>{category.endpoints.length}</small>
            </button>
          ))}
        </nav>
      </aside>

      {/* API TESTER */}

      {testerOpen && selectedEndpoint && (
        <div className="tester-overlay">
          <div className="tester">
            <div className="tester-header">
              <div>
                <span className="tester-category">
                  {selectedEndpoint.category.name}
                </span>

                <h2>{selectedEndpoint.endpoint.name}</h2>
              </div>

              <button
                className="tester-close"
                onClick={() => setTesterOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="endpoint-url">
              <span className="get-badge">
                {selectedEndpoint.endpoint.method}
              </span>

              <code>{selectedEndpoint.endpoint.path}</code>
            </div>

            {selectedEndpoint.endpoint.params.length > 0 && (
              <div className="request-section">
                <h3>REQUEST PARAMETERS</h3>

                {selectedEndpoint.endpoint.params.map((param) => (
                  <div className="param" key={param.name}>
                    <div className="param-label">
                      <label>{param.label}</label>

                      {param.required && (
                        <span>REQ</span>
                      )}
                    </div>

                    <input
                      value={params[param.name] || ""}
                      onChange={(e) =>
                        setParams((prev) => ({
                          ...prev,
                          [param.name]: e.target.value,
                        }))
                      }
                      placeholder={param.placeholder}
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              className="execute-button"
              onClick={executeRequest}
              disabled={loading}
            >
              {loading ? "EXECUTING..." : "EXECUTE REQUEST"}
            </button>

            <div className="generated-url">
              <code>{buildUrl()}</code>

              <button onClick={copyUrl}>▣</button>
            </div>

            {response && (
              <div className="response">
                <div className="response-header">
                  <div
                    className={
                      response.statusCode === 200
                        ? "success"
                        : "error"
                    }
                  >
                    {response.statusCode || "ERROR"}
                  </div>

                  {responseTime && (
                    <span>{responseTime}ms</span>
                  )}
                </div>

                <pre>
                  {JSON.stringify(
                    response.data ?? response.error,
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
