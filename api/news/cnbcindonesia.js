export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const response = await fetch(
      "https://api.siputzx.my.id/api/berita/cnbcindonesia"
    );

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    const result = await response.json();

    return res.status(200).json({
      status: true,
      source: "CNBC Indonesia",
      data: result.data || [],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Gagal mengambil berita CNBC Indonesia",
      error: error.message
    });
  }
}
