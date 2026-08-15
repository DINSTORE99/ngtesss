import axios from "axios";

/*
 * DINSTORE API
 * DramaBox Downloader
 */

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, x-api-key"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const params =
      req.method === "GET"
        ? req.query
        : req.body || {};

    const url =
      typeof params.url === "string"
        ? params.url.trim()
        : "";

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL DramaBox wajib diisi.",
        example:
          "/api/download/dramabox?url=https://..."
      });
    }

    if (
      !url.includes("dramabox") &&
      !url.includes("drama")
    ) {
      return res.status(400).json({
        success: false,
        message: "URL bukan URL DramaBox yang valid."
      });
    }

    const upstream =
      "https://api.azbry.com/api/download/dramabox";

    const response = await axios.get(upstream, {
      params: {
        url
      },
      timeout: 60000,
      headers: {
        Accept: "application/json",
        "User-Agent": "DINSTORE-API/1.0"
      },
      validateStatus: () => true
    });

    const contentType =
      response.headers["content-type"] || "";

    // Kalau upstream mengembalikan JSON
    if (contentType.includes("application/json")) {
      return res.status(response.status).json({
        success:
          response.status >= 200 &&
          response.status < 300,
        source: "DINSTORE",
        service: "DramaBox Downloader",
        data: response.data
      });
    }

    // Kalau upstream ternyata mengembalikan file/data lain
    return res.status(response.status).send(response.data);

  } catch (error) {
    console.error(
      "DINSTORE DRAMABOX ERROR:",
      error?.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      source: "DINSTORE",
      service: "DramaBox Downloader",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Internal Server Error"
    });
  }
}
