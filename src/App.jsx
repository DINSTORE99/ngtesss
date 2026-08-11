import React, { useMemo, useState } from "react";
import "./style.css";

const API_BASE = "";

const categories = [
  {
    id: "ai",
    name: "AI",
    icon: "✦",
    color: "purple",
    endpoints: [
      ["aiko", "/api/ai/aiko", "Aiko AI"],
      ["lyricsgen", "/api/ai/lyricsgen", "Lyrics Generator"],
      ["ai4chat", "/api/ai/ai4chat", "AI4Chat"],
      ["azbryai", "/api/ai/azbryai", "Azbry AI"],
      ["chatday", "/api/ai/chatday", "ChatDay AI"],
      ["chatmusic", "/api/ai/chatmusic", "ChatMusic AI"],
      ["claude", "/api/ai/claude", "Claude AI"],
      ["deepseek", "/api/ai/deepseek", "DeepSeek AI"],
      ["oriper", "/api/ai/oriper", "Oriper AI"],
      ["generateprompt", "/api/ai/generateprompt", "Generate Prompt"],
      ["pollinations", "/api/ai/pollinations", "Pollinations AI"],
      ["gpt4o", "/api/ai/gpt4o", "GPT-4o"],
      ["gptfree", "/api/ai/gptfree", "GPT Free"],
      ["iask", "/api/ai/iask", "iAsk AI"],
      ["imagegen", "/api/ai/imagegen", "Image Generator"],
      ["ustadz", "/api/ai/ustadz", "Ustadz AI"],
      ["qwen", "/api/ai/qwen", "Qwen AI"],
      ["text2img", "/api/ai/text2img", "Text To Image"],
    ],
  },

  {
    id: "admin",
    name: "ADMIN",
    icon: "◇",
    color: "red",
    endpoints: [
      ["health", "/api/health", "API Health"],
      ["stats", "/api/stats", "API Statistics"],
    ],
  },

  {
    id: "cache",
    name: "CACHE",
    icon: "▤",
    color: "green",
    endpoints: [
      ["clear", "/api/cache/clear", "Clear Cache"],
      ["status", "/api/cache/status", "Cache Status"],
    ],
  },

  {
    id: "download",
    name: "DOWNLOAD",
    icon: "⇩",
    color: "blue",
    endpoints: [
      ["tiktok", "/api/tiktok", "TikTok Downloader"],
      ["instagram", "/api/instagram", "Instagram Downloader"],
      ["applemusic", "/api/applemusic", "Apple Music Downloader"],
      ["capcut", "/api/capcut", "CapCut Downloader"],
      ["douyin", "/api/douyin", "Douyin Downloader"],
      ["dramabox", "/api/dramabox", "DramaBox Downloader"],
      ["facebook", "/api/facebook", "Facebook Downloader"],
      ["mediafire", "/api/mediafire", "MediaFire Downloader"],
      ["pinterest", "/api/pinterest", "Pinterest Downloader"],
      ["spotify", "/api/spotify", "Spotify Downloader"],
      ["soundcloud", "/api/soundcloud", "SoundCloud Downloader"],
      ["tiktokslide", "/api/tiktokslide", "TikTok Slide Downloader"],
      ["x", "/api/x", "X / Twitter Downloader"],
      ["ytmp3", "/api/ytmp3", "YouTube MP3"],
      ["ytplay", "/api/ytplay", "YouTube Play"],
    ],
  },

  {
    id: "fun",
    name: "FUN",
    icon: "●",
    color: "pink",
    endpoints: [
      ["truth", "/api/fun/truth", "Truth"],
      ["dare", "/api/fun/dare", "Dare"],
      ["joke", "/api/fun/joke", "Random Joke"],
    ],
  },

  {
    id: "leaderboard",
    name: "LEADERBOARD",
    icon: "♛",
    color: "yellow",
    endpoints: [
      ["leaderboard", "/api/leaderboard", "Leaderboard"],
    ],
  },

  {
    id: "library",
    name: "LIBRARY",
    icon: "▣",
    color: "orange",
    endpoints: [
      ["books", "/api/library/books", "Books"],
      ["quotes", "/api/library/quotes", "Quotes"],
    ],
  },

  {
    id: "maker",
    name: "MAKER",
    icon: "✿",
    color: "pink",
    endpoints: [
      ["logo", "/api/maker/logo", "Logo Maker"],
      ["sticker", "/api/maker/sticker", "Sticker Maker"],
    ],
  },

  {
    id: "news",
    name: "NEWS",
    icon: "▤",
    color: "cyan",
    endpoints: [
      ["news", "/api/news", "Latest News"],
      ["search", "/api/news/search", "News Search"],
    ],
  },

  {
    id: "random",
    name: "RANDOM",
    icon: "❖",
    color: "violet",
    endpoints: [
      ["random", "/api/random", "Random Generator"],
      ["quote", "/api/random/quote", "Random Quote"],
      ["fact", "/api/random/fact", "Random Fact"],
    ],
  },

  {
    id: "search",
    name: "SEARCH",
    icon: "⌕",
    color: "teal",
    endpoints: [
      ["google", "/api/search/google", "Google Search"],
      ["youtube", "/api/search/youtube", "YouTube Search"],
      ["github", "/api/search/github", "GitHub Search"],
    ],
  },

  {
    id: "stalk",
    name: "STALK",
    icon: "◉",
    color: "purple",
    endpoints: [
      ["github", "/api/stalk/github", "GitHub Stalk"],
      ["tiktok", "/api/stalk/tiktok", "TikTok Stalk"],
    ],
  },

  {
    id: "tools",
    name: "TOOLS",
    icon: "⌘",
    color: "orange",
    endpoints: [
      ["aicoder", "/api/tools/aicoder", "AI Coder"],
      ["translate", "/api/tools/translate", "Translator"],
      ["shorturl", "/api/tools/shorturl", "URL Shortener"],
    ],
  },
];

const particles = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 61) % 100}%`,
  size: `${2 + ((i * 7) % 4)}px`,
  delay: `${(i % 10) * 0.7}s`,
  duration: `${5 + (i % 8)}s`,
}));

function prettyJSON(data) {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState("ai");
  const [selected, setSelected] = useState(null);
  const [parameter, setParameter] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("response");

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return categories;

    return categories
      .map((category) => {
        const categoryMatch = category.name.toLowerCase().includes(q);

        const endpoints = category.endpoints.filter(
          ([name, path, title]) =>
            categoryMatch ||
            name.toLowerCase().includes(q) ||
            path.toLowerCase().includes(q) ||
            title.toLowerCase().includes(q)
        );

        return {
          ...category,
          endpoints,
        };
      })
      .filter((category) => category.endpoints.length > 0);
  }, [search]);

  const totalEndpoints = categories.reduce(
    (total, category) => total + category.endpoints.length,
    0
  );

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function selectEndpoint(endpoint, category) {
    setSelected({
      name: endpoint[0],
      path: endpoint[1],
      title: endpoint[2],
      category: category.name,
    });

    setResponse(null);
    setActiveTab("response");

    setTimeout(() => {
      document
        .getElementById("tester")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function executeRequest() {
    if (!selected) return;

    setLoading(true);
    setResponse(null);

    const started = performance.now();

    try {
      let url = `${API_BASE}${selected.path}`;

      if (parameter.trim()) {
        const separator = url.includes("?") ? "&" : "?";

        url +=
          separator +
          `q=${encodeURIComponent(parameter.trim())}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = {
          raw: text,
        };
      }

      setResponse({
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        time: Math.round(performance.now() - started),
        url,
        data,
      });
    } catch (error) {
      setResponse({
        ok: false,
        status: 0,
        statusText: "NETWORK ERROR",
        time: Math.round(performance.now() - started),
        url: `${API_BASE}${selected.path}`,
        data: {
          error: error.message,
        },
      });
    } finally {
      setLoading(false);
    }
  }

  function clearTester() {
    setParameter("");
    setResponse(null);
  }

  function handleCategory(category) {
    setOpenCategory(
      openCategory === category.id ? null : category.id
    );
  }

  return (
    <div className={dark ? "app dark" : "app light"}>
      <div className="background-grid" />

      <div className="particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <header className="header">
        <div className="header-inner">
          <button
            className="brand"
            onClick={() => scrollTo("home")}
          >
            <div className="brand-logo">D</div>

            <div>
              <div className="brand-title">
                DINSTORE <span>API</span>
              </div>

              <div className="brand-subtitle">
                Developer Playground
              </div>
            </div>
          </button>

          <div className="header-actions">
            <button
              className="theme-button"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              {dark ? "☀" : "☾"}
            </button>

            <button
              className="menu-button"
              onClick={() => scrollTo("categories")}
            >
              ☰
            </button>
          </div>
        </div>

        <nav className="nav">
          <button onClick={() => scrollTo("random")}>
            RANDOM
          </button>

          <button onClick={() => scrollTo("search-section")}>
            SEARCH
          </button>

          <button onClick={() => scrollTo("stalk")}>
            STALK
          </button>

          <button onClick={() => scrollTo("tools")}>
            TOOLS
          </button>

          <button onClick={() => scrollTo("tester")}>
            TESTER
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="online-badge">
            <span className="online-dot" />
            API SYSTEM ONLINE
          </div>

          <h1>
            DINSTORE <span>API</span>
          </h1>

          <p>
            API downloader, AI, tools, search and utilities
            untuk kebutuhan aplikasi kamu.
          </p>

          <div className="stats">
            <div className="stat-card">
              <strong>13</strong>
              <small>CATEGORIES</small>
            </div>

            <div className="stat-card">
              <strong>{totalEndpoints}</strong>
              <small>ENDPOINTS</small>
            </div>

            <div className="stat-card">
              <strong>JSON</strong>
              <small>RESPONSE</small>
            </div>
          </div>
        </section>

        <section className="search-box-section">
          <div className="search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search endpoint atau category..."
            />

            {search && (
              <button onClick={() => setSearch("")}>
                ×
              </button>
            )}
          </div>
        </section>

        <section
          id="categories"
          className="categories-section"
        >
          <div className="section-heading">
            <div>
              <span>API DIRECTORY</span>
              <h2>Categories</h2>
            </div>

            <small>
              {filteredCategories.length} CATEGORIES
            </small>
          </div>

          <div className="category-list">
            {filteredCategories.map((category) => {
              const isOpen =
                openCategory === category.id;

              return (
                <div
                  id={category.id}
                  className={`category-card ${
                    isOpen ? "open" : ""
                  }`}
                  key={category.id}
                >
                  <button
                    className="category-header"
                    onClick={() => handleCategory(category)}
                  >
                    <div
                      className={`category-icon ${category.color}`}
                    >
                      {category.icon}
                    </div>

                    <div className="category-info">
                      <strong>{category.name}</strong>

                      <span>
                        {category.endpoints.length} ENDPOINTS
                      </span>
                    </div>

                    <div className="category-arrow">
                      {isOpen ? "⌃" : "⌄"}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="endpoint-list">
                      {category.endpoints.map((endpoint) => (
                        <button
                          key={endpoint[1]}
                          className="endpoint-row"
                          onClick={() =>
                            selectEndpoint(
                              endpoint,
                              category
                            )
                          }
                        >
                          <div className="method">
                            GET
                          </div>

                          <div className="endpoint-main">
                            <code>{endpoint[1]}</code>

                            <span>{endpoint[2]}</span>
                          </div>

                          <div className="endpoint-open">
                            →
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="tester"
          className="tester-section"
        >
          <div className="section-heading">
            <div>
              <span>PLAYGROUND</span>
              <h2>Endpoint Tester</h2>
            </div>

            <small>LIVE REQUEST</small>
          </div>

          <div className="tester-card">
            {!selected ? (
              <div className="empty-tester">
                <div className="empty-icon">⌁</div>

                <h3>Select an endpoint</h3>

                <p>
                  Pilih salah satu endpoint di atas untuk
                  mulai melakukan request.
                </p>

                <button
                  onClick={() => scrollTo("categories")}
                >
                  BROWSE ENDPOINTS
                </button>
              </div>
            ) : (
              <>
                <div className="tester-top">
                  <div>
                    <span className="tester-label">
                      SELECTED ENDPOINT
                    </span>

                    <h3>{selected.title}</h3>

                    <code>{selected.path}</code>
                  </div>

                  <span className="method-large">
                    GET
                  </span>
                </div>

                <div className="request-form">
                  <label>
                    QUERY PARAMETER
                  </label>

                  <div className="parameter-row">
                    <span>q=</span>

                    <input
                      value={parameter}
                      onChange={(e) =>
                        setParameter(e.target.value)
                      }
                      placeholder="Masukkan parameter..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          executeRequest();
                        }
                      }}
                    />
                  </div>

                  <div className="tester-buttons">
                    <button
                      className="execute"
                      onClick={executeRequest}
                      disabled={loading}
                    >
                      {loading
                        ? "EXECUTING..."
                        : "EXECUTE REQUEST"}
                    </button>

                    <button
                      className="clear"
                      onClick={clearTester}
                    >
                      CLEAR
                    </button>
                  </div>
                </div>

                {response && (
                  <div className="response-panel">
                    <div className="response-header">
                      <div className="response-tabs">
                        <button
                          className={
                            activeTab === "response"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setActiveTab("response")
                          }
                        >
                          RESPONSE
                        </button>

                        <button
                          className={
                            activeTab === "request"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setActiveTab("request")
                          }
                        >
                          REQUEST
                        </button>
                      </div>

                      <div
                        className={
                          response.ok
                            ? "status success"
                            : "status error"
                        }
                      >
                        {response.status
                          ? `${response.status} ${
                              response.statusText
                            }`
                          : "ERROR"}
                      </div>

                      <span className="response-time">
                        {response.time}ms
                      </span>
                    </div>

                    <div className="response-body">
                      {activeTab === "response" ? (
                        <pre>
                          {prettyJSON(response.data)}
                        </pre>
                      ) : (
                        <pre>
                          {`GET ${response.url}\n\nAccept: application/json`}
                        </pre>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section
          id="search-section"
          className="anchor-section"
        >
          <div className="mini-section">
            <span>⌕</span>
            <div>
              <strong>SEARCH</strong>
              <p>
                Search seluruh endpoint DINSTORE API.
              </p>
            </div>
          </div>
        </section>

        <section
          id="random"
          className="anchor-section"
        >
          <div className="mini-section">
            <span>❖</span>
            <div>
              <strong>RANDOM</strong>
              <p>
                Random utilities dan generator.
              </p>
            </div>
          </div>
        </section>

        <section
          id="stalk"
          className="anchor-section"
        >
          <div className="mini-section">
            <span>◉</span>
            <div>
              <strong>STALK</strong>
              <p>
                Social profile lookup endpoints.
              </p>
            </div>
          </div>
        </section>

        <section
          id="tools"
          className="anchor-section"
        >
          <div className="mini-section">
            <span>⌘</span>
            <div>
              <strong>TOOLS</strong>
              <p>
                Berbagai tools untuk kebutuhan aplikasi.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <strong>DINSTORE API</strong>
          <span>Developer Playground</span>
        </div>

        <span>
          JSON API • {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
