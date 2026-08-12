export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Parameter url wajib diisi"
    });
  }

  try {
    const api = `https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(url)}`;

    const response = await fetch(api);
    const data = await response.json();

    return res.status(200).json({
      creator: "DINSTORE",
      source: "CapCut",
      status: data.status,
      result: data.data || data
    });

  } catch (error) {
    return res.status(500).json({
      creator: "DINSTORE",
      status: false,
      message: "Gagal mengambil data",
      error: error.message
    });
  }
}
