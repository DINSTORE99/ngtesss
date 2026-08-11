import { useMemo, useState } from "react";
import "./style.css";

const API_BASE = "";

const categories = [
  {
    name: "AI",
    icon: "✦",
    color: "purple",
    endpoints: [
      ["aiko", "Aiko AI", "GET", "q"],
      ["lyricsgen", "Lyrics Generator", "GET", "q"],
      ["ai4chat", "AI4Chat", "GET", "q"],
      ["azbryai", "Azbry AI", "GET", "q"],
      ["chatday", "ChatDay AI", "GET", "q"],
      ["chatmusic", "ChatMusic AI", "GET", "q"],
      ["claude", "Claude AI", "GET", "q"],
      ["deepseek", "DeepSeek AI", "GET", "q"],
      ["oriper", "Oriper AI", "GET", "q"],
      ["generateprompt", "Generate Prompt", "GET", "q"],
      ["pollinations", "Pollinations AI", "GET", "q"],
      ["gpt4o", "GPT-4o", "GET", "q"],
      ["gptfree", "GPT Free", "GET", "q"],
      ["iask", "iAsk AI", "GET", "q"],
      ["imagegen", "Image Generator", "GET", "q"],
      ["ustadz", "Ustadz AI", "GET", "q"],
      ["qwen", "Qwen AI", "GET", "q"],
      ["text2img", "Text To Image", "GET", "q"],
      ["aicoder", "AI Coder", "GET", "q"],
    ],
  },

  {
    name: "DOWNLOAD",
    icon: "⇩",
    color: "blue",
    endpoints: [
      ["tiktok", "TikTok Downloader", "GET", "url"],
      ["instagram", "Instagram Downloader", "GET", "url"],
      ["applemusic", "Apple Music Downloader", "GET", "url"],
      ["capcut", "CapCut Video Downloader", "GET", "url"],
      ["douyin", "Douyin Downloader", "GET", "url"],
      ["dramabox", "DramaBox Downloader", "GET", "url"],
      ["facebook", "Facebook Downloader", "GET", "url"],
      ["mediafire", "MediaFire Downloader", "GET", "url"],
      ["pinterest", "Pinterest Downloader", "GET", "url"],
      ["spotify", "Spotify Downloader", "GET", "url"],
      ["soundcloud", "SoundCloud Downloader", "GET", "url"],
      ["tiktokslide", "TikTok Slide Downloader", "GET", "url"],
      ["x", "X / Twitter Downloader", "GET", "url"],
      ["ytmp3", "YouTube MP3", "GET", "url"],
      ["ytplay", "YouTube Play", "GET", "url"],
    ],
  },

  {
    name: "ADMIN",
    icon: "♜",
    color: "red",
    endpoints: [],
  },

  {
    name: "CACHE",
    icon: "▣",
    color: "green",
    endpoints: [],
  },

  {
    name: "FUN",
    icon: "✿",
    color: "pink",
    endpoints: [],
  },

  {
    name: "LEADERBOARD",
    icon: "♛",
    color: "yellow",
    endpoints: [],
  },

  {
    name: "LIBRARY",
    icon: "▤",
    color: "orange",
    endpoints: [],
  },

  {
    name: "MAKER",
    icon: "◉",
    color: "pink",
    endpoints: [],
  },

  {
    name: "NEWS",
    icon: "▥",
    color: "cyan",
    endpoints: [],
  },

  {
    name: "RANDOM",
    icon: "◈",
    color: "violet",
    endpoints: [],
  },

  {
    name: "SEARCH",
    icon: "⌕",
    color: "teal",
    endpoints: [],
  },

  {
    name: "STALK",
    icon: "◉",
    color: "purple",
    endpoints: [],
  },

  {
    name: "TOOLS",
    icon: "⌕",
    color: "orange",
    endpoints: [],
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState("DOWNLOAD");
  const [openEndpoint, setOpenEndpoint] = useState("capcut");

  const [values, setValues] = useState({});
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState({});
  const [activeTab, setActiveTab] = useState({});

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return categories;

    return categories
      .map((category) => {
        const categoryMatch = category.name.toLowerCase().includes(keyword);

        const endpoints = category.endpoints.filter(
          ([path, title]) =>
            path.toLowerCase().includes(keyword) ||
            title.toLowerCase().includes(keyword)
        );

        if (categoryMatch) {
          return category;
        }

        return {
          ...category,
          endpoints,
        };
      })
      .filter(
        (category) =>
          category.name.toLowerCase().includes(keyword) ||
          category.endpoints.length > 0
      );
  }, [search]);

  const updateValue = (path, key, value) => {
    setValues((prev) => ({
      ...prev,
      [path]: {
        ...(prev[path] || {}),
        [key]: value,
      },
    }));
  };

  const getValue = (path, key) => {
    return values[path]?.[key] || "";
  };

  const buildUrl = (path, parameter) => {
    const value = getValue(path, parameter);

    const url = new URL(
      `${API_BASE}/api/${path}`,
      window.location.origin
    );

    if (value) {
      url.searchParams.set(parameter, value);
    }

    return url.toString();
  };

  const executeRequest = async (path, parameter) => {
    const requestKey = path;

    setLoading((prev) => ({
      ...prev,
      [requestKey]: true,
    }));

    const started = performance.now();

    try {
      const url = buildUrl(path, parameter);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const elapsed = Math.round(performance.now() - started);

      const headers = {};

      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      setResponses((prev) => ({
        ...prev,
        [requestKey]: {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          time: elapsed,
          data,
          headers,
          url,
        },
      }));

      setActiveTab((prev) => ({
        ...prev,
        [requestKey]: "preview",
      }));
    } catch (error) {
      const elapsed = Math.round(performance.now() - started);

      setResponses((prev) => ({
        ...prev,
        [requestKey]: {
          ok: false,
          status: 0,
          statusText: "NETWORK ERROR",
          time: elapsed,
          data: {
            creator: "DINSTORE",
            status: false,
            message: error.message || "Gagal menghubungi API",
          },
          headers: {},
          url: buildUrl(path, parameter),
        },
      }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        [requestKey]: false,
      }));
    }
  };

  const clearRequest = (path) => {
    setValues((prev) => ({
      ...prev,
      [path]: {},
    }));

    setResponses((prev) => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  };

  const getCurl = (response) => {
    if (!response) return "";

    return `curl -X GET "${response.url}" -H "Accept: application/json"`;
  };

  const copyCurl = async (response) => {
    if (!response) return;

    try {
      await navigator.clipboard.writeText(getCurl(response));
    } catch {
      // ignore
    }
  };

  const renderJson = (data) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div className="app">

      {/* HEADER */}

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">D</div>

          <div>
            <div className="brand-title">DINSTORE API</div>
            <div className="brand-subtitle">
              API PLAYGROUND
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button className="header-button">
            ☼
          </button>

          <button className="header-button">
            ☰
          </button>
        </div>
      </header>

      {/* HERO */}

      <section className="hero">
        <div className="hero-badge">
          <span className="live-dot"></span>
          API PLAYGROUND
        </div>

        <h1>
          DINSTORE
          <span> API</span>
        </h1>

        <p>
          Test and explore all available API endpoints
          directly from your browser.
        </p>

        <div className="stats">
          <div>
            <strong>
              {categories.length}
            </strong>
            <span>CATEGORIES</span>
          </div>

          <div>
            <strong>
              {categories.reduce(
                (total, category) =>
                  total + category.endpoints.length,
                0
              )}
            </strong>
            <span>ENDPOINTS</span>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="search-section">
        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by path or alias..."
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

      <main className="content">

        {filteredCategories.map((category) => {
          const isOpen =
            openCategory === category.name;

          return (
            <section
              className={`category ${isOpen ? "category-open" : ""}`}
              key={category.name}
            >

              {/* CATEGORY HEADER */}

              <button
                className={`category-header ${category.color}`}
                onClick={() =>
                  setOpenCategory(
                    isOpen ? "" : category.name
                  )
                }
              >
                <div className="category-left">

                  <div className="category-icon">
                    {category.icon}
                  </div>

                  <div>
                    <div className="category-name">
                      {category.name}
                    </div>

                    <div className="category-count">
                      {category.endpoints.length} ENDPOINTS
                    </div>
                  </div>

                </div>

                <div className="category-right">

                  <span className="endpoint-count">
                    {category.endpoints.length} EP
                  </span>

                  <span className="arrow">
                    {isOpen ? "⌃" : "⌄"}
                  </span>

                </div>
              </button>

              {/* CATEGORY BODY */}

              {isOpen && (
                <div className="category-body">

                  {category.endpoints.length === 0 ? (
                    <div className="empty-category">
                      Endpoint kategori ini belum ditambahkan.
                    </div>
                  ) : (
                    category.endpoints.map(
                      ([path, title, method, parameter]) => {

                        const endpointOpen =
                          openEndpoint === path;

                        const response =
                          responses[path];

                        const tab =
                          activeTab[path] || "preview";

                        const isLoading =
                          loading[path];

                        return (
                          <div
                            className={`endpoint ${
                              endpointOpen
                                ? "endpoint-open"
                                : ""
                            }`}
                            key={path}
                          >

                            {/* ENDPOINT TITLE */}

                            <button
                              className="endpoint-header"
                              onClick={() =>
                                setOpenEndpoint(
                                  endpointOpen
                                    ? ""
                                    : path
                                )
                              }
                            >

                              <div className="method">
                                {method}
                              </div>

                              <div className="endpoint-info">
                                <div className="endpoint-path">
                                  /api/{path}
                                </div>

                                <div className="endpoint-title">
                                  {title}
                                </div>
                              </div>

                              <div className="endpoint-arrow">
                                {endpointOpen
                                  ? "⌃"
                                  : "⌄"}
                              </div>

                            </button>

                            {/* ENDPOINT TESTER */}

                            {endpointOpen && (
                              <div className="endpoint-panel">

                                <p className="description">
                                  Test the{" "}
                                  <strong>
                                    {title}
                                  </strong>{" "}
                                  endpoint by providing
                                  the required parameter.
                                </p>

                                <div className="method-tabs">
                                  <button className="method-active">
                                    GET
                                  </button>

                                  <button>
                                    POST
                                  </button>
                                </div>

                                <div className="parameters">

                                  <div className="parameter-title">
                                    REQUEST PARAMETERS
                                  </div>

                                  <div className="parameter">

                                    <label>
                                      {parameter.toUpperCase()}
                                      <span>*</span>
                                    </label>

                                    <input
                                      value={getValue(
                                        path,
                                        parameter
                                      )}
                                      onChange={(e) =>
                                        updateValue(
                                          path,
                                          parameter,
                                          e.target.value
                                        )
                                      }
                                      placeholder={
                                        parameter === "url"
                                          ? "https://..."
                                          : "Pesan yang ingin dikirim..."
                                      }
                                    />

                                  </div>

                                </div>

                                <button
                                  className="execute"
                                  disabled={isLoading}
                                  onClick={() =>
                                    executeRequest(
                                      path,
                                      parameter
                                    )
                                  }
                                >
                                  {isLoading
                                    ? "PROCESSING..."
                                    : "▶  EXECUTE REQUEST"}
                                </button>

                                <button
                                  className="clear-button"
                                  onClick={() =>
                                    clearRequest(path)
                                  }
                                >
                                  CLEAR
                                </button>

                                {/* RESPONSE */}

                                {response && (
                                  <div className="response-box">

                                    <div className="response-tabs">

                                      <button
                                        className={
                                          tab === "preview"
                                            ? "tab-active"
                                            : ""
                                        }
                                        onClick={() =>
                                          setActiveTab(
                                            (prev) => ({
                                              ...prev,
                                              [path]:
                                                "preview",
                                            })
                                          )
                                        }
                                      >
                                        PREVIEW
                                      </button>

                                      <button
                                        className={
                                          tab === "headers"
                                            ? "tab-active"
                                            : ""
                                        }
                                        onClick={() =>
                                          setActiveTab(
                                            (prev) => ({
                                              ...prev,
                                              [path]:
                                                "headers",
                                            })
                                          )
                                        }
                                      >
                                        HEADERS
                                      </button>

                                      <button
                                        className={
                                          tab === "curl"
                                            ? "tab-active"
                                            : ""
                                        }
                                        onClick={() =>
                                          setActiveTab(
                                            (prev) => ({
                                              ...prev,
                                              [path]:
                                                "curl",
                                            })
                                          )
                                        }
                                      >
                                        CURL
                                      </button>

                                      <div className="response-status">

                                        <span
                                          className={
                                            response.ok
                                              ? "status-ok"
                                              : "status-error"
                                          }
                                        >
                                          {response.status ||
                                            "ERR"}{" "}
                                          {response.statusText}
                                        </span>

                                        <span>
                                          {response.time}ms
                                        </span>

                                      </div>

                                    </div>

                                    {/* PREVIEW */}

                                    {tab === "preview" && (
                                      <div className="code-view">
                                        <pre>
                                          {renderJson(
                                            response.data
                                          )}
                                        </pre>
                                      </div>
                                    )}

                                    {/* HEADERS */}

                                    {tab === "headers" && (
                                      <div className="code-view">
                                        <pre>
                                          {renderJson(
                                            response.headers
                                          )}
                                        </pre>
                                      </div>
                                    )}

                                    {/* CURL */}

                                    {tab === "curl" && (
                                      <div className="code-view curl-view">

                                        <button
                                          className="copy-button"
                                          onClick={() =>
                                            copyCurl(response)
                                          }
                                        >
                                          COPY
                                        </button>

                                        <pre>
                                          {getCurl(response)}
                                        </pre>

                                      </div>
                                    )}

                                  </div>
                                )}

                              </div>
                            )}

                          </div>
                        );
                      }
                    )
                  )}

                </div>
              )}

            </section>
          );
        })}

      </main>

      {/* FOOTER */}

      <footer>
        <div className="footer-line"></div>

        <div className="footer-brand">
          DINSTORE API
        </div>

        <div className="footer-copy">
          © 2026 DINSTORE • API PLAYGROUND
        </div>
      </footer>

    </div>
  );
}

export default App;
