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

    const upstream =
      `https://api.neosoft.best/api/tools/checker-ban-wa?number=${encodeURIComponent(phone)}`;

    const response = await fetch(upstream);

    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text();

      return res.status(502).json({
        status: false,
        creator: "DINSTORE",
        message: "API upstream tidak mengembalikan JSON.",
        response: text,
      });
    }

    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json({
      status: data?.status ?? response.ok,
      creator: "DINSTORE",
      result: data?.result ?? null,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      creator: "DINSTORE",
      message: "Server DINSTORE mengalami error.",
      error: error.message,
    });
  }
}
