import { useState } from "react";
import "./style.css";

const API_BASE = "";

const DOWNLOAD_APIS = {
  tiktok: {
    name: "TikTok",
    endpoint: "/api/tiktok"
  },
  instagram: {
    name: "Instagram",
    endpoint: "/api/instagram"
  },
  applemusic: {
    name: "Apple Music",
    endpoint: "/api/applemusic"
  },
  capcut: {
    name: "CapCut",
    endpoint: "/api/capcut"
  },
  douyin: {
    name: "Douyin",
    endpoint: "/api/douyin"
  },
  dramabox: {
    name: "DramaBox",
    endpoint: "/api/dramabox"
  },
  facebook: {
    name: "Facebook",
    endpoint: "/api/facebook"
  },
  mediafire: {
    name: "MediaFire",
    endpoint: "/api/mediafire"
  },
  pinterest: {
    name: "Pinterest",
    endpoint: "/api/pinterest"
  },
  spotify: {
    name: "Spotify",
    endpoint: "/api/spotify"
  },
  soundcloud: {
    name: "SoundCloud",
    endpoint: "/api/soundcloud"
  },
  tiktokslide: {
    name: "TikTok Slide",
    endpoint: "/api/tiktokslide"
  },
  x: {
    name: "X",
    endpoint: "/api/x"
  },
  ytmp3: {
    name: "YouTube MP3",
    endpoint: "/api/ytmp3"
  },
  ytplay: {
    name: "YouTube",
    endpoint: "/api/ytplay"
  }
};

function findLinks(value) {
  const links = [];

  function scan(data) {
    if (!data) return;

    if (typeof data === "string") {
      const matches = data.match(
        /https?:\/\/[^\s"'<>]+/gi
      );

      if (matches) {
        matches.forEach((url) => {
          if (!links.includes(url)) {
            links.push(url);
          }
        });
      }

      return;
    }

    if (Array.isArray(data)) {
      data.forEach(scan);
      return;
    }

    if (typeof data === "object") {
      Object.values(data).forEach(scan);
    }
  }

  scan(value);

  return links;
}

function getTitle(data, fallback) {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  return (
    data.title ||
    data.name ||
    data.caption ||
    data.description ||
    fallback
  );
}

function ResultViewer({ data }) {
  if (!data) return null;

  const result =
    data.result !== undefined
      ? data.result
      : data;

  const links = findLinks(result);

  const imageLinks = links.filter((url) =>
    /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url)
  );

  const videoLinks = links.filter((url) =>
    /\.(mp4|m3u8|webm|mov)(\?|$)/i.test(url)
  );

  const audioLinks = links.filter((url) =>
    /\.(mp3|m4a|wav|aac|ogg)(\?|$)/i.test(url)
  );

  return (
    <div className="result-card">

      <div className="result-header">
        <div>
          <span className="result-label">
            RESPONSE
          </span>

          <h2>
            {getTitle(result, "Download berhasil")}
          </h2>
        </div>

        <div
          className={
            data.status
              ? "status success"
              : "status error"
          }
        >
          {data.status ? "SUCCESS" : "FAILED"}
        </div>
      </div>

      {imageLinks.length > 0 && (
        <div className="media-section">
          <h3>Images</h3>

          <div className="media-grid">
            {imageLinks.map((url, index) => (
              <div
                className="media-item"
                key={index}
              >
                <img
                  src={url}
                  alt={`Result ${index + 1}`}
                />

                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="download-btn"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {videoLinks.length > 0 && (
        <div className="media-section">
          <h3>Videos</h3>

          <div className="media-list">
            {videoLinks.map((url, index) => (
              <div
                className="download-item"
                key={index}
              >
                <div>
                  <strong>
                    Video {index + 1}
                  </strong>

                  <span>
                    MP4 / Video
                  </span>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="download-btn"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {audioLinks.length > 0 && (
        <div className="media-section">
          <h3>Audio</h3>

          <div className="media-list">
            {audioLinks.map((url, index) => (
              <div
                className="download-item"
                key={index}
              >
                <div>
                  <strong>
                    Audio {index + 1}
                  </strong>

                  <span>
                    MP3 / Audio
                  </span>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="download-btn"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <details className="raw-response">
        <summary>
          Lihat Response JSON
        </summary>

        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] =
    useState("tiktok");

  const [url, setUrl] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [response, setResponse] =
    useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!url.trim()) {
      setError("Masukkan URL terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const api =
        DOWNLOAD_APIS[selected];

      const requestUrl =
        `${API_BASE}${api.endpoint}?url=${encodeURIComponent(
          url.trim()
        )}`;

      const res = await fetch(requestUrl);

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Server tidak mengirim JSON."
        );
      }

      if (!res.ok || data.status === false) {
        throw new Error(
          data.message ||
          "Gagal memproses URL."
        );
      }

      setResponse(data);

    } catch (err) {
      setError(
        err.message ||
        "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">

      <section className="hero">

        <div className="badge">
          DINSTORE API
        </div>

        <h1>
          Download Anything.
          <br />
          <span>Simple & Fast.</span>
        </h1>

        <p>
          Masukkan link dan pilih layanan
          yang ingin digunakan.
        </p>

      </section>

      <section className="panel">

        <div className="tabs">
          {Object.entries(
            DOWNLOAD_APIS
          ).map(([id, item]) => (
            <button
              key={id}
              type="button"
              className={
                selected === id
                  ? "tab active"
                  : "tab"
              }
              onClick={() => {
                setSelected(id);
                setResponse(null);
                setError("");
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <form
          className="download-form"
          onSubmit={handleSubmit}
        >

          <div className="input-wrap">

            <span className="input-icon">
              🔗
            </span>

            <input
              type="url"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder={
                `Masukkan link ${DOWNLOAD_APIS[selected].name}...`
              }
            />

            {url && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setUrl("")}
              >
                ×
              </button>
            )}

          </div>

          <button
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Memproses..."
              : `Download ${DOWNLOAD_APIS[selected].name}`}
          </button>

        </form>

        {error && (
          <div className="error-box">
            <strong>Gagal</strong>
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="loading-box">
            <div className="spinner" />
            <span>
              Mengambil data dari API...
            </span>
          </div>
        )}

        {response && !loading && (
          <ResultViewer
            data={response}
          />
        )}

      </section>

      <footer>
        <span>© {new Date().getFullYear()} DINSTORE</span>
        <span>API Downloader</span>
      </footer>

    </main>
  );
}
