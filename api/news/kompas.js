export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // METHOD
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: false,
      message: "Method not allowed"
    });
  }

  try {
    // API SUMBER
    const api =
      "https://api.azbry.com/api/news/kompas";

    const response = await fetch(api);

    if (!response.ok) {
      return res.status(502).json({
        creator: "DINSTORE",
        source: "Kompas",
        status: false,
        message: "Gagal mengambil data Kompas",
        error: `HTTP ${response.status}`
      });
    }

    const data = await response.json();

    // RESPONSE BERHASIL
    return res.status(200).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: data.status,
      result: data.result || null
    });

  } catch (error) {
    // ERROR
    return res.status(500).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: false,
      message: "Gagal mengambil data Kompas",
      error: error.message
    });
  }
}
