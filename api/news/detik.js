import axios from "axios";

export default async function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const response = await axios.get(
      "https://api.azbry.com/api/news/detik",
      {
        timeout: 30000,
        headers: {
          Accept: "application/json",
          "User-Agent": "DINSTORE-API/1.0",
        },
      }
    );

    return res.status(200).json(
      response.data
    );

  } catch (error) {
    console.error(
      "DETIK API ERROR:",
      error?.response?.data ||
        error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Gagal mengambil berita Detik.",
    });
  }
}
