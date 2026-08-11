export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      source: "CapCut — DINSTORE",
      status: false,
      message: "Method not allowed"
    });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      creator: "DINSTORE",
      source: "CapCut — DINSTORE",
      status: false,
      message: "Parameter url wajib diisi"
    });
  }

  try {
    const target = new URL(
      "https://api.azbry.com/api/download/capcut"
    );

    target.searchParams.set("url", url);

    const response = await fetch(target.toString());
    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        creator: "DINSTORE",
        source: "CapCut — DINSTORE",
        status: false,
        message: "Provider tidak mengirim JSON",
        response: text
      });
    }

    return res.status(200).json({
      creator: "DINSTORE",
      source: "CapCut — DINSTORE",
      status: data.status === true,
      message: data.message ?? data.result?.message ?? null,
      result: data.result ?? null
    });

  } catch (error) {
    return res.status(500).json({
      creator: "DINSTORE",
      source: "CapCut — DINSTORE",
      status: false,
      message: "Gagal menghubungi provider"
    });
  }
}
