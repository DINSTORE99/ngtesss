import { useEffect, useMemo, useState } from "react";
import "./style.css";

const API_BASE = "";

const categories = [
  {
    id: "ai",
    name: "AI",
    icon: "✦",
    color: "purple",
    endpoints: [
      { name: "Aiko AI", path: "/api/aiko", method: "GET", params: ["q"] },
      { name: "LyricsGen", path: "/api/lyricsgen", method: "GET", params: ["q"] },
      { name: "AI4Chat", path: "/api/ai4chat", method: "GET", params: ["q"] },
      { name: "Azbry AI", path: "/api/azbryai", method: "GET", params: ["q"] },
      { name: "ChatDay", path: "/api/chatday", method: "GET", params: ["q"] },
      { name: "ChatMusic", path: "/api/chatmusic", method: "GET", params: ["q"] },
      { name: "Claude", path: "/api/claude", method: "GET", params: ["q"] },
      { name: "DeepSeek", path: "/api/deepseek", method: "GET", params: ["q"] },
      { name: "Oriper", path: "/api/oriper", method: "GET", params: ["q"] },
      { name: "Generate Prompt", path: "/api/generateprompt", method: "GET", params: ["q"] },
      { name: "Pollinations", path: "/api/pollinations", method: "GET", params: ["q"] },
      { name: "GPT-4o", path: "/api/gpt4o", method: "GET", params: ["q"] },
      { name: "GPT Free", path: "/api/gptfree", method: "GET", params: ["q"] },
      { name: "IAsk", path: "/api/iask", method: "GET", params: ["q"] },
      { name: "ImageGen", path: "/api/imagegen", method: "GET", params: ["q"] },
      { name: "Ustadz AI", path: "/api/ustadz", method: "GET", params: ["q"] },
      { name: "Qwen", path: "/api/qwen", method: "GET", params: ["q"] },
      { name: "Text2Img", path: "/api/text2img", method: "GET", params: ["q"] },
    ],
  },

  {
    id: "admin",
    name: "ADMIN",
    icon: "◈",
    color: "red",
    endpoints: [
      { name: "API Health", path: "/api/health", method: "GET", params: [] },
      { name: "API Info", path: "/api/info", method: "GET", params: [] },
    ],
  },

  {
    id: "cache",
    name: "CACHE",
    icon: "▣",
    color: "green",
    endpoints: [
      { name: "Cache", path: "/api/cache", method: "GET", params: ["q"] },
      { name: "Cache Clear", path: "/api/cache/clear", method: "GET", params: [] },
    ],
  },

  {
    id: "download",
    name: "DOWNLOAD",
    icon: "↓",
    color: "blue",
    endpoints: [
      { name: "TikTok", path: "/api/tiktok", method: "GET", params: ["url"] },
      { name: "Instagram", path: "/api/instagram", method: "GET", params: ["url"] },
      { name: "Apple Music", path: "/api/applemusic", method: "GET", params: ["url"] },
      { name: "CapCut", path: "/api/capcut", method: "GET", params: ["url"] },
      { name: "Douyin", path: "/api/douyin", method: "GET", params: ["url"] },
      { name: "DramaBox", path: "/api/dramabox", method: "GET", params: ["url"] },
      { name: "Facebook", path: "/api/facebook", method: "GET", params: ["url"] },
      { name: "MediaFire", path: "/api/mediafire", method: "GET", params: ["url"] },
      { name: "Pinterest", path: "/api/pinterest", method: "GET", params: ["url"] },
      { name: "Spotify", path: "/api/spotify", method: "GET", params: ["url"] },
      { name: "SoundCloud", path: "/api/soundcloud", method: "GET", params: ["url"] },
      { name: "TikTok Slide", path: "/api/tiktokslide", method: "GET", params: ["url"] },
      { name: "X / Twitter", path: "/api/x", method: "GET", params: ["url"] },
      { name: "YouTube MP3", path: "/api/ytmp3", method: "GET", params: ["url"] },
      { name: "YouTube Play", path: "/api/ytplay", method: "GET", params: ["url"] },
    ],
  },

  {
    id: "fun",
    name: "FUN",
    icon: "◆",
    color: "pink",
    endpoints: [
      { name: "Fun Random", path: "/api/fun", method: "GET", params: ["q"] },
      { name: "Meme", path: "/api/meme", method: "GET", params: [] },
    ],
  },

  {
    id: "leaderboard",
    name: "LEADERBOARD",
    icon: "♛",
    color: "yellow",
    endpoints: [
      { name: "Leaderboard", path: "/api/leaderboard", method: "GET", params: [] },
    ],
  },

  {
    id: "library",
    name: "LIBRARY",
    icon: "▤",
    color: "orange",
    endpoints: [
      { name: "Library", path: "/api/library", method: "GET", params: ["q"] },
      { name: "Books", path: "/api/books", method: "GET", params: ["q"] },
    ],
  },

  {
    id: "maker",
    name: "MAKER",
    icon: "●",
    color: "pink",
    endpoints: [
      { name: "QR Maker", path: "/api/qr", method: "GET", params: ["text"] },
      { name: "Logo Maker", path: "/api/logo", method: "GET", params: ["text"] },
    ],
  },

  {
    id: "news",
    name: "NEWS",
    icon: "▥",
    color: "cyan",
    endpoints: [
      { name: "News Search", path: "/api/news", method: "GET", params: ["q"] },
      { name: "Latest News", path: "/api/news/latest", method: "GET", params: [] },
      { name: "News Search 2", path: "/api/news/search", method: "GET", params: ["q"] },
    ],
  },

  {
    id: "random",
    name: "RANDOM",
    icon: "◈",
    color: "violet",
    endpoints: [
      { name: "Random", path: "/api/random", method: "GET", params: [] },
      { name: "Random Number", path: "/api/random/number", method: "GET", params: [] },
      { name: "Random Image", path: "/api/random/image", method: "GET", params: [] },
    ],
  },

  {
    id: "search",
    name: "SEARCH",
    icon: "⌕",
    color: "teal",
    endpoints: [
      { name: "Search", path: "/api/search", method: "GET", params: ["q"] },
      { name: "Google Search", path: "/api/google", method: "GET", params: ["q"] },
      { name: "YouTube Search", path: "/api/youtube", method: "GET", params: ["q"] },
    ],
  },

  {
    id: "stalk",
    name: "STALK",
    icon: "◎",
    color: "purple",
    endpoints: [
      { name: "WhatsApp Stalk", path: "/api/stalk", method: "GET", params: ["q"] },
      { name: "TikTok Stalk", path: "/api/tiktokstalk", method: "GET", params: ["q"] },
      { name: "Instagram Stalk", path: "/api/igstalk", method: "GET", params: ["q"] },
    ],
  },

  {
    id: "tools",
    name: "TOOLS",
    icon: "⌁",
    color: "orange",
    endpoints: [
      { name: "AI Coder", path: "/api/aicoder", method: "GET", params: ["q"] },
      { name: "URL Shortener", path: "/api/shorturl", method: "GET", params: ["url"] },
      { name: "Translate", path: "/api/translate", method: "GET", params: ["q"] },
    ],
  },
];

function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("din-theme") !== "light"
  );

  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState("download");
  const [activeEndpoint, setActiveEndpoint] = useState(null);

  const [values, setValues] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [elapsed, setElapsed] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.className = dark ? "theme-dark" : "theme-light";
    localStorage.setItem("din-theme", dark ? "dark" : "light");
  }, [dark]);

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return categories;

    return categories
      .map((category) => {
        const categoryMatch = category.name
          .toLowerCase()
          .includes(keyword);

        const endpoints = category.endpoints.filter((endpoint) =>
          `${endpoint.name} ${endpoint.path}`
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

  const totalEndpoints = categories.reduce(
    (sum, category) => sum + category.endpoints.length,
    0
  );

  function scrollToCategory(id) {
    setOpenCategory(id);

    setTimeout(() => {
      document
        .getElementById(`category-${id}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  function openTester(endpoint, category) {
    setActiveEndpoint({
      ...endpoint,
      category: category.name,
    });

    const initial = {};

    endpoint.params.forEach((param) => {
      initial[param] = "";
    });

    setValues(initial);
    setResponse(null);
    setStatusCode(null);
    setElapsed(null);
    setError("");

    setTimeout(() => {
      document
        .getElementById("tester")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }

  async function executeRequest() {
    if (!activeEndpoint) return;

    setLoading(true);
    setResponse(null);
    setError("");
    setStatusCode(null);

    const started = performance.now();

    try {
      const query = new URLSearchParams();

      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          query.set(key, value);
        }
      });

      const endpointUrl =
        `${API_BASE}${activeEndpoint.path}` +
        (query.toString() ? `?${query.toString()}` : "");

      const res = await fetch(endpointUrl, {
        method: activeEndpoint.method || "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const elapsedTime = Math.round(performance.now() - started);

      setStatusCode(res.status);
      setElapsed(elapsedTime);

      const text = await res.text();

      try {
        setResponse(JSON.parse(text));
      } catch {
        setResponse({
          response: text,
        });
      }

      if (!res.ok) {
        setError(`HTTP ${res.status}`);
      }
    } catch (err) {
      setElapsed(Math.round(performance.now() - started));
      setError(err.message || "Gagal menghubungi API");
      setResponse({
        status: false,
        message: err.message || "Request gagal",
      });
    } finally {
      setLoading(false);
    }
  }

  function clearTester() {
    if (!activeEndpoint) return;

    const initial = {};

    activeEndpoint.params.forEach((param) => {
      initial[param] = "";
    });

    setValues(initial);
    setResponse(null);
    setStatusCode(null);
    setElapsed(null);
    setError("");
  }

  function copyResponse() {
    if (!response) return;

    navigator.clipboard.writeText(
      JSON.stringify(response, null, 2)
    );
  }

  return (
    <div className="app">

      {/* PARTICLES */}
      <div className="particles">
        {Array.from({ length: 35 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* NAVBAR */}
      <header className="navbar">

        <div className="brand">
          <div className="brand-icon">D</div>

          <div>
            <div className="brand-title">DINSTORE API</div>
            <div className="brand-subtitle">
              Developer Playground
            </div>
          </div>
        </div>

        <div className="nav-actions">

          <button
            className="theme-button"
            onClick={() => setDark(!dark)}
            title="Ganti tema"
          >
            {dark ? "☀" : "☾"}
          </button>

          <button className="menu-button">
            ☰
          </button>

        </div>
      </header>

      {/* NAV CATEGORY */}
      <nav className="category-nav">

        <button
          className="nav-home"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          HOME
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={
              openCategory === category.id
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => scrollToCategory(category.id)}
          >
            {category.name}
          </button>
        ))}

        <button
          className="nav-tester"
          onClick={() =>
            document
              .getElementById("tester")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          TESTER
        </button>

      </nav>

      {/* HERO */}
      <main>

        <section className="hero">

          <div className="hero-badge">
            <span className="status-dot" />
            API SYSTEM ONLINE
          </div>

          <h1>
            DINSTORE
            <span> API</span>
          </h1>

          <p>
            API downloader, AI, tools, search and utilities
            untuk kebutuhan aplikasi kamu.
          </p>

          <div className="hero-stats">

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
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

        </section>

        {/* CATEGORIES */}
        <section className="categories">

          {filteredCategories.map((category) => {

            const isOpen =
              openCategory === category.id;

            return (
              <div
                className={`category-card ${category.color}`}
                id={`category-${category.id}`}
                key={category.id}
              >

                <button
                  className="category-header"
                  onClick={() =>
                    setOpenCategory(
                      isOpen ? null : category.id
                    )
                  }
                >

                  <div className="category-left">

                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <div>
                      <h2>{category.name}</h2>
                      <span>
                        {category.endpoints.length} ENDPOINTS
                      </span>
                    </div>

                  </div>

                  <div className="category-right">

                    <span className="endpoint-count">
                      {category.endpoints.length} EP
                    </span>

                    <span
                      className={
                        isOpen
                          ? "chevron rotate"
                          : "chevron"
                      }
                    >
                     ⌄
                    </span>

                  </div>

                </button>

                <div
                  className={
                    isOpen
                      ? "endpoint-list open"
                      : "endpoint-list"
                  }
                >

                  {category.endpoints.map(
                    (endpoint) => (
                      <button
                        key={`${category.id}-${endpoint.path}`}
                        className="endpoint-row"
                        onClick={() =>
                          openTester(
                            endpoint,
                            category
                          )
                        }
                      >

                        <span className="method">
                          {endpoint.method}
                        </span>

                        <span className="endpoint-info">

                          <strong>
                            {endpoint.name}
                          </strong>

                          <code>
                            {endpoint.path}
                          </code>

                        </span>

                        <span className="arrow">
                          →
                        </span>

                      </button>
                    )
                  )}

                </div>

              </div>
            );
          })}

        </section>

        {/* TESTER */}
        <section
          className="tester-section"
          id="tester"
        >

          <div className="section-label">
            API PLAYGROUND
          </div>

          <div className="tester-card">

            <div className="tester-head">

              <div>
                <h2>Endpoint Tester</h2>

                <p>
                  Test endpoint secara langsung
                  dari browser.
                </p>
              </div>

              {activeEndpoint && (
                <span className="live-badge">
                  LIVE
                </span>
              )}

            </div>

            {!activeEndpoint ? (

              <div className="empty-tester">
                <div className="empty-icon">
                  ◉
                </div>

                <h3>
                  Pilih endpoint
                </h3>

                <p>
                  Klik salah satu endpoint di atas
                  untuk mulai testing.
                </p>
              </div>

            ) : (

              <>

                <div className="endpoint-selected">

                  <div className="selected-method">
                    {activeEndpoint.method}
                  </div>

                  <code>
                    {activeEndpoint.path}
                  </code>

                </div>

                <div className="description">
                  Category:{" "}
                  <strong>
                    {activeEndpoint.category}
                  </strong>
                </div>

                {activeEndpoint.params.length > 0 && (

                  <div className="parameters">

                    <h3>
                      REQUEST PARAMETERS
                    </h3>

                    {activeEndpoint.params.map(
                      (param) => (

                        <div
                          className="input-group"
                          key={param}
                        >

                          <label>
                            {param.toUpperCase()}
                            <span>*</span>
                          </label>

                          <input
                            value={
                              values[param] || ""
                            }
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [param]:
                                  e.target.value,
                              })
                            }
                            placeholder={
                              param === "url"
                                ? "https://..."
                                : `Masukkan ${param}...`
                            }
                          />

                        </div>

                      )
                    )}

                  </div>

                )}

                <div className="tester-actions">

                  <button
                    className="execute-button"
                    onClick={executeRequest}
                    disabled={loading}
                  >
                    {loading
                      ? "EXECUTING..."
                      : "▶ EXECUTE REQUEST"}
                  </button>

                  <button
                    className="clear-button"
                    onClick={clearTester}
                  >
                    ↻ CLEAR
                  </button>

                </div>

                {/* RESPONSE */}
                <div className="response-panel">

                  <div className="response-header">

                    <div className="response-tabs">

                      <span className="active">
                        PREVIEW
                      </span>

                      <span>
                        JSON
                      </span>

                    </div>

                    <div className="response-meta">

                      {statusCode && (
                        <span
                          className={
                            statusCode >= 200 &&
                            statusCode < 300
                              ? "success"
                              : "failed"
                          }
                        >
                          {statusCode}{" "}
                          {statusCode >= 200 &&
                          statusCode < 300
                            ? "OK"
                            : "ERROR"}
                        </span>
                      )}

                      {elapsed !== null && (
                        <span>
                          {elapsed}ms
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="json-toolbar">

                    <span>
                      RESPONSE
                    </span>

                    {response && (
                      <button
                        onClick={copyResponse}
                      >
                        COPY
                      </button>
                    )}

                  </div>

                  <pre className="json-viewer">

                    {response
                      ? JSON.stringify(
                          response,
                          null,
                          2
                        )
                      : error
                      ? JSON.stringify(
                          {
                            status: false,
                            message: error,
                          },
                          null,
                          2
                        )
                      : "// Response akan muncul di sini..."}

                  </pre>

                </div>

              </>
            )}

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          D
        </div>

        <div>
          <strong>
            DINSTORE API
          </strong>

          <span>
            Developer Playground
          </span>
        </div>

        <div className="footer-copy">
          © 2026 DINSTORE
        </div>

      </footer>

    </div>
  );
}

export default App;
