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
    const { q, reset } = req.query;

    if (!q) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: "Parameter q wajib diisi",
        example: "/api/ai/aiko?q=tes&reset=oke"
      });
    }

    const params = new URLSearchParams();
    params.set("q", q);

    if (reset) {
      params.set("reset", reset);
    }

    const apiUrl =
      `https://api.azbry.com/api/ai/aiko?${params.toString()}`;

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
      status: data.status ?? false,
      response: data.response ?? null
    });

  } catch (error) {
    console.error("AIKO ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal menghubungi API Aiko",
      error: error.message
    });
  }
}
