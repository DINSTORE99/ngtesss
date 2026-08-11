import React, { useEffect, useMemo, useState } from "react";
import "./style.css";

const API_BASE = "";

const categories = [
  {
    name: "AI",
    icon: "✦",
    color: "purple",
    endpoints: [
      ["aiko", "/api/ai/aiko", "AIKO AI"],
      ["lyricsgen", "/api/ai/lyricsgen", "Lyrics Generator"],
      ["ai4chat", "/api/ai/ai4chat", "AI4Chat"],
      ["azbryai", "/api/ai/azbryai", "Azbry AI"],
      ["chatday", "/api/ai/chatday", "ChatDay AI"],
      ["chatmusic", "/api/ai/chatmusic", "Chat Music AI"],
      ["claude", "/api/ai/claude", "Claude AI"],
      ["deepseek", "/api/ai/deepseek", "DeepSeek AI"],
      ["oriper", "/api/ai/oriper", "Oriper AI"],
      ["generateprompt", "/api/ai/generateprompt", "Generate Prompt"],
      ["pollinations", "/api/ai/pollinations", "Pollinations AI"],
      ["gpt4o", "/api/ai/gpt4o", "GPT-4o"],
      ["gptfree", "/api/ai/gptfree", "GPT Free"],
      ["iask", "/api/ai/iask", "iAsk AI"],
      ["imagegen", "/api/ai/imagegen", "AI Image Generator"],
      ["ustadz", "/api/ai/ustadz", "Ustadz AI"],
      ["qwen", "/api/ai/qwen", "Qwen AI"],
      ["text2img", "/api/ai/text2img", "Text To Image"],
    ],
  },

  {
    name: "ADMIN",
    icon: "◇",
    color: "red",
    endpoints: [
      ["health", "/api/health", "Health Check"],
      ["docs", "/api/docs", "API Documentation"],
    ],
  },

  {
    name: "CACHE",
    icon: "▣",
    color: "cyan",
    endpoints: [
      ["cache", "/api/cache", "Cache Manager"],
      ["clearcache", "/api/clearcache", "Clear Cache"],
    ],
  },

  {
    name: "DOWNLOAD",
    icon: "⇩",
    color: "blue",
    endpoints: [
      ["tiktok", "/api/tiktok", "TikTok Downloader"],
      ["instagram", "/api/instagram", "Instagram Downloader"],
      ["applemusic", "/api/download/applemusic", "Apple Music Downloader"],
      ["capcut", "/api/download/capcut", "CapCut Downloader"],
      ["douyin", "/api/downloader/douyin", "Douyin Downloader"],
      ["dramabox", "/api/download/dramabox", "DramaBox Downloader"],
      ["facebook", "/api/download/facebook", "Facebook Downloader"],
      ["mediafire", "/api/download/mediafire", "MediaFire Downloader"],
      ["pinterest", "/api/download/pinterest", "Pinterest Downloader"],
      ["spotify", "/api/download/spotify", "Spotify Downloader"],
      ["soundcloud", "/api/download/soundcloud", "SoundCloud Downloader"],
      ["tiktokslide", "/api/download/tiktokslide", "TikTok Slide"],
      ["x", "/api/download/x", "X Downloader"],
      ["ytmp3", "/api/download/ytmp3", "YouTube MP3"],
      ["ytplay", "/api/download/ytplay", "YouTube Play"],
    ],
  },

  {
    name: "FUN",
    icon: "●",
    color: "pink",
    endpoints: [
      ["joke", "/api/fun/joke", "Random Joke"],
      ["quote", "/api/fun/quote", "Random Quote"],
      ["fact", "/api/fun/fact", "Random Fact"],
    ],
  },

  {
    name: "LEADERBOARD",
    icon: "♛",
    color: "yellow",
    endpoints: [
      ["leaderboard", "/api/leaderboard", "Leaderboard"],
    ],
  },

  {
    name: "LIBRARY",
    icon: "▤",
    color: "orange",
    endpoints: [
      ["anime", "/api/library/anime", "Anime Library"],
      ["manga", "/api/library/manga", "Manga Library"],
      ["books", "/api/library/books", "Books"],
    ],
  },

  {
    name: "MAKER",
    icon: "●",
    color: "pink",
    endpoints: [
      ["sticker", "/api/maker/sticker", "Sticker Maker"],
      ["logo", "/api/maker/logo", "Logo Maker"],
      ["qr", "/api/maker/qr", "QR Generator"],
    ],
  },

  {
    name: "NEWS",
    icon: "▤",
    color: "cyan",
    endpoints: [
      ["news", "/api/news", "Latest News"],
      ["newssearch", "/api/news/search", "News Search"],
      ["technology", "/api/news/technology", "Technology News"],
    ],
  },

  {
    name: "RANDOM",
    icon: "◆",
    color: "purple",
    endpoints: [
      ["random", "/api/random", "Random Data"],
      ["randomuser", "/api/random/user", "Random User"],
      ["randomimage", "/api/random/image", "Random Image"],
      ["randomquote", "/api/random/quote", "Random Quote"],
      ["randomcolor", "/api/random/color", "Random Color"],
      ["randomnumber", "/api/random/number", "Random Number"],
    ],
  },

  {
    name: "SEARCH",
    icon: "⌕",
    color: "green",
    endpoints: [
      ["google", "/api/search/google", "Google Search"],
      ["youtube", "/api/search/youtube", "YouTube Search"],
      ["github", "/api/search/github", "GitHub Search"],
      ["pinterest", "/api/search/pinterest", "Pinterest Search"],
      ["spotify", "/api/search/spotify", "Spotify Search"],
    ],
  },

  {
    name: "STALK",
    icon: "◉",
    color: "violet",
    endpoints: [
      ["github", "/api/stalk/github", "GitHub Stalker"],
      ["instagram", "/api/stalk/instagram", "Instagram Stalker"],
      ["tiktok", "/api/stalk/tiktok", "TikTok Stalker"],
    ],
  },

  {
    name: "TOOLS",
    icon: "⌁",
    color: "orange",
    endpoints: [
      ["aicoder", "/api/tools/aicoder", "AI Coder"],
      ["shorturl", "/api/tools/shorturl", "URL Shortener"],
      ["translate", "/api/tools/translate", "Translator"],
      ["qrcode", "/api/tools/qrcode", "QR Code"],
    ],
  },
];

function App() {
  const [openCategory, setOpenCategory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const particles = document.querySelector(".particles");

    if (!particles) return;

    for (let i = 0; i < 45; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${5 + Math.random() * 8}s`;
      particle.style.setProperty(
        "--size",
        `${1 + Math.random() * 3}px`
      );

      particles.appendChild(particle);
    }

    return () => {
      particles.innerHTML = "";
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return categories;

    return categories
      .map((category) => {
        const categoryMatch = category.name
          .toLowerCase()
          .includes(keyword);

        const endpoints = category.endpoints.filter((item) =>
          item.join(" ").toLowerCase().includes(keyword)
        );

        if (categoryMatch) return category;

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
    (total, category) => total + category.endpoints.length,
    0
  );

  const selectEndpoint = (category, endpoint) => {
    setSelected({
      category,
      endpoint,
    });

    setInput("");
    setResponse(null);
    setResponseTime(null);
    setOpenCategory(category.name);
  };

  const buildUrl = () => {
    if (!selected) return "";

    const [, path] = selected.endpoint;

    if (!input.trim()) {
      return `${API_BASE}${path}`;
    }

    const separator = path.includes("?") ? "&" : "?";

    return `${API_BASE}${path}${separator}q=${encodeURIComponent(
      input.trim()
    )}`;
  };

  const executeRequest = async () => {
    if (!selected) return;

    setLoading(true);
    setResponse(null);

    const start = performance.now();

    try {
      const url = buildUrl();

      const res = await fetch(url);

      const elapsed = Math.round(performance.now() - start);

      setResponseTime(elapsed);

      const contentType = res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        try {
          data = JSON.parse(text);
        } catch {
          data = {
            status: res.status,
            response: text,
          };
        }
      }

      setResponse({
        ok: res.ok,
        status: res.status,
        data,
      });
    } catch (error) {
      setResponseTime(Math.round(performance.now() - start));

      setResponse({
        ok: false,
        status: 0,
        data: {
          success: false,
          error: error.message,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const clearTester = () => {
    setInput("");
    setResponse(null);
    setResponseTime(null);
  };

  const copyCurl = async () => {
    const url = buildUrl();

    if (!url) return;

    const curl = `curl -X GET "${window.location.origin}${url}"`;

    try {
      await navigator.clipboard.writeText(curl);
    } catch {}
  };

  const scrollTo = (id) => {
    setActiveNav(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="app">
      <div className="particles" />

      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />
      <div className="background-glow glow-three" />

      <header className="header">
        <div
          className="brand"
          onClick={() => scrollTo("home")}
        >
          <div className="brand-logo">D</div>

          <div>
            <div className="brand-name">
              DINSTORE <span>API</span>
            </div>

            <div className="brand-subtitle">
              Developer Playground
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => window.scrollTo({
              top: 0,
              behavior: "smooth",
            })}
          >
            ☼
          </button>

          <button
            className="icon-button"
            onClick={() => scrollTo("categories")}
          >
            ☰
          </button>
        </div>
      </header>

      <nav className="navbar">
        <button
          className={activeNav === "random" ? "active" : ""}
          onClick={() => scrollTo("categories")}
        >
          RANDOM
        </button>

        <button
          className={activeNav === "search" ? "active" : ""}
          onClick={() => {
            scrollTo("categories");
            setSearch("search");
          }}
        >
          SEARCH
        </button>

        <button
          className={activeNav === "stalk" ? "active" : ""}
          onClick={() => {
            scrollTo("categories");
            setSearch("stalk");
          }}
        >
          STALK
        </button>

        <button
          className={activeNav === "tools" ? "active" : ""}
          onClick={() => {
            scrollTo("categories");
            setSearch("tools");
          }}
        >
          TOOLS
        </button>

        <button
          className={activeNav === "tester" ? "active" : ""}
          onClick={() => scrollTo("tester")}
        >
          TESTER
        </button>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="status-pill">
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

        <section
          id="categories"
          className="categories-section"
        >
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

          <div className="category-list">
            {filteredCategories.map((category) => {
              const isOpen =
                openCategory === category.name;

              return (
                <div
                  className={`category-card ${
                    isOpen ? "category-open" : ""
                  }`}
                  key={category.name}
                >
                  <button
                    className="category-header"
                    onClick={() =>
                      setOpenCategory(
                        isOpen ? null : category.name
                      )
                    }
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

                    <span className="category-arrow">
                      {isOpen ? "⌃" : "⌄"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="endpoint-list">
                      {category.endpoints.map(
                        (endpoint) => {
                          const [key, path, title] =
                            endpoint;

                          const active =
                            selected?.endpoint?.[0] === key &&
                            selected?.category?.name ===
                              category.name;

                          return (
                            <button
                              key={key}
                              className={`endpoint ${
                                active ? "endpoint-active" : ""
                              }`}
                              onClick={() =>
                                selectEndpoint(
                                  category,
                                  endpoint
                                )
                              }
                            >
                              <div className="method">
                                GET
                              </div>

                              <div className="endpoint-content">
                                <strong>{title}</strong>

                                <span>{path}</span>
                              </div>

                              <span className="endpoint-arrow">
                                →
                              </span>
                            </button>
                          );
                        }
                      )}
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

            <div className="tester-status">
              {selected ? "READY" : "SELECT ENDPOINT"}
            </div>
          </div>

          {!selected ? (
            <div className="empty-tester">
              <div className="empty-icon">⌁</div>

              <h3>Pilih Endpoint</h3>

              <p>
                Buka salah satu kategori kemudian pilih
                endpoint untuk mulai melakukan request.
              </p>
            </div>
          ) : (
            <div className="tester-card">
              <div className="tester-top">
                <div>
                  <div className="tester-category">
                    {selected.category.name}
                  </div>

                  <h3>
                    {selected.endpoint[2]}
                  </h3>
                </div>

                <div className="method-large">
                  GET
                </div>
              </div>

              <div className="url-display">
                <span>{buildUrl()}</span>
              </div>

              <label>
                REQUEST PARAMETER
              </label>

              <div className="input-wrapper">
                <span>URL / QUERY</span>

                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  placeholder={
                    selected.category.name === "DOWNLOAD"
                      ? "Masukkan URL video..."
                      : "Masukkan query..."
                  }
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
                    : "▶ EXECUTE REQUEST"}
                </button>

                <button
                  className="clear"
                  onClick={clearTester}
                >
                  CLEAR
                </button>
              </div>

              <div className="response-tabs">
                <span className="tab-active">
                  PREVIEW
                </span>

                <span>HEADERS</span>

                <button onClick={copyCurl}>
                  CURL
                </button>

                {response && (
                  <span
                    className={
                      response.ok
                        ? "status-ok"
                        : "status-error"
                    }
                  >
                    {response.status || "ERROR"}{" "}
                    {response.ok ? "OK" : "ERROR"}
                  </span>
                )}

                {responseTime !== null && (
                  <span className="response-time">
                    {responseTime}ms
                  </span>
                )}
              </div>

              <pre className="json-viewer">
                {response
                  ? JSON.stringify(
                      response.data,
                      null,
                      2
                    )
                  : "// Response JSON akan muncul di sini..."}
              </pre>

              <div className="curl-box">
                <div className="curl-title">
                  CURL REQUEST
                  <button onClick={copyCurl}>
                    COPY
                  </button>
                </div>

                <code>
                  curl -X GET "{window.location.origin}
                  {buildUrl()}"
                </code>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer>
        <div>
          <strong>DINSTORE API</strong>
          <span>Developer Playground</span>
        </div>

        <div>
          JSON API • {totalEndpoints} ENDPOINTS
        </div>
      </footer>
    </div>
  );
}

export default App;
