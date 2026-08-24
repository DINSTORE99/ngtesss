export default async function handler(req, res) {
  try {
    
    if (req.method !== "GET") {
      return res.status(405).json({
        status: false,
        creator: "DIN API",
        message: "Method Not Allowed",
      });
    }

    // Ambil nomor dari query
    const { number } = req.query;

    if (!number) {
      return res.status(400).json({
        status: false,
        creator: "DIN API",
        message: "Parameter number wajib diisi.",
        example: "/api/tools/checker-ban-wa?number=628123456789",
      });
    }

    // Bersihkan nomor
    const phone = String(number).replace(/\D/g, "");

    if (!phone) {
      return res.status(400).json({
        status: false,
        creator: "DIN API",
        message: "Nomor WhatsApp tidak valid.",
      });
    }

    // API Neosoft
    const target =
      `https://api.neosoft.best/api/tools/checker-ban-wa?number=${encodeURIComponent(phone)}`;

    const response = await fetch(target, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "DIN-API/1.0",
      },
    });

    const contentType =
      response.headers.get("content-type") || "";

    // Pastikan response JSON
    if (!contentType.includes("application/json")) {
      const text = await response.text();

      return res.status(502).json({
        status: false,
        creator: "DIN API",
        message: "API upstream tidak mengembalikan JSON.",
        upstream_status: response.status,
        response: text,
      });
    }

    const data = await response.json();

    // Teruskan hasil dari Neosoft
    return res.status(response.ok ? 200 : response.status).json({
      status: data?.status ?? response.ok,
      creator: "DIN API",
      result: data?.result ?? null,
    });
  } catch (error) {
    console.error("CHECKER BAN WA:", error);

    return res.status(500).json({
      status: false,
      creator: "DIN API",
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
}
