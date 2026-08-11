export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      creator: "DINSTORE",
      status: false,
      message: "Method not allowed"
    });
  }

  const { text, prompt, q } = req.query;

  const value = text || prompt || q;

  if (!value) {
    return res.status(400).json({
      creator: "DINSTORE",
      status: false,
      message: "Parameter text wajib diisi"
    });
  }

  try {
    const target = new URL(
      "https://api.azbry.com/api/ai/aiko"
    );

    target.searchParams.set("text", value);

    const response = await fetch(target);

    const raw = await response.text();

    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      data = {
        response: raw
      };
    }

    return res.status(response.status).json({
      creator: "DINSTORE",
      status: response.ok,
      result: data.result ?? data
    });

  } catch (error) {
    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal menghubungi provider"
    });
  }
}
