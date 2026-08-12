import React, { useMemo, useState } from "react";
import "./style.css";

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
        description: "Chat dengan Aiko AI.",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tes Aiko...",
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
        path: "/api/ai/lyricsgen",
        method: "GET",
        description: "Generate lirik lagu berdasarkan tema, genre dan emosi.",
        params: [
          {
            name: "theme",
            label: "Theme",
            placeholder: "Cinta, persahabatan, perpisahan...",
            required: true,
          },
          {
            name: "genre",
            label: "Genre",
            placeholder: "Pop, Rock, Hip Hop...",
            required: false,
          },
          {
            name: "emotion",
            label: "Emotion",
            placeholder: "Sedih, bahagia, galau...",
            required: false,
          },
          {
            name: "lang",
            label: "Lang",
            placeholder: "Indonesia",
            required: false,
          },
        ],
      },
      {
        name: "AI4Chat",
        path: "/api/ai/ai4chat",
        method: "GET",
        description: "AI chat menggunakan endpoint AI4Chat.",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tanyakan sesuatu...",
            required: true,
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
    endpoints: [],
  },

  {
    id: "cache",
    name: "CACHE",
    icon: "▣",
    color: "cyan",
    endpoints: [],
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
        description: "Download video TikTok.",
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
        description: "Download media dari Instagram.",
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
        name: "Apple Music Downloader",
        path: "/api/download/applemusic",
        method: "GET",
        description: "Apple Music downloader.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://music.apple.com/...",
            required: true,
          },
        ],
      },
      {
        name: "CapCut Downloader",
        path: "/api/download/capcut",
        method: "GET",
        description: "Retrieve comprehensive metadata for a CapCut video.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.capcut.com/tv2/...",
            required: true,
          },
        ],
      },
      {
        name: "Douyin Downloader",
        path: "/api/downloader/douyin",
        method: "GET",
        description: "Download video dari Douyin.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.douyin.com/...",
            required: true,
          },
        ],
      },
      {
        name: "DramaBox Downloader",
        path: "/api/download/dramabox",
        method: "GET",
        description: "DramaBox downloader.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "Masukkan URL DramaBox...",
            required: true,
          },
        ],
      },
      {
        name: "Facebook Downloader",
        path: "/api/download/facebook",
        method: "GET",
        description: "Download video Facebook.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.facebook.com/...",
            required: true,
          },
        ],
      },
      {
        name: "MediaFire Downloader",
        path: "/api/download/mediafire",
        method: "GET",
        description: "Download file dari MediaFire.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.mediafire.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Pinterest Downloader",
        path: "/api/download/pinterest",
        method: "GET",
        description: "Download media Pinterest.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://pin.it/...",
            required: true,
          },
        ],
      },
      {
        name: "Spotify Downloader",
        path: "/api/download/spotify",
        method: "GET",
        description: "Spotify downloader.",
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
        path: "/api/download/soundcloud",
        method: "GET",
        description: "Download audio dari SoundCloud.",
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
        name: "TikTok Slide Downloader",
        path: "/api/download/tiktokslide",
        method: "GET",
        description: "TikTok slide downloader.",
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
        name: "X Downloader",
        path: "/api/download/x",
        method: "GET",
        description: "Download media dari X.",
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
        name: "YouTube MP3",
        path: "/api/download/ytmp3",
        method: "GET",
        description: "Convert YouTube video menjadi MP3.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.youtube.com/watch?v=...",
            required: true,
          },
        ],
      },
      {
        name: "YouTube Play",
        path: "/api/download/ytplay",
        method: "GET",
        description: "YouTube downloader.",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "https://www.youtube.com/watch?v=...",
            required: true,
          },
        ],
      },
    ],
  },

  {
    id: "fun",
    name: "FUN",
    icon: "✿",
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
    icon: "✿",
    color: "pink",
    endpoints: [],
  },

  {
    id: "news",
    name: "NEWS",
    icon: "▥",
    color: "cyan",
    endpoints: [],
  },

  {
    id: "random",
    name: "RANDOM",
    icon: "◆",
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
    color: "purple",
    endpoints: [],
  },

  {
    id: "tools",
    name: "TOOLS",
    icon: "⚒",
    color: "orange",
    endpoints: [
      {
        name: "AI Coder",
        path: "/api/tools/aicoder",
        method: "GET",
        description: "Generate code dari prompt.",
        params: [
          {
            name: "prompt",
            label: "Prompt",
            placeholder: "Buat landing page portfolio modern...",
            required: true,
          },
        ],
      },
      {
        name: "Domain Info",
        path: "/api/tools/domaininfo",
        method: "GET",
        description: "Mengecek informasi domain menggunakan RDAP.",
        params: [
          {
            name: "domain",
            label: "Domain",
            placeholder: "dinn.my.id",
            required: true,
          },
        ],
      },
    ],
  },
];

function ParticleBackground() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 35 }).map((_, index) => (
        <span
          key={index}
          className={`particle p-${index + 1}`}
        />
      ))}
    </div>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [search, setSearch] = useState("");
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [elapsed, setElapsed] = useState(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const totalEndpoints = categories.reduce(
    (total, category) => total + category.endpoints.length,
    0
  );

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return categories;

    return categories
      .map((category) => ({
        ...category,
        endpoints: category.endpoints.filter(
          (endpoint) =>
            category.name.toLowerCase().includes(keyword) ||
            endpoint.name.toLowerCase().includes(keyword) ||
            endpoint.path.toLowerCase().includes(keyword)
        ),
      }))
      .filter(
        (category) =>
          category.name.toLowerCase().includes(keyword) ||
          category.endpoints.length > 0
      );
  }, [search]);

  const openCategory = (category) => {
    setSelectedCategory(category);
    setSelectedEndpoint(null);
    setResponse(null);
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEndpoint = (category, endpoint) => {
    setSelectedCategory(category);
    setSelectedEndpoint(endpoint);
    setResponse(null);
    setStatusCode(null);
    setElapsed(null);
    setValues({});
    setActiveTab("preview");

    setTimeout(() => {
      document
        .getElementById("endpoint-tester")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 80);
  };

  const goHome = () => {
    setSelectedCategory(null);
    setSelectedEndpoint(null);
    setResponse(null);
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateValue = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildUrl = () => {
    if (!selectedEndpoint) return "";

    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "";

    const query = new URLSearchParams();

    selectedEndpoint.params?.forEach((param) => {
      const value = values[param.name];

      if (value !== undefined && value !== "") {
        query.set(param.name, value);
      }
    });

    const queryString = query.toString();

    return `${base}${selectedEndpoint.path}${
      queryString ? `?${queryString}` : ""
    }`;
  };

  const executeRequest = async () => {
    if (!selectedEndpoint) return;

    for (const param of selectedEndpoint.params || []) {
      if (param.required && !values[param.name]?.trim()) {
        setResponse({
          error: `Parameter "${param.name}" wajib diisi.`,
        });
        setStatusCode(400);
        setElapsed(0);
        setActiveTab("preview");
        return;
      }
    }

    const url = buildUrl();
    const started = performance.now();

    setLoading(true);
    setResponse(null);
    setStatusCode(null);

    try {
      const result = await fetch(url, {
        method: selectedEndpoint.method || "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const time = Math.round(performance.now() - started);
      setElapsed(time);
      setStatusCode(result.status);

      const contentType = result.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await result.json();
      } else {
        const text = await result.text();

        try {
          data = JSON.parse(text);
        } catch {
          data = {
            response: text,
          };
        }
      }

      setResponse(data);
      setActiveTab("preview");
    } catch (error) {
      const time = Math.round(performance.now() - started);

      setElapsed(time);
      setStatusCode(500);
      setResponse({
        status: false,
        creator: "DINSTORE",
        message: "Request gagal.",
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearTester = () => {
    setValues({});
    setResponse(null);
    setStatusCode(null);
    setElapsed(null);
  };

  const copyUrl = async () => {
    const url = buildUrl();

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      //
    }
  };

  const curlCommand = selectedEndpoint
    ? `curl -X ${selectedEndpoint.method || "GET"} "${buildUrl()}"`
    : "";

  return (
    <div className="app">
      <ParticleBackground />

      <header className="topbar">
        <button className="menu-button" type="button">
          <span />
          <span />
          <span />
        </button>

        <div
          className="brand"
          onClick={goHome}
          role="button"
          tabIndex={0}
        >
          <div className="brand-logo">D</div>

          <div>
            <strong>DINSTORE API</strong>
            <small>Developer Documentation</small>
          </div>
        </div>

        <div className="top-actions">
          <button className="icon-button" type="button">
            ☼
          </button>

          <button className="icon-button" type="button">
            ☰
          </button>
        </div>
      </header>

      <nav className="navigation">
        <button onClick={goHome}>HOME</button>

        {categories.slice(0, 5).map((category) => (
          <button
            key={category.id}
            onClick={() => openCategory(category)}
          >
            {category.name}
          </button>
        ))}

        <button
          onClick={() =>
            document
              .getElementById("categories")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          ALL
        </button>
      </nav>

      <main className="container">
        {!selectedCategory && (
          <>
            <section className="hero">
              <div className="status-pill">
                <span className="status-dot" />
                TERMINAL ACTIVE
              </div>

              <div className="hero-title-row">
                <h1>DINSTORE API</h1>
                <span>1.0.0</span>
              </div>

              <p>
                A comprehensive and user friendly API solution
                for modern applications.
              </p>
            </section>

            <section className="stats">
              <div className="stat">
                <small>CATEGORIES</small>
                <strong>{categories.length}</strong>
              </div>

              <div className="stat">
                <small>ENDPOINTS</small>
                <strong>{totalEndpoints}</strong>
              </div>
            </section>

            <div className="search-box">
              <span>⌕</span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Filter by category or endpoint..."
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  type="button"
                >
                  ×
                </button>
              )}
            </div>

            <section id="categories" className="category-grid">
              {filteredCategories.map((category) => (
                <article
                  className={`category-card ${category.color}`}
                  key={category.id}
                  onClick={() => openCategory(category)}
                >
                  <div className="category-icon">
                    {category.icon}
                  </div>

                  <div className="category-content">
                    <h2>{category.name}</h2>

                    <span>
                      {category.endpoints.length} ENDPOINT
                      {category.endpoints.length !== 1
                        ? "S"
                        : ""}
                    </span>

                    <code>/docs/{category.id}</code>
                  </div>

                  <div className="category-open">
                    OPEN <span>→</span>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

        {selectedCategory && (
          <section className="documentation">
            <button
              className="back-button"
              onClick={goHome}
              type="button"
            >
              ← BACK TO DOCUMENTATION
            </button>

            <div className="doc-heading">
              <div
                className={`large-category-icon ${selectedCategory.color}`}
              >
                {selectedCategory.icon}
              </div>

              <div>
                <div className="eyebrow">
                  CATEGORY
                </div>

                <h1>{selectedCategory.name}</h1>

                <p>
                  {selectedCategory.endpoints.length}{" "}
                  endpoints available.
                </p>
              </div>
            </div>

            {selectedCategory.endpoints.length === 0 ? (
              <div className="empty-card">
                <div>◌</div>
                <h2>No endpoints available</h2>
                <p>
                  Endpoint untuk kategori ini belum
                  dimasukkan ke konfigurasi frontend.
                </p>
              </div>
            ) : (
              <div className="endpoint-list">
                {selectedCategory.endpoints
                  .filter((endpoint) => {
                    if (!search) return true;

                    return (
                      endpoint.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      endpoint.path
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    );
                  })
                  .map((endpoint) => {
                    const isOpen =
                      selectedEndpoint?.path === endpoint.path;

                    return (
                      <article
                        className={`endpoint-card ${
                          isOpen ? "open" : ""
                        }`}
                        key={endpoint.path}
                      >
                        <button
                          className="endpoint-head"
                          onClick={() =>
                            openEndpoint(
                              selectedCategory,
                              endpoint
                            )
                          }
                          type="button"
                        >
                          <span className="method">
                            {endpoint.method}
                          </span>

                          <div className="endpoint-info">
                            <strong>{endpoint.name}</strong>
                            <code>{endpoint.path}</code>
                          </div>

                          <span className="endpoint-arrow">
                            {isOpen ? "⌃" : "→"}
                          </span>
                        </button>

                        {isOpen && (
                          <div
                            id="endpoint-tester"
                            className="tester"
                          >
                            <p className="description">
                              {endpoint.description}
                            </p>

                            <div className="request-line">
                              <span className="method large">
                                {endpoint.method}
                              </span>

                              <code>
                                {endpoint.path}
                              </code>
                            </div>

                            {endpoint.params?.length > 0 && (
                              <div className="parameters">
                                <div className="section-label">
                                  REQUEST PARAMETERS
                                </div>

                                {endpoint.params.map(
                                  (param) => (
                                    <div
                                      className="parameter"
                                      key={param.name}
                                    >
                                      <div className="parameter-label">
                                        <span>
                                          {param.label ||
                                            param.name}
                                        </span>

                                        {param.required && (
                                          <b>REQ</b>
                                        )}
                                      </div>

                                      <input
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
                                    </div>
                                  )
                                )}
                              </div>
                            )}

                            <div className="tester-actions">
                              <button
                                className="execute"
                                onClick={executeRequest}
                                disabled={loading}
                                type="button"
                              >
                                {loading
                                  ? "EXECUTING..."
                                  : "EXECUTE REQUEST"}
                              </button>

                              <button
                                className="clear"
                                onClick={clearTester}
                                type="button"
                              >
                                CLEAR
                              </button>
                            </div>

                            {selectedEndpoint && (
                              <div className="generated-url">
                                <div>
                                  <span>↗</span>
                                  <code>{buildUrl()}</code>
                                </div>

                                <button
                                  onClick={copyUrl}
                                  type="button"
                                >
                                  {copied ? "✓" : "▣"}
                                </button>
                              </div>
                            )}

                            {response !== null && (
                              <div className="response-panel">
                                <div className="response-head">
                                  <div className="tabs">
                                    <button
                                      className={
                                        activeTab === "preview"
                                          ? "active"
                                          : ""
                                      }
                                      onClick={() =>
                                        setActiveTab(
                                          "preview"
                                        )
                                      }
                                      type="button"
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
                                      type="button"
                                    >
                                      HEADERS
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
                                      type="button"
                                    >
                                      CURL
                                    </button>
                                  </div>

                                  <div className="response-meta">
                                    <span
                                      className={
                                        statusCode >= 200 &&
                                        statusCode < 300
                                          ? "success"
                                          : "error"
                                      }
                                    >
                                      {statusCode || 500}
                                    </span>

                                    <small>
                                      {elapsed ?? 0}ms
                                    </small>
                                  </div>
                                </div>

                                <div className="response-body">
                                  {activeTab ===
                                    "preview" && (
                                    <pre>
                                      {JSON.stringify(
                                        response,
                                        null,
                                        2
                                      )}
                                    </pre>
                                  )}

                                  {activeTab ===
                                    "headers" && (
                                    <pre>
{`Content-Type: application/json
Accept: application/json
X-Powered-By: DINSTORE API`}
                                    </pre>
                                  )}

                                  {activeTab === "curl" && (
                                    <pre>
                                      {curlCommand}
                                    </pre>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
              </div>
            )}
          </section>
        )}
      </main>

      <footer>
        <span>DINSTORE API</span>
        <span>Developer Playground</span>
      </footer>
    </div>
  );
}

export default App;
