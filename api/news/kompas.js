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

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      status: false,
      message: "Method not allowed"
    });
  }

  try {
    const response = await fetch(
      "https://api.azbry.com/api/news/kompas"
    );

    if (!response.ok) {
      throw new Error(
        `DINSTORE HTTP ${response.status}`
      );
    }

    const data = await response.json();

    return res.status(200).json({
      creator: "DINSTORE",
      source: "Kompas",
      status: data.status,
      result: data.result || null
    });

  } catch (error) {
    console.error("KOMPAS API ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal mengambil data Kompas",
      error: error.message
    });
  }
}
