export default async function handler(req, res) {
  // =========================
  // CORS
  // =========================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // =========================
  // OPTIONS
  // =========================
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // =========================
  // METHOD CHECK
  // =========================
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: false,
      message: "Method not allowed"
    });
  }

  try {
    // =========================
    // UPSTREAM API
    // =========================
    const api =
      "https://api.azbry.com/api/news/kompas";

    const response = await fetch(api);

    // =========================
    // HTTP ERROR
    // =========================
    if (!response.ok) {
      return res.status(502).json({
        creator: "DINSTORE",
        source: "Kompas",
        status: false,
        message: "Gagal mengambil data Kompas",
        error: `Upstream API HTTP ${response.status}`
      });
    }

    // =========================
    // PARSE JSON
    // =========================
    const data = await response.json();

    // =========================
    // UPSTREAM STATUS FALSE
    // =========================
    if (data.status !== true) {
      return res.status(502).json({
        creator: "DINSTORE",
        source: "Kompas",
        status: false,
        message: "API Kompas sedang gagal",
        error: data.message || "Upstream API mengembalikan status false"
      });
    }

    // =========================
    // SUCCESS
    // =========================
    return res.status(200).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: true,
      result: data.result || null
    });

  } catch (error) {
    // =========================
    // SERVER ERROR
    // =========================
    console.error("DINSTORE KOMPAS API ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: false,
      message: "Gagal mengambil data Kompas",
      error: error.message || "Unknown error"
    });
  }
}
