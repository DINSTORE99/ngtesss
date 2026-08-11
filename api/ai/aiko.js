export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      source: "AI — DINSTORE",
      status: false,
      message: "Method not allowed"
    });
  }

  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({
      creator: "DINSTORE",
      source: "AI — DINSTORE",
      status: false,
      message: "Parameter prompt wajib diisi"
    });
  }

  try {
    const target = new URL(
      "https://api.azbry.com/api/ai/aiko"
    );

    target.searchParams.set("prompt", prompt);

    const response = await fetch(target.toString());
    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        data: text
      };
    }

    return res.status(response.status).json({
      creator: "DINSTORE",
      source: "AI — DINSTORE",
      status: response.ok,
      result: data.result || data
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
