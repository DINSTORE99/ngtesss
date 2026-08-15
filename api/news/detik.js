export default async function handler(req, res) {
  // CORS
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

  // Hanya GET
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      status: false,
      message: "Method not allowed"
    });
  }

  try {
    // API sumber Detik
    const api =
      "https://api.azbry.com/api/news/detik";

    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(
        `Upstream API error: ${response.status}`
      );
    }

    const data = await response.json();

    return res.status(200).json({
      creator: "DINSTORE",
      source: "Detik",
      status: data.status ?? false,
      result: data.result ?? data
    });

  } catch (error) {
    console.error("DETIK API ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal mengambil data Detik",
      error: error.message
    });
  }
}
