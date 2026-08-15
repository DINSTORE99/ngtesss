export default async function handler(req, res) {
  // ================================
  // CORS
  // ================================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // ================================
  // OPTIONS
  // ================================
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ================================
  // METHOD
  // ================================
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: false,
      message: "Method not allowed"
    });
  }

  try {
    // ================================
    // SOURCE API
    // ================================
    const response = await fetch(
      "https://api.azbry.com/api/news/kompas"
    );

    // ================================
    // SOURCE HTTP ERROR
    // ================================
    if (!response.ok) {
      return res.status(502).json({
        creator: "DINSTORE",
        source: "Kompas",
        status: false,
        message: "Gagal mengambil data Kompas",
        error: `Source API HTTP ${response.status}`
      });
    }

    // ================================
    // JSON
    // ================================
    const data = await response.json();

    // ================================
    // SOURCE RETURN ERROR
    // ================================
    if (data?.status !== true) {
      return res.status(502).json({
        creator: "DINSTORE",
        source: "Kompas",
        status: false,
        message: "API Kompas sedang tidak tersedia"
      });
    }

    // ================================
    // SUCCESS
    // ================================
    return res.status(200).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: true,
      result: data.result || null
    });

  } catch (error) {
    // ================================
    // INTERNAL ERROR
    // ================================
    console.error(
      "DINSTORE KOMPAS ERROR:",
      error
    );

    return res.status(500).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: false,
      message: "Terjadi kesalahan pada DINSTORE",
      error: error?.message || "Internal Server Error"
    });
  }
}
