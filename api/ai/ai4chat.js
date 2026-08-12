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
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: 'Parameter "q" wajib diisi.',
        example: "/api/ai/ai4chat?q=tes"
      });
    }

    const apiUrl =
      `https://api.azbry.com/api/ai/ai4chat?q=${encodeURIComponent(q)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(response.status).json({
      creator: "DINSTORE",
      source: "AI4Chat — DINSTORE",
      status: data.status ?? false,
      result: data.result ?? null
    });

  } catch (error) {
    console.error("AI4CHAT ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal menghubungi API AI4Chat",
      error: error.message
    });
  }
}
