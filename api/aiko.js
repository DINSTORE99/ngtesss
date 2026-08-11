export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      source: "AI — DINSTORE",
      status: false,
      message: "Method not allowed"
    });
  }

  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      creator: "DINSTORE",
      source: "AI — DINSTORE",
      status: false,
      message: "Parameter q wajib diisi"
    });
  }

  try {
    const target = new URL(
      "https://api.azbry.com/api/ai/aiko"
    );

    target.searchParams.set("q", q);

    const response = await fetch(target.toString());

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        response: text
      };
    }

    return res.status(response.status).json({
      creator: "DINSTORE",
      source: "AI — DINSTORE",
      status: response.ok && data.status !== false,
      response: data.response ?? data
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      creator: "DINSTORE",
      source: "AI — DINSTORE",
      status: false,
      message: "Gagal menghubungi provider"
    });
  }
}
