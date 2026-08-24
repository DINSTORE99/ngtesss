export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: false,
        creator: "DINSTORE",
        message: "Method Not Allowed",
      });
    }

    const { number } = req.query;

    if (!number) {
      return res.status(400).json({
        status: false,
        creator: "DINSTORE",
        message: "Parameter number wajib diisi.",
      });
    }

    const phone = String(number).replace(/\D/g, "");

    if (!phone) {
      return res.status(400).json({
        status: false,
        creator: "DINSTORE",
        message: "Nomor WhatsApp tidak valid.",
      });
    }

    const apiUrl =
      `https://api.neosoft.best/api/tools/checker-ban-wa?number=${encodeURIComponent(phone)}`;

    const response = await fetch(apiUrl);

    const contentType =
      response.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();

      return res.status(502).json({
        status: false,
        creator: "DINSTORE",
        message: "API upstream mengembalikan response bukan JSON.",
        response: text,
      });
    }

    // Semua response dibuat menjadi milik DINSTORE
    return res.status(response.ok ? 200 : response.status).json({
      status: data?.status ?? response.ok,
      creator: "DINSTORE",
      result: data?.result ?? null,
    });
  } catch (error) {
    console.error("CHECKER BAN WA ERROR:", error);

    return res.status(500).json({
      status: false,
      creator: "DINSTORE",
      message: "Terjadi kesalahan pada server DINSTORE.",
      error: error.message,
    });
  }
}
