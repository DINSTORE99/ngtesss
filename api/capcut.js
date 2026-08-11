export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      status: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "Parameter url wajib diisi",
        example: "/api/capcut?url=https://www.capcut.com/tv2/xxxxx"
      });
    }

    if (
      !url.includes("capcut.com") &&
      !url.includes("capcut.cn")
    ) {
      return res.status(400).json({
        status: false,
        message: "URL bukan link CapCut yang valid"
      });
    }

    const apiUrl =
      `https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: false,
        message: "Gagal mengambil data CapCut",
        result: data
      });
    }

    // Jika API sumber gagal
    if (!data?.status || !data?.data) {
      return res.status(200).json({
        creator: "DINSTORE",
        source: "CapCut — DINSTORE",
        status: false,
        result: data
      });
    }

    const result = data.data;

    return res.status(200).json({
      creator: "DINSTORE",
      source: "CapCut — DINSTORE",
      status: true,

      result: {
        code: result.code,
        title: result.title,
        author: result.authorName,
        cover: result.coverUrl,
        video: result.originalVideoUrl
      },

      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("CAPCUT ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      source: "CapCut — DINSTORE",
      status: false,
      message: "Gagal memproses URL CapCut",
      error: error.message
    });
  }
}
