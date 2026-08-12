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
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({
        creator: "DINSTORE",
        status: false,
        message: 'Parameter "domain" wajib diisi.',
        example: "/api/tools/domaininfo?domain=dinn.my.id"
      });
    }

    const apiUrl =
      `https://api.azbry.com/api/tools/domaininfo?domain=${encodeURIComponent(domain)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(response.status).json({
      creator: "DINSTORE",
      source: "RDAP — DINSTORE",
      status: data.status ?? false,
      result: data.result ?? null
    });

  } catch (error) {
    console.error("DOMAININFO ERROR:", error);

    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal mengambil informasi domain",
      error: error.message
    });
  }
}
