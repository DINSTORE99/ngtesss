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
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: 'Parameter "prompt" wajib diisi.',
        example: "buat landing page portfolio modern dengan html css"
      });
    }

    const apiUrl =
      `https://api.azbry.com/api/tools/aicoder?prompt=${encodeURIComponent(prompt)}`;

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
      response: data.response ?? data.result ?? data.data ?? null
    });

  } catch (error) {
    console.error("AICODER ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal menghubungi API AICoder",
      error: error.message
    });
  }
}
