export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      status: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const {
      theme,
      genre,
      emotion,
      lang
    } = req.query;

    if (!theme) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: 'Parameter "theme" wajib diisi.',
        example: "tema cinta"
      });
    }

    if (!genre) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: 'Parameter "genre" wajib diisi.',
        example: "pop"
      });
    }

    if (!emotion) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: 'Parameter "emotion" wajib diisi.',
        example: "sedih"
      });
    }

    if (!lang) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: 'Parameter "lang" wajib diisi.',
        example: "Indonesia"
      });
    }

    const params = new URLSearchParams({
      theme,
      genre,
      emotion,
      lang
    });

    const apiUrl =
      `https://api.azbry.com/api/ai/lyricsgen?${params.toString()}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        creator: "DINSTORE",
        status: false,
        result: data
      });
    }

    return res.status(200).json({
      creator: "DINSTORE",
      source: "LyricsGen — DINSTORE",
      status: data.status ?? false,
      result: data.result ?? data.data ?? data
    });

  } catch (error) {
    console.error("LYRICSGEN ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal menghubungi API LyricsGen",
      error: error.message
    });
  }
}
