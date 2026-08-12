import React, { useMemo, useState } from "react";
import "./style.css";

/*
|--------------------------------------------------------------------------
| DINSTORE API PLAYGROUND
|--------------------------------------------------------------------------
| Frontend documentation + endpoint tester
|
| Semua request frontend diarahkan ke:
|   /api/...
|
| Contoh:
|   /api/tiktok
|   /api/instagram
|   /api/download/capcut
|
|--------------------------------------------------------------------------
*/

const API_CATEGORIES = [
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
            label: "Question",
            placeholder: "Halo, siapa kamu?",
            required: true,
          },
        ],
      },
      {
        name: "Lyrics Generator",
        path: "/api/ai/lyricsgen",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Buat lirik lagu tentang persahabatan",
            required: true,
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
            placeholder: "Tulis pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Azbry AI",
        path: "/api/ai/azbryai",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pesan...",
            required: true,
          },
        ],
      },
      {
        name: "ChatDay",
        path: "/api/ai/chatday",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pesan...",
            required: true,
          },
        ],
      },
      {
        name: "Chat Music",
        path: "/api/ai/chatmusic",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pesan...",
            required: true,
          },
        ],
      },
      {
        name: "Claude AI",
        path: "/api/ai/claude",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pesan...",
            required: true,
          },
        ],
      },
      {
        name: "DeepSeek AI",
        path: "/api/ai/deepseek",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pesan...",
            required: true,
          },
        ],
      },
      {
        name: "Oriper AI",
        path: "/api/ai/oriper",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pesan...",
            required: true,
          },
        ],
      },
      {
        name: "Generate Prompt",
        path: "/api/ai/generateprompt",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Buat prompt...",
            required: true,
          },
        ],
      },
      {
        name: "Pollinations AI",
        path: "/api/ai/pollinations",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Tulis prompt...",
            required: true,
          },
        ],
      },
      {
        name: "GPT-4o",
        path: "/api/ai/gpt4o",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "GPT Free",
        path: "/api/ai/gptfree",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "IAsk AI",
        path: "/api/ai/iask",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Image Generator",
        path: "/api/ai/imagegen",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "A futuristic city...",
            required: true,
          },
        ],
      },
      {
        name: "Ustadz AI",
        path: "/api/ai/ustadz",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Qwen AI",
        path: "/api/ai/qwen",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Question",
            placeholder: "Tulis pertanyaan...",
            required: true,
          },
        ],
      },
      {
        name: "Text2Img",
        path: "/api/ai/text2img",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "A beautiful landscape...",
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
    color: "pink",
    endpoints: [
      {
        name: "Admin Status",
        path: "/api/admin/status",
        method: "GET",
        params: [],
      },
      {
        name: "Admin Info",
        path: "/api/admin/info",
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
        name: "PlayRelay Cache",
        path: "/api/cache/playrelay",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "timeless",
            required: true,
          },
        ],
      },
      {
        name: "Cache Status",
        path: "/api/cache/status",
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
        path: "/api/download/tiktok",
        method: "GET",
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
        path: "/api/download/instagram",
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
        name: "CapCut Downloader",
        path: "/api/download/capcut",
        method: "GET",
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
        name: "DramaBox Downloader",
        path: "/api/download/dramabox",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "DramaBox URL",
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
      {
        name: "Pinterest Downloader",
        path: "/api/download/pinterest",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "Pinterest URL",
            required: true,
          },
        ],
      },
      {
        name: "Spotify Downloader",
        path: "/api/download/spotify",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "Spotify URL",
            required: true,
          },
        ],
      },
      {
        name: "SoundCloud Downloader",
        path: "/api/download/soundcloud",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "SoundCloud URL",
            required: true,
          },
        ],
      },
      {
        name: "TikTok Slide",
        path: "/api/download/tiktokslide",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "TikTok URL",
            required: true,
          },
        ],
      },
      {
        name: "X Downloader",
        path: "/api/download/x",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "X/Twitter URL",
            required: true,
          },
        ],
      },
      {
        name: "YouTube MP3",
        path: "/api/download/ytmp3",
        method: "GET",
        params: [
          {
            name: "url",
            label: "URL",
            placeholder: "YouTube URL",
            required: true,
          },
        ],
      },
      {
        name: "YouTube Play",
        path: "/api/download/ytplay",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Search / URL",
            placeholder: "Timeless atau YouTube URL",
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
    endpoints: [
      {
        name: "Fun Random",
        path: "/api/fun/random",
        method: "GET",
        params: [],
      },
    ],
  },

  {
    id: "leaderboard",
    name: "LEADERBOARD",
    icon: "♛",
    color: "yellow",
    endpoints: [
      {
        name: "Leaderboard",
        path: "/api/leaderboard",
        method: "GET",
        params: [],
      },
    ],
  },

  {
    id: "library",
    name: "LIBRARY",
    icon: "▤",
    color: "orange",
    endpoints: [
      {
        name: "Library Search",
        path: "/api/library/search",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "Cari...",
            required: true,
          },
        ],
      },
    ],
  },

  {
    id: "maker",
    name: "MAKER",
    icon: "✺",
    color: "pink",
    endpoints: [
      {
        name: "Code To Image",
        path: "/api/maker/code2img",
        method: "POST",
        params: [
          {
            name: "code",
            label: "Code",
            placeholder: "console.log('Hello World')",
            required: true,
            type: "textarea",
          },
          {
            name: "lang",
            label: "Language",
            placeholder: "javascript",
            required: false,
          },
          {
            name: "title",
            label: "Title",
            placeholder: "terminal",
            required: false,
          },
          {
            name: "mode",
            label: "Mode",
            placeholder: "code",
            required: false,
          },
        ],
      },
    ],
  },

  {
    id: "news",
    name: "NEWS",
    icon: "▥",
    color: "cyan",
    endpoints: [
      {
        name: "Latest News",
        path: "/api/news",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "technology",
            required: false,
          },
        ],
      },
    ],
  },

  {
    id: "random",
    name: "RANDOM",
    icon: "❖",
    color: "purple",
    endpoints: [
      {
        name: "Random Image",
        path: "/api/random/image",
        method: "GET",
        params: [],
      },
      {
        name: "Random Quote",
        path: "/api/random/quote",
        method: "GET",
        params: [],
      },
      {
        name: "Random Fact",
        path: "/api/random/fact",
        method: "GET",
        params: [],
      },
    ],
  },

  {
    id: "search",
    name: "SEARCH",
    icon: "⌕",
    color: "green",
    endpoints: [
      {
        name: "Web Search",
        path: "/api/search",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Query",
            placeholder: "OpenAI",
            required: true,
          },
        ],
      },
    ],
  },

  {
    id: "stalk",
    name: "STALK",
    icon: "◉",
    color: "purple",
    endpoints: [
      {
        name: "TikTok Stalk",
        path: "/api/stalk/tiktok",
        method: "GET",
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

  {
    id: "tools",
    name: "TOOLS",
    icon: "⌁",
    color: "orange",
    endpoints: [
      {
        name: "AI Coder",
        path: "/api/tools/aicoder",
        method: "GET",
        params: [
          {
            name: "q",
            label: "Prompt",
            placeholder: "Buatkan kode React...",
            required: true,
          },
        ],
      },
      {
        name: "QRIS Generator",
        path: "/api/tools/qrisgen",
        method: "GET",
        params: [
          {
            name: "url",
            label: "QRIS Image URL",
            placeholder: "https://...",
            required: true,
          },
          {
            name: "nominal",
            label: "Nominal",
            placeholder: "10000",
            required: true,
          },
        ],
      },
    ],
  },
];

function formatJson(data) {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

function buildQuery(params, values) {
  const search = new URLSearchParams();

  params.forEach((param) => {
    const value = values[param.name];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      search.set(param.name, value);
    }
  });

  return search.toString();
}

function EndpointTester({ endpoint }) {
  const [values, setValues] = useState({});
  const [response, setResponse] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [headers, setHeaders] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [elapsed, setElapsed] = useState(null);

  const requestUrl = useMemo(() => {
    const query = buildQuery(endpoint.params || [], values);

    return query
      ? `${endpoint.path}?${query}`
      : endpoint.path;
  }, [endpoint, values]);

  const curl = useMemo(() => {
    const method = endpoint.method || "GET";

    if (method === "GET") {
      return `curl -X GET "${window.location.origin}${requestUrl}"`;
    }

    return `curl -X ${method} "${window.location.origin}${endpoint.path}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(values, null, 2)}'`;
  }, [endpoint, requestUrl, values]);

  async function executeRequest() {
    for (const param of endpoint.params || []) {
      if (
        param.required &&
        !String(values[param.name] || "").trim()
      ) {
        setResponse({
          status: false,
          message: `${param.label || param.name} wajib diisi.`,
        });
        setResponseText("");
        return;
      }
    }

    setLoading(true);
    setResponse(null);
    setResponseText("");
    setHeaders({});
    setElapsed(null);

    const started = performance.now();

    try {
      let res;

      if (endpoint.method === "POST") {
        res = await fetch(endpoint.path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        res = await fetch(requestUrl, {
          method: "GET",
        });
      }

      const time = Math.round(performance.now() - started);
      setElapsed(time);

      const headerObject = {};

      res.headers.forEach((value, key) => {
        headerObject[key] = value;
      });

      setHeaders(headerObject);

      const contentType =
        res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await res.json();

        setResponse(data);
        setResponseText(formatJson(data));
      } else {
        const text = await res.text();

        setResponse({
          status: res.ok,
          statusCode: res.status,
          response: text,
        });

        setResponseText(text);
      }
    } catch (error) {
      setElapsed(Math.round(performance.now() - started));

      const errorData = {
        status: false,
        message: error.message || "Request gagal.",
      };

      setResponse(errorData);
      setResponseText(formatJson(errorData));
    } finally {
      setLoading(false);
    }
  }

  function clearTester() {
    setValues({});
    setResponse(null);
    setResponseText("");
    setHeaders({});
    setElapsed(null);
    setActiveTab("preview");
  }

  async function copyCurl() {
    try {
      await navigator.clipboard.writeText(curl);
    } catch {
      // ignore
    }
  }

  return (
    <div className="tester">
      <div className="tester-description">
        Test endpoint <strong>{endpoint.name}</strong> langsung
        dari playground.
      </div>

      <div className="method-switch">
        <button
          className={
            endpoint.method === "GET"
              ? "method-button active"
              : "method-button"
          }
        >
          GET
        </button>

        {endpoint.method === "POST" && (
          <button className="method-button active-post">
            POST
          </button>
        )}
      </div>

      <div className="request-title">
        REQUEST PARAMETERS
      </div>

      <div className="params">
        {(endpoint.params || []).length === 0 ? (
          <div className="no-params">
            Endpoint ini tidak membutuhkan parameter.
          </div>
        ) : (
          endpoint.params.map((param) => (
            <label className="param" key={param.name}>
              <span>
                {param.label || param.name}
                {param.required && (
                  <b className="required">*</b>
                )}
              </span>

              {param.type === "textarea" ? (
                <textarea
                  value={values[param.name] || ""}
                  placeholder={param.placeholder || ""}
                  onChange={(e) =>
                    setValues((old) => ({
                      ...old,
                      [param.name]: e.target.value,
                    }))
                  }
                />
              ) : (
                <input
                  value={values[param.name] || ""}
                  placeholder={param.placeholder || ""}
                  onChange={(e) =>
                    setValues((old) => ({
                      ...old,
                      [param.name]: e.target.value,
                    }))
                  }
                />
              )}
            </label>
          ))
        )}
      </div>

      <div className="request-preview">
        <span>REQUEST</span>
        <code>{requestUrl}</code>
      </div>

      <button
        className="execute-button"
        onClick={executeRequest}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner" />
            PROCESSING...
          </>
        ) : (
          <>▶ EXECUTE REQUEST</>
        )}
      </button>

      <button
        className="clear-button"
        onClick={clearTester}
      >
        ↻ CLEAR
      </button>

      {response !== null && (
        <div className="response-box">
          <div className="response-top">
            <div className="response-tabs">
              <button
                className={
                  activeTab === "preview"
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab("preview")}
              >
                PREVIEW
              </button>

              <button
                className={
                  activeTab === "headers"
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab("headers")}
              >
                HEADERS
              </button>

              <button
                className={
                  activeTab === "curl"
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab("curl")}
              >
                CURL
              </button>
            </div>

            <div className="response-status">
              <span
                className={
                  response?.status === false
                    ? "error-status"
                    : "success-status"
                }
              >
                {response?.status === false
                  ? "ERROR"
                  : "SUCCESS"}
              </span>

              {elapsed !== null && (
                <small>{elapsed}ms</small>
              )}
            </div>
          </div>

          <div className="response-content">
            {activeTab === "preview" && (
              <pre>
                {responseText || formatJson(response)}
              </pre>
            )}

            {activeTab === "headers" && (
              <pre>
                {formatJson(headers)}
              </pre>
            )}

            {activeTab === "curl" && (
              <>
                <button
                  className="copy-button"
                  onClick={copyCurl}
                >
                  COPY
                </button>

                <pre>{curl}</pre>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  open,
  onToggle,
  selectedEndpoint,
  setSelectedEndpoint,
}) {
  return (
    <section
      id={`category-${category.id}`}
      className={`category-card ${
        open ? "category-open" : ""
      }`}
    >
      <button
        className="category-header"
        onClick={onToggle}
      >
        <div className={`category-icon ${category.color}`}>
          {category.icon}
        </div>

        <div className="category-info">
          <h2>{category.name}</h2>
          <span>
            {category.endpoints.length} ENDPOINT
            {category.endpoints.length !== 1
              ? "S"
              : ""}
          </span>
        </div>

        <span className="category-chevron">
          {open ? "⌃" : "⌄"}
        </span>
      </button>

      {open && (
        <div className="endpoint-list">
          {category.endpoints.map((endpoint) => {
            const selected =
              selectedEndpoint?.path === endpoint.path;

            return (
              <div
                className={`endpoint-wrapper ${
                  selected ? "selected" : ""
                }`}
                key={endpoint.path}
              >
                <button
                  className="endpoint-row"
                  onClick={() =>
                    setSelectedEndpoint(
                      selected ? null : endpoint
                    )
                  }
                >
                  <span className="endpoint-method">
                    {endpoint.method}
                  </span>

                  <div className="endpoint-text">
                    <strong>{endpoint.name}</strong>
                    <span>{endpoint.path}</span>
                  </div>

                  <span className="endpoint-open">
                    {selected ? "⌃" : "→"}
                  </span>
                </button>

                {selected && (
                  <EndpointTester
                    endpoint={endpoint}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState({
    download: true,
  });
  const [selectedEndpoint, setSelectedEndpoint] =
    useState(null);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return API_CATEGORIES;

    return API_CATEGORIES.map((category) => {
      const categoryMatch =
        category.name.toLowerCase().includes(query);

      const endpoints = category.endpoints.filter(
        (endpoint) =>
          endpoint.name.toLowerCase().includes(query) ||
          endpoint.path.toLowerCase().includes(query)
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
    }).filter(Boolean);
  }, [search]);

  const totalEndpoints = API_CATEGORIES.reduce(
    (total, category) =>
      total + category.endpoints.length,
    0
  );

  function toggleCategory(id) {
    setOpenCategories((old) => ({
      ...old,
      [id]: !old[id],
    }));

    setSelectedEndpoint(null);
  }

  function scrollToCategory(id) {
    const element = document.getElementById(
      `category-${id}`
    );

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpenCategories((old) => ({
      ...old,
      [id]: true,
    }));
  }

  return (
    <div className="app">
      <div className="particles">
        {Array.from({ length: 45 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61) % 100}%`,
              animationDelay: `${(i % 10) * 0.7}s`,
              animationDuration: `${
                7 + (i % 8)
              }s`,
            }}
          />
        ))}
      </div>

      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">D</div>

          <div>
            <strong>DINSTORE API</strong>
            <span>Developer Playground</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="header-button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            ☀
          </button>

          <button
            className="header-button"
            onClick={() =>
              document
                .querySelector(".category-card")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            ☰
          </button>
        </div>
      </header>

      <nav className="nav">
        {[
          "random",
          "search",
          "stalk",
          "tools",
          "download",
          "ai",
        ].map((id) => (
          <button
            key={id}
            onClick={() => scrollToCategory(id)}
          >
            {id.toUpperCase()}
          </button>
        ))}
      </nav>

      <main className="main">
        <section className="hero">
          <div className="online-pill">
            <span />
            API SYSTEM ONLINE
          </div>

          <h1>
            DINSTORE <em>API</em>
          </h1>

          <p>
            API downloader, AI, tools, search dan
            utilities untuk kebutuhan aplikasi kamu.
          </p>

          <div className="stats">
            <div>
              <strong>{API_CATEGORIES.length}</strong>
              <span>CATEGORIES</span>
            </div>

            <div>
              <strong>{totalEndpoints}</strong>
              <span>ENDPOINTS</span>
            </div>

            <div>
              <strong>JSON</strong>
              <span>RESPONSE</span>
            </div>
          </div>
        </section>

        <div className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search endpoint atau category..."
          />

          {search && (
            <button
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="categories">
          {filteredCategories.length === 0 ? (
            <div className="empty">
              <strong>Endpoint tidak ditemukan</strong>
              <span>
                Coba cari nama endpoint atau path
                lainnya.
              </span>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                open={
                  !!openCategories[category.id] ||
                  search.length > 0
                }
                onToggle={() =>
                  toggleCategory(category.id)
                }
                selectedEndpoint={
                  selectedEndpoint
                }
                setSelectedEndpoint={
                  setSelectedEndpoint
                }
              />
            ))
          )}
        </div>

        <footer>
          <strong>DINSTORE API</strong>
          <span>
            Developer Playground • JSON REST API
          </span>
        </footer>
      </main>
    </div>
  );
}
