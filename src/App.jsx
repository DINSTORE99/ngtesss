import { useMemo, useState } from "react";

import {
  Bot,
  Code2,
  Image,
  Music,
  Search,
  Send,
  Sparkles,
  WandSparkles,
  Menu,
  X,
  Copy,
  Check,
  Loader2
} from "lucide-react";

const API_BASE = "";

const AI_LIST = [
  {
    id: "aiko",
    name: "Aiko",
    category: "AI Chat",
    endpoint: "/api/ai/aiko",
    icon: Bot,
    description: "AI assistant untuk percakapan."
  },
  {
    id: "aicoder",
    name: "AICoder",
    category: "Coding",
    endpoint: "/api/tools/aicoder",
    icon: Code2,
    description: "AI untuk membantu membuat dan memperbaiki kode."
  },
  {
    id: "lyricsgen",
    name: "LyricsGen",
    category: "Music",
    endpoint: "/api/ai/lyricsgen",
    icon: Music,
    description: "Generate lirik menggunakan AI."
  },
  {
    id: "ai4chat",
    name: "AI4Chat",
    category: "AI Chat",
    endpoint: "/api/ai/ai4chat",
    icon: Bot,
    description: "AI chat."
  },
  {
    id: "azbryai",
    name: "AzbryAI",
    category: "AI Chat",
    endpoint: "/api/ai/azbryai",
    icon: Sparkles,
    description: "AI assistant."
  },
  {
    id: "chatday",
    name: "ChatDay",
    category: "AI Chat",
    endpoint: "/api/ai/chatday",
    icon: Bot,
    description: "AI conversation."
  },
  {
    id: "chatmusic",
    name: "ChatMusic",
    category: "Music",
    endpoint: "/api/ai/chatmusic",
    icon: Music,
    description: "AI untuk kebutuhan musik."
  },
  {
    id: "claude",
    name: "Claude",
    category: "AI Chat",
    endpoint: "/api/ai/claude",
    icon: Bot,
    description: "AI assistant."
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    category: "AI Chat",
    endpoint: "/api/ai/deepseek",
    icon: Bot,
    description: "AI assistant."
  },
  {
    id: "oriper",
    name: "Oriper",
    category: "AI Chat",
    endpoint: "/api/ai/oriper",
    icon: Sparkles,
    description: "AI assistant."
  },
  {
    id: "generateprompt",
    name: "Generate Prompt",
    category: "AI Tools",
    endpoint: "/api/ai/generateprompt",
    icon: WandSparkles,
    description: "Membuat prompt menggunakan AI."
  },
  {
    id: "pollinations",
    name: "Pollinations",
    category: "AI Image",
    endpoint: "/api/ai/pollinations",
    icon: Image,
    description: "Generate gambar."
  },
  {
    id: "gpt4o",
    name: "GPT-4o",
    category: "AI Chat",
    endpoint: "/api/ai/gpt4o",
    icon: Bot,
    description: "AI assistant."
  },
  {
    id: "gptfree",
    name: "GPT Free",
    category: "AI Chat",
    endpoint: "/api/ai/gptfree",
    icon: Bot,
    description: "AI chat gratis."
  },
  {
    id: "iask",
    name: "iAsk",
    category: "AI Search",
    endpoint: "/api/ai/iask",
    icon: Search,
    description: "AI untuk menjawab pertanyaan."
  },
  {
    id: "imagegen",
    name: "ImageGen",
    category: "AI Image",
    endpoint: "/api/ai/imagegen",
    icon: Image,
    description: "Generate gambar dari prompt."
  },
  {
    id: "ustadz",
    name: "Ustadz AI",
    category: "AI Chat",
    endpoint: "/api/ai/ustadz",
    icon: Bot,
    description: "AI assistant."
  },
  {
    id: "qwen",
    name: "Qwen",
    category: "AI Chat",
    endpoint: "/api/ai/qwen",
    icon: Bot,
    description: "AI assistant."
  },
  {
    id: "text2img",
    name: "Text2Img",
    category: "AI Image",
    endpoint: "/api/ai/text2img",
    icon: Image,
    description: "Mengubah prompt menjadi gambar."
  }
];

export default function App() {
  const [selected, setSelected] = useState(AI_LIST[0]);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const [search, setSearch] = useState("");

  const filteredAI = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return AI_LIST;

    return AI_LIST.filter((item) =>
      `${item.name} ${item.category} ${item.description}`
        .toLowerCase()
        .includes(q)
    );
  }, [search]);

  async function testAPI() {
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const url =
        `${API_BASE}${selected.endpoint}` +
        `?text=${encodeURIComponent(message)}`;

      const response = await fetch(url);

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = {
          success: false,
          message: "Server tidak mengirim JSON.",
          response: text.slice(0, 3000)
        };
      }

      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;

    await navigator.clipboard.writeText(
      JSON.stringify(result, null, 2)
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function selectAI(item) {
    setSelected(item);
    setResult(null);
    setMobileMenu(false);
  }

  return (
    <div className="app">

      {/* MOBILE HEADER */}

      <header className="mobile-header">

        <button
          className="icon-button"
          onClick={() => setMobileMenu(true)}
        >
          <Menu size={21} />
        </button>

        <div className="brand">
          <div className="brand-logo">D</div>

          <div>
            <strong>DINSTORE</strong>
            <span>AI API</span>
          </div>
        </div>

      </header>


      {/* SIDEBAR */}

      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>

        <div className="sidebar-top">

          <div className="brand">

            <div className="brand-logo">
              D
            </div>

            <div>
              <strong>DINSTORE</strong>
              <span>AI API</span>
            </div>

          </div>

          <button
            className="close-menu"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>

        </div>


        <div className="sidebar-title">
          AI SERVICES
        </div>


        <div className="search-box">

          <Search size={17} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari AI..."
          />

        </div>


        <nav className="ai-list">

          {filteredAI.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={
                  selected.id === item.id
                    ? "ai-item active"
                    : "ai-item"
                }
                onClick={() => selectAI(item)}
              >

                <div className="ai-icon">
                  <Icon size={18} />
                </div>

                <div className="ai-info">

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {item.category}
                  </span>

                </div>

              </button>
            );
          })}

        </nav>


        <div className="sidebar-footer">

          <span>DINSTORE API</span>

          <small>
            AI Services
          </small>

        </div>

      </aside>


      {mobileMenu && (
        <div
          className="overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}


      {/* MAIN */}

      <main className="main">

        <div className="topbar">

          <div>
            <span className="eyebrow">
              DINSTORE AI
            </span>

            <h1>
              AI API Playground
            </h1>
          </div>

          <div className="status">
            <span />
            API ONLINE
          </div>

        </div>


        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">
              <Sparkles size={15} />
              AI SERVICES
            </div>

            <h2>
              Test semua AI
              <br />
              dalam satu tempat.
            </h2>

            <p>
              Pilih layanan AI dari menu sebelah,
              masukkan prompt, lalu jalankan API
              secara langsung.
            </p>

          </div>

          <div className="hero-orb">
            <div>
              AI
            </div>
          </div>

        </section>


        {/* API TEST */}

        <section className="card">

          <div className="card-header">

            <div>

              <span className="eyebrow">
                API TEST
              </span>

              <h3>
                {selected.name}
              </h3>

              <p>
                {selected.description}
              </p>

            </div>

            <div className="endpoint">
              {selected.endpoint}
            </div>

          </div>


          <div className="input-area">

            <label>
              Prompt / Text
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                "Tulis prompt untuk " +
                selected.name +
                "..."
              }
              rows={6}
            />

          </div>


          <div className="actions">

            <button
              className="send-button"
              onClick={testAPI}
              disabled={
                loading || !message.trim()
              }
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="spin"
                  />

                  Memproses...
                </>
              ) : (
                <>
                  <Send size={18} />

                  Test API
                </>
              )}

            </button>

          </div>

        </section>


        {/* RESPONSE */}

        <section className="card response-card">

          <div className="response-header">

            <div>

              <span className="eyebrow">
                RESPONSE
              </span>

              <h3>
                API Response
              </h3>

            </div>


            {result && (
              <button
                className="copy-button"
                onClick={copyResult}
              >

                {copied ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}

              </button>
            )}

          </div>


          <div className="response-box">

            {!result && !loading && (
              <div className="empty">

                <Sparkles size={28} />

                <span>
                  Response API akan tampil di sini
                </span>

              </div>
            )}


            {loading && (
              <div className="empty">

                <Loader2
                  size={28}
                  className="spin"
                />

                <span>
                  Menunggu response...
                </span>

              </div>
            )}


            {result && (
              <pre>
                {JSON.stringify(
                  result,
                  null,
                  2
                )}
              </pre>
            )}

          </div>

        </section>


        <footer>
          <span>
            © {new Date().getFullYear()} DINSTORE
          </span>

          <span>
            AI API Platform
          </span>
        </footer>

      </main>

    </div>
  );
}
