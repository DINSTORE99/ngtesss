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
    // API SIPUTZX
    // =========================
    const api =
      "https://api.siputzx.my.id/api/berita/kompas";

    const response = await fetch(api);

    // =========================
    // HTTP ERROR
    // =========================
    if (!response.ok) {
      throw new Error(
        `Upstream API HTTP ${response.status}`
      );
    }

    // =========================
    // PARSE JSON
    // =========================
    const data = await response.json();

    // =========================
    // UPSTREAM STATUS ERROR
    // =========================
    if (data.status !== true) {
      return res.status(502).json({
        creator: "DINSTORE",
        source: "Kompas",
        status: false,
        message: "API Kompas mengembalikan status false",
        error: data.message || null
      });
    }

    // =========================
    // SUCCESS
    // =========================
    return res.status(200).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: true,
      result: data.data || []
    });

  } catch (error) {
    // =========================
    // ERROR
    // =========================
    console.error(
      "DINSTORE KOMPAS API ERROR:",
      error
    );

    return res.status(500).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: false,
      message: "Gagal mengambil data Kompas",
      error: error.message || "Unknown error"
    });
  }
}
