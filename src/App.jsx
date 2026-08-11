import { useMemo, useState } from "react";

const API_BASE = "";

const AI_FEATURES = [
  {
    id: "aiko",
    name: "Aiko",
    category: "AI",
    endpoint: "/api/ai/aiko",
    description: "AI assistant untuk percakapan."
  },
  {
    id: "aicoder",
    name: "AI Coder",
    category: "AI",
    endpoint: "/api/tools/aicoder",
    description: "AI untuk membantu membuat dan menjelaskan kode."
  },
  {
    id: "lyricsgen",
    name: "LyricsGen",
    category: "AI",
    endpoint: "/api/ai/lyricsgen",
    description: "Membuat lirik menggunakan AI."
  },
  {
    id: "ai4chat",
    name: "AI4Chat",
    category: "AI",
    endpoint: "/api/ai/ai4chat",
    description: "AI chat."
  },
  {
    id: "azbryai",
    name: "Azbry AI",
    category: "AI",
    endpoint: "/api/ai/azbryai",
    description: "AI assistant."
  },
  {
    id: "chatday",
    name: "ChatDay",
    category: "AI",
    endpoint: "/api/ai/chatday",
    description: "AI conversation."
  },
  {
    id: "chatmusic",
    name: "ChatMusic",
    category: "AI",
    endpoint: "/api/ai/chatmusic",
    description: "AI untuk kebutuhan musik."
  },
  {
    id: "claude",
    name: "Claude",
    category: "AI",
    endpoint: "/api/ai/claude",
    description: "AI assistant."
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    category: "AI",
    endpoint: "/api/ai/deepseek",
    description: "AI assistant."
  },
  {
    id: "oriper",
    name: "Oriper",
    category: "AI",
    endpoint: "/api/ai/oriper",
    description: "AI assistant."
  },
  {
    id: "generateprompt",
    name: "Generate Prompt",
    category: "AI",
    endpoint: "/api/ai/generateprompt",
    description: "Membuat prompt dengan AI."
  },
  {
    id: "pollinations",
    name: "Pollinations",
    category: "AI",
    endpoint: "/api/ai/pollinations",
    description: "AI generation."
  },
  {
    id: "gpt4o",
    name: "GPT-4o",
    category: "AI",
    endpoint: "/api/ai/gpt4o",
    description: "AI assistant."
  },
  {
    id: "gptfree",
    name: "GPT Free",
    category: "AI",
    endpoint: "/api/ai/gptfree",
    description: "AI assistant."
  },
  {
    id: "iask",
    name: "iAsk",
    category: "AI",
    endpoint: "/api/ai/iask",
    description: "AI question answering."
  },
  {
    id: "imagegen",
    name: "ImageGen",
    category: "AI",
    endpoint: "/api/ai/imagegen",
    description: "AI image generation."
  },
  {
    id: "ustadz",
    name: "Ustadz",
    category: "AI",
    endpoint: "/api/ai/ustadz",
    description: "AI assistant."
  },
  {
    id: "qwen",
    name: "Qwen",
    category: "AI",
    endpoint: "/api/ai/qwen",
    description: "AI assistant."
  },
  {
    id: "text2img",
    name: "Text2Img",
    category: "AI",
    endpoint: "/api/ai/text2img",
    description: "Mengubah teks menjadi gambar."
  }
];

function App() {
  const [selected, setSelected] = useState(AI_FEATURES[0]);
  const [search, setSearch] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const filteredFeatures = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return AI_FEATURES;

    return AI_FEATURES.filter((item) =>
      `${item.name} ${item.endpoint} ${item.description}`
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  function selectFeature(feature) {
    setSelected(feature);
    setResult(null);
    setError("");
  }

  async function testAPI() {
    if (!prompt.trim()) {
      setError("Masukkan prompt terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const url = new URL(
        `${API_BASE}${selected.endpoint}`,
        window.location.origin
      );

      url.searchParams.set("prompt", prompt.trim());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Server tidak mengirim JSON. Response: ${text.slice(0, 300)}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Request gagal (${response.status})`
        );
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  function copyEndpoint() {
    navigator.clipboard?.writeText(selected.endpoint);
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">D</div>

          <div>
            <div className="brand-name">DINSTORE</div>
            <div className="brand-subtitle">AI API PLATFORM</div>
          </div>
        </div>

        <div className="top-status">
          <span className="status-dot" />
          API ONLINE
        </div>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <div className="sidebar-heading">
            <span>AI SERVICES</span>
            <span className="count">{AI_FEATURES.length}</span>
          </div>

          <div className="search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari fitur..."
            />
          </div>

          <div className="feature-list">
            {filteredFeatures.map((feature) => (
              <button
                key={feature.id}
                className={`feature-item ${
                  selected.id === feature.id ? "active" : ""
                }`}
                onClick={() => selectFeature(feature)}
              >
                <span className="feature-icon">✦</span>

                <span className="feature-info">
                  <strong>{feature.name}</strong>
                  <small>{feature.endpoint}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="content">
          <div className="hero">
            <div className="eyebrow">DINSTORE / AI</div>

            <h1>
              AI API
              <span> Platform</span>
            </h1>

            <p>
              Gunakan berbagai layanan AI melalui satu platform API
              DINSTORE.
            </p>
          </div>

          <div className="endpoint-card">
            <div className="endpoint-header">
              <div>
                <div className="label">SELECTED ENDPOINT</div>
                <h2>{selected.name}</h2>
              </div>

              <button
                className="copy-button"
                onClick={copyEndpoint}
                title="Copy endpoint"
              >
                Copy
              </button>
            </div>

            <div className="endpoint-url">
              <span className="method">GET</span>
              <code>{selected.endpoint}</code>
            </div>

            <p className="description">
              {selected.description}
            </p>
          </div>

          <div className="tester-card">
            <div className="card-title">
              <div>
                <span className="label">API TESTER</span>
                <h2>Test {selected.name}</h2>
              </div>

              <span className="live-badge">LIVE</span>
            </div>

            <label htmlFor="prompt">Prompt</label>

            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Tulis prompt untuk ${selected.name}...`}
            />

            <div className="action-row">
              <button
                className="send-button"
                onClick={testAPI}
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Request"}
                <span>→</span>
              </button>

              <button
                className="clear-button"
                onClick={() => {
                  setPrompt("");
                  setResult(null);
                  setError("");
                }}
              >
                Clear
              </button>
            </div>

            {error && (
              <div className="error-box">
                <strong>Request Error</strong>
                <pre>{error}</pre>
              </div>
            )}

            {result && (
              <div className="result-box">
                <div className="result-header">
                  <span>RESPONSE</span>
                  <span className="success-badge">SUCCESS</span>
                </div>

                <pre>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <footer className="footer">
            <span>DINSTORE AI</span>
            <span>•</span>
            <span>API Platform</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
