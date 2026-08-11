import { useMemo, useState } from "react";
import "./style.css";

const API_BASE = "";

/*
|--------------------------------------------------------------------------
| DINSTORE API DOCUMENTATION
|--------------------------------------------------------------------------
*/

const categories = [
  {
    id: "ai",
    name: "AI",
    icon: "✦",
    color: "purple",
    endpoints: [
      {
        name: "Aiko",
        path: "/api/aiko",
        method: "GET",
        description: "AI chat Aiko",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "LyricsGen",
        path: "/api/lyricsgen",
        method: "GET",
        description: "Generate lyrics dengan AI",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Tema lagu...",
            required: true,
          },
        ],
      },
      {
        name: "AI4Chat",
        path: "/api/ai4chat",
        method: "GET",
        description: "AI chat",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "AzbryAI",
        path: "/api/azbryai",
        method: "GET",
        description: "Azbry AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "ChatDay",
        path: "/api/chatday",
        method: "GET",
        description: "ChatDay AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "ChatMusic",
        path: "/api/chatmusic",
        method: "GET",
        description: "AI untuk musik",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Claude",
        path: "/api/claude",
        method: "GET",
        description: "Claude AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "DeepSeek",
        path: "/api/deepseek",
        method: "GET",
        description: "DeepSeek AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "OriPer",
        path: "/api/oriper",
        method: "GET",
        description: "OriPer AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Generate Prompt",
        path: "/api/generateprompt",
        method: "GET",
        description: "Generate prompt dengan AI",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Masukkan ide...",
            required: true,
          },
        ],
      },
      {
        name: "Pollinations",
        path: "/api/pollinations",
        method: "GET",
        description: "Pollinations AI",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Masukkan prompt...",
            required: true,
          },
        ],
      },
      {
        name: "GPT-4o",
        path: "/api/gpt4o",
        method: "GET",
        description: "GPT-4o AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "GPT Free",
        path: "/api/gptfree",
        method: "GET",
        description: "GPT Free",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "iAsk",
        path: "/api/iask",
        method: "GET",
        description: "iAsk AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "ImageGen",
        path: "/api/imagegen",
        method: "GET",
        description: "AI image generator",
        params: [
          {
            name: "prompt",
            label: "Prompt",
            placeholder: "Deskripsikan gambar...",
            required: true,
          },
        ],
      },
      {
        name: "Ustadz",
        path: "/api/ustadz",
        method: "GET",
        description: "AI Ustadz",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Qwen",
        path: "/api/qwen",
        method: "GET",
        description: "Qwen AI",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Masukkan pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Text2Img",
        path: "/api/text2img",
        method: "GET",
        description: "Generate image from text",
        params: [
          {
            name: "prompt",
            label: "Prompt",
            placeholder: "Deskripsikan gambar...",
            required: true,
          },
        ],
      },
    ],
  },

  {
    id: "admin",
    name: "ADMIN",
    icon: "◈",
    color: "red",
    endpoints: [],
  },

  {
    id: "cache",
    name: "CACHE",
    icon: "▣",
    color: "green",
    endpoints: [],
  },

  {
    id: "download",
    name: "DOWNLOAD",
    icon: "⇩",
    color: "cyan",
    endpoints: [
      {
        name: "TikTok",
        path: "/api/tiktok",
        method: "GET",
        description: "TikTok Downloader",
        params: [
          {
            name: "url",
            label: "TikTok URL",
            placeholder: "https://www.tiktok.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Instagram",
        path: "/api/instagram",
        method: "GET",
        description: "Instagram Downloader",
        params: [
          {
            name: "url",
            label: "Instagram URL",
            placeholder: "https://www.instagram.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Apple Music",
        path: "/api/applemusic",
        method: "GET",
        description: "Apple Music Downloader",
        params: [
          {
            name: "url",
            label: "Apple Music URL",
            placeholder: "Masukkan URL...",
            required: true,
          },
        ],
      },
      {
        name: "CapCut",
        path: "/api/capcut",
        method: "GET",
        description: "CapCut Video Downloader",
        params: [
          {
            name: "url",
            label: "CapCut URL",
            placeholder: "https://www.capcut.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Douyin",
        path: "/api/douyin",
        method: "GET",
        description: "Douyin Downloader",
        params: [
          {
            name: "url",
            label: "Douyin URL",
            placeholder: "Masukkan URL Douyin...",
            required: true,
          },
        ],
      },
      {
        name: "DramaBox",
        path: "/api/dramabox",
        method: "GET",
        description: "DramaBox Downloader",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "Masukkan URL...",
            required: true,
          },
        ],
      },
      {
        name: "Facebook",
        path: "/api/facebook",
        method: "GET",
        description: "Facebook Video Downloader",
        params: [
          {
            name: "url",
            label: "Facebook URL",
            placeholder: "https://www.facebook.com/...",
            required: true,
          },
        ],
      },
      {
        name: "MediaFire",
        path: "/api/mediafire",
        method: "GET",
        description: "MediaFire Downloader",
        params: [
          {
            name: "url",
            label: "MediaFire URL",
            placeholder: "https://www.mediafire.com/...",
            required: true,
          },
        ],
      },
      {
        name: "Pinterest",
        path: "/api/pinterest",
        method: "GET",
        description: "Pinterest Downloader",
        params: [
          {
            name: "url",
            label: "Pinterest URL",
            placeholder: "https://pin.it/...",
            required: true,
          },
        ],
      },
      {
        name: "Spotify",
        path: "/api/spotify",
        method: "GET",
        description: "Spotify Downloader",
        params: [
          {
            name: "url",
            label: "Spotify URL",
            placeholder: "https://open.spotify.com/...",
            required: true,
          },
        ],
      },
      {
        name: "SoundCloud",
        path: "/api/soundcloud",
        method: "GET",
        description: "SoundCloud Downloader",
        params: [
          {
            name: "url",
            label: "SoundCloud URL",
            placeholder: "https://soundcloud.com/...",
            required: true,
          },
        ],
      },
      {
        name: "TikTok Slide",
        path: "/api/tiktokslide",
        method: "GET",
        description: "TikTok Photo / Slide Downloader",
        params: [
          {
            name: "url",
            label: "TikTok URL",
            placeholder: "https://www.tiktok.com/...",
            required: true,
          },
        ],
      },
      {
        name: "X",
        path: "/api/x",
        method: "GET",
        description: "X / Twitter Downloader",
        params: [
          {
            name: "url",
            label: "X URL",
            placeholder: "https://x.com/...",
            required: true,
          },
        ],
      },
      {
        name: "YT MP3",
        path: "/api/ytmp3",
        method: "GET",
        description: "YouTube MP3 Downloader",
        params: [
          {
            name: "url",
            label: "YouTube URL",
            placeholder: "https://youtube.com/watch?v=...",
            required: true,
          },
        ],
      },
      {
        name: "YT Play",
        path: "/api/ytplay",
        method: "GET",
        description: "YouTube Search / Play",
        params: [
          {
            name: "q",
            label: "Search",
            placeholder: "Nama lagu / video...",
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
    color: "blue",
    endpoints: [],
  },

  {
    id: "random",
    name: "RANDOM",
    icon: "◈",
    color: "violet",
    endpoints: [],
  },

  {
    id: "search",
    name: "SEARCH",
    icon: "⌕",
    color: "teal",
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
        name: "AICoder",
        path: "/api/aicoder",
        method: "GET",
        description: "AI Coding Assistant",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Jelaskan kode / buat kode...",
            required: true,
          },
        ],
      },
    ],
  },
];

/*
|--------------------------------------------------------------------------
| TOTAL
|--------------------------------------------------------------------------
*/

const totalEndpoints = categories.reduce(
  (total, category) => total + category.endpoints.length,
  0
);

/*
|--------------------------------------------------------------------------
| APP
|--------------------------------------------------------------------------
*/

export default function App() {
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState({});
  const [openEndpoint, setOpenEndpoint] = useState(null);

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [requestUrl, setRequestUrl] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FILTER
  |--------------------------------------------------------------------------
  */

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return categories;
    }

    return categories
      .map((category) => {
        const categoryMatch = category.name
          .toLowerCase()
          .includes(keyword);

        const endpointMatches = category.endpoints.filter((endpoint) => {
          return (
            endpoint.name.toLowerCase().includes(keyword) ||
            endpoint.path.toLowerCase().includes(keyword) ||
            endpoint.description.toLowerCase().includes(keyword)
          );
        });

        if (categoryMatch) {
          return category;
        }

        if (endpointMatches.length > 0) {
          return {
            ...category,
            endpoints: endpointMatches,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [search]);

  /*
  |--------------------------------------------------------------------------
  | CATEGORY TOGGLE
  |--------------------------------------------------------------------------
  */

  function toggleCategory(id) {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  /*
  |--------------------------------------------------------------------------
  | ENDPOINT TOGGLE
  |--------------------------------------------------------------------------
  */

  function toggleEndpoint(categoryId, endpointIndex) {
    const key = `${categoryId}-${endpointIndex}`;

    setOpenEndpoint((prev) => (prev === key ? null : key));

    setResponse(null);
    setResponseText("");
    setRequestUrl("");
    setStatusCode(null);
    setError("");
  }

  /*
  |--------------------------------------------------------------------------
  | INPUT
  |--------------------------------------------------------------------------
  */

  function updateValue(path, parameter, value) {
    setValues((prev) => ({
      ...prev,
      [`${path}:${parameter}`]: value,
    }));
  }

  function getValue(path, parameter) {
    return values[`${path}:${parameter}`] || "";
  }

  /*
  |--------------------------------------------------------------------------
  | CLEAR
  |--------------------------------------------------------------------------
  */

  function clearEndpoint(endpoint) {
    const cleared = { ...values };

    endpoint.params?.forEach((param) => {
      delete cleared[`${endpoint.path}:${param.name}`];
    });

    setValues(cleared);

    setResponse(null);
    setResponseText("");
    setRequestUrl("");
    setStatusCode(null);
    setError("");
  }

  /*
  |--------------------------------------------------------------------------
  | EXECUTE
  |--------------------------------------------------------------------------
  */

  async function executeEndpoint(endpoint) {
    setLoading(true);
    setResponse(null);
    setResponseText("");
    setError("");
    setStatusCode(null);

    try {
      const params = endpoint.params || [];

      const missing = params.find((param) => {
        if (!param.required) return false;

        const value = getValue(endpoint.path, param.name);

        return !value.trim();
      });

      if (missing) {
        setError(`${missing.label || missing.name} wajib diisi.`);
        setLoading(false);
        return;
      }

      let url = `${API_BASE}${endpoint.path}`;

      /*
      |--------------------------------------------------------------------------
      | GET
      |--------------------------------------------------------------------------
      */

      if (endpoint.method === "GET") {
        const query = new URLSearchParams();

        params.forEach((param) => {
          const value = getValue(endpoint.path, param.name);

          if (value) {
            query.append(param.name, value);
          }
        });

        const queryString = query.toString();

        if (queryString) {
          url += `?${queryString}`;
        }
      }

      setRequestUrl(url);

      const options = {
        method: endpoint.method,
        headers: {
          Accept: "application/json",
        },
      };

      /*
      |--------------------------------------------------------------------------
      | POST
      |--------------------------------------------------------------------------
      */

      if (endpoint.method === "POST") {
        options.headers["Content-Type"] = "application/json";

        const body = {};

        params.forEach((param) => {
          body[param.name] = getValue(
            endpoint.path,
            param.name
          );
        });

        options.body = JSON.stringify(body);
      }

      const res = await fetch(url, options);

      setStatusCode(res.status);

      const contentType =
        res.headers.get("content-type") || "";

      const text = await res.text();

      let parsed;

      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }

      /*
      |--------------------------------------------------------------------------
      | JSON RESPONSE
      |--------------------------------------------------------------------------
      */

      if (parsed !== null) {
        setResponse(parsed);
        setResponseText(
          JSON.stringify(parsed, null, 2)
        );
      } else {
        setResponse(null);
        setResponseText(text || "Empty response");
      }

      if (!res.ok) {
        setError(
          `Request gagal dengan HTTP ${res.status}${
            contentType
              ? ` (${contentType})`
              : ""
          }`
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Tidak dapat terhubung ke server."
      );

      setResponseText(
        JSON.stringify(
          {
            status: false,
            message:
              err?.message ||
              "Network error",
          },
          null,
          2
        )
      );
    } finally {
      setLoading(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | COPY
  |--------------------------------------------------------------------------
  */

  async function copyText(text) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  }

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  function getStatusClass() {
    if (!statusCode) return "";

    if (statusCode >= 200 && statusCode < 300) {
      return "success";
    }

    if (statusCode >= 400) {
      return "danger";
    }

    return "warning";
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="app">

      {/* BACKGROUND */}
      <div className="bg-grid" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      {/* HEADER */}
      <header className="topbar">

        <div className="brand">

          <div className="brand-logo">
            D
          </div>

          <div>
            <div className="brand-name">
              DINSTORE API
            </div>

            <div className="brand-sub">
              Developer Documentation
            </div>
          </div>

        </div>

        <div className="version">
          v1.0.0
        </div>

      </header>

      {/* HERO */}
      <main className="container">

        <section className="hero">

          <div className="hero-badge">
            <span className="pulse-dot" />
            REST API
          </div>

          <h1>
            DINSTORE
            <span> API</span>
          </h1>

          <p>
            API downloader, AI dan tools
            untuk kebutuhan aplikasi kamu.
          </p>

          <div className="system-status">

            <div className="status-light" />

            <div>
              <strong>
                All Systems Operational
              </strong>

              <span>
                Server berjalan normal
              </span>
            </div>

          </div>

        </section>

        {/* STATS */}
        <section className="stats">

          <div className="stat-card">
            <span> CATEGORIES </span>
            <strong>{categories.length}</strong>
          </div>

          <div className="stat-card">
            <span> ENDPOINTS </span>
            <strong>{totalEndpoints}</strong>
          </div>

        </section>

        {/* SEARCH */}
        <section className="search-box">

          <span className="search-icon">
            ⌕
          </span>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search endpoint or category..."
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}

        </section>

        {/* CATEGORIES */}
        <section className="categories">

          {filteredCategories.length === 0 && (
            <div className="empty-search">
              <div>⌕</div>

              <h3>
                Endpoint tidak ditemukan
              </h3>

              <p>
                Coba gunakan kata kunci lain.
              </p>
            </div>
          )}

          {filteredCategories.map((category) => {

            const isOpen =
              openCategories[category.id];

            return (
              <div
                className={`category ${isOpen ? "opened" : ""}`}
                key={category.id}
              >

                {/* CATEGORY HEADER */}
                <button
                  className={`category-header ${category.color}`}
                  onClick={() =>
                    toggleCategory(category.id)
                  }
                >

                  <div className="category-left">

                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <span>
                      {category.name}
                    </span>

                  </div>

                  <div className="category-right">

                    <span className="endpoint-count">
                      {category.endpoints.length} EP
                    </span>

                    <span
                      className={`arrow ${
                        isOpen ? "rotate" : ""
                      }`}
                    >
                      ⌄
                    </span>

                  </div>

                </button>

                {/* ENDPOINTS */}
                {isOpen && (
                  <div className="endpoint-list">

                    {category.endpoints.length === 0 ? (

                      <div className="empty-category">
                        <span>COMING SOON</span>

                        <p>
                          Endpoint kategori ini
                          sedang dikembangkan.
                        </p>
                      </div>

                    ) : (

                      category.endpoints.map(
                        (endpoint, index) => {

                          const endpointKey =
                            `${category.id}-${index}`;

                          const isEndpointOpen =
                            openEndpoint ===
                            endpointKey;

                          return (
                            <div
                              className={`endpoint ${
                                isEndpointOpen
                                  ? "endpoint-open"
                                  : ""
                              }`}
                              key={endpointKey}
                            >

                              {/* ENDPOINT HEADER */}
                              <button
                                className="endpoint-header"
                                onClick={() =>
                                  toggleEndpoint(
                                    category.id,
                                    index
                                  )
                                }
                              >

                                <div className="endpoint-info">

                                  <span
                                    className={`method ${endpoint.method.toLowerCase()}`}
                                  >
                                    {endpoint.method}
                                  </span>

                                  <div>
                                    <strong>
                                      {endpoint.path}
                                    </strong>

                                    <small>
                                      {endpoint.name}
                                    </small>
                                  </div>

                                </div>

                                <span
                                  className={`endpoint-arrow ${
                                    isEndpointOpen
                                      ? "rotate"
                                      : ""
                                  }`}
                                >
                                  ⌄
                                </span>

                              </button>

                              {/* TESTER */}
                              {isEndpointOpen && (

                                <div className="tester">

                                  <div className="endpoint-title">

                                    <div>
                                      <h3>
                                        {endpoint.name}
                                      </h3>

                                      <p>
                                        {
                                          endpoint.description
                                        }
                                      </p>
                                    </div>

                                    <span className="method-large">
                                      {endpoint.method}
                                    </span>

                                  </div>

                                  {/* PARAMETERS */}
                                  {endpoint.params?.length >
                                    0 && (

                                    <div className="parameters">

                                      <div className="section-label">
                                        PARAMETERS
                                      </div>

                                      {endpoint.params.map(
                                        (param) => (

                                          <div
                                            className="parameter"
                                            key={param.name}
                                          >

                                            <label>

                                              <span>
                                                {
                                                  param.label ||
                                                  param.name
                                                }
                                              </span>

                                              {param.required && (
                                                <em>
                                                  required
                                                </em>
                                              )}

                                            </label>

                                            <input
                                              value={getValue(
                                                endpoint.path,
                                                param.name
                                              )}
                                              onChange={(e) =>
                                                updateValue(
                                                  endpoint.path,
                                                  param.name,
                                                  e.target.value
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

                                  {/* ACTIONS */}
                                  <div className="actions">

                                    <button
                                      className="execute"
                                      onClick={() =>
                                        executeEndpoint(
                                          endpoint
                                        )
                                      }
                                      disabled={loading}
                                    >

                                      {loading ? (
                                        <>
                                          <span className="spinner" />
                                          PROCESSING
                                        </>
                                      ) : (
                                        <>
                                          ▶ EXECUTE
                                        </>
                                      )}

                                    </button>

                                    <button
                                      className="clear-btn"
                                      onClick={() =>
                                        clearEndpoint(
                                          endpoint
                                        )
                                      }
                                    >
                                      ↻ CLEAR
                                    </button>

                                  </div>

                                  {/* REQUEST */}
                                  {requestUrl && (
                                    <div className="response-section">

                                      <div className="response-heading">

                                        <div>
                                          <span className="section-label">
                                            REQUEST URL
                                          </span>
                                        </div>

                                        <button
                                          onClick={() =>
                                            copyText(
                                              requestUrl
                                            )
                                          }
                                        >
                                          COPY
                                        </button>

                                      </div>

                                      <div className="url-box">
                                        {requestUrl}
                                      </div>

                                    </div>
                                  )}

                                  {/* STATUS */}
                                  {statusCode && (
                                    <div className="http-status">

                                      <span>
                                        HTTP STATUS
                                      </span>

                                      <strong
                                        className={
                                          getStatusClass()
                                        }
                                      >
                                        {statusCode}
                                      </strong>

                                    </div>
                                  )}

                                  {/* ERROR */}
                                  {error && (
                                    <div className="error-box">

                                      <div className="error-icon">
                                        !
                                      </div>

                                      <div>
                                        <strong>
                                          Request Error
                                        </strong>

                                        <p>
                                          {error}
                                        </p>
                                      </div>

                                    </div>
                                  )}

                                  {/* RESPONSE */}
                                  {(responseText ||
                                    response) && (

                                    <div className="response-section">

                                      <div className="response-heading">

                                        <span className="section-label">
                                          RESPONSE
                                        </span>

                                        <button
                                          onClick={() =>
                                            copyText(
                                              responseText
                                            )
                                          }
                                        >
                                          COPY JSON
                                        </button>

                                      </div>

                                      <pre className="json-viewer">
                                        {responseText}
                                      </pre>

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

              </div>
            );
          })}

        </section>

      </main>

      {/* FOOTER */}
      <footer>

        <div className="footer-line" />

        <div className="footer-content">

          <strong>
            DINSTORE
          </strong>

          <span>
            API Documentation
          </span>

          <span>
            © 2026 DINSTORE
          </span>

        </div>

      </footer>

      {/* FLOATING BUTTON */}
      <button
        className="floating-button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        ↑
      </button>

    </div>
  );
}
