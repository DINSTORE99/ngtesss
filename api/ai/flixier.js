import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false
});

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

class FlixierAI {
  constructor() {
    this.headers = {
      accept: "*/*",
      "accept-language": "id-ID,id;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      origin: "https://flixier.com",
      pragma: "no-cache",
      referer: "https://flixier.com/",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/131.0.0.0 Mobile Safari/537.36",
      cookie: "",
      "x-xsrf-token": ""
    };
  }

  parseCookies(cookieString = "") {
    return cookieString.split(";").reduce((cookies, cookie) => {
      const [name, ...parts] = cookie.trim().split("=");

      if (name) {
        cookies[name] = parts.join("=");
      }

      return cookies;
    }, {});
  }

  serializeCookies(cookies) {
    return Object.entries(cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }

  updateCookies(setCookies) {
    if (!setCookies?.length) return;

    const cookies = this.parseCookies(this.headers.cookie);

    for (const item of setCookies) {
      const first = item.split(";")[0];
      const index = first.indexOf("=");

      if (index === -1) continue;

      const name = first.slice(0, index).trim();
      const value = first.slice(index + 1).trim();

      if (name) {
        cookies[name] = value;
      }
    }

    this.headers.cookie = this.serializeCookies(cookies);

    if (cookies["XSRF-TOKEN"]) {
      try {
        this.headers["x-xsrf-token"] =
          decodeURIComponent(cookies["XSRF-TOKEN"]);
      } catch {
        this.headers["x-xsrf-token"] = cookies["XSRF-TOKEN"];
      }
    }
  }

  async fetchCookie() {
    const response = await axios.get(
      "https://flixier.com/ai/ai-image-generator/ai-cartoon-generator",
      {
        httpsAgent: agent,
        timeout: 30000,
        headers: {
          ...this.headers,
          accept: "application/json, text/plain, */*"
        }
      }
    );

    this.updateCookies(response.headers["set-cookie"]);
  }

  async registerAnonymous() {
    const response = await axios.post(
      "https://api.flixier.com/api/register/anonymous",
      {
        remember: true
      },
      {
        httpsAgent: agent,
        timeout: 30000,
        headers: {
          ...this.headers,
          accept: "application/json, text/plain, */*",
          "content-type": "application/json"
        }
      }
    );

    this.updateCookies(response.headers["set-cookie"]);
  }

  async createPrediction({
    prompt,
    negative,
    style,
    ratio
  }) {
    const response = await axios.post(
      "https://api.flixier.com/api/predictions/text-to-image",
      {
        prompt,
        negative_prompt: negative,
        service: "stability",
        style_preset: style,
        aspect_ratio: ratio
      },
      {
        httpsAgent: agent,
        timeout: 60000,
        headers: {
          ...this.headers,
          accept: "application/json, text/plain, */*",
          "content-type": "application/json"
        }
      }
    );

    this.updateCookies(response.headers["set-cookie"]);

    return response.data;
  }

  async getPrediction(id) {
    const response = await axios.get(
      `https://api.flixier.com/api/predictions/${encodeURIComponent(id)}`,
      {
        httpsAgent: agent,
        timeout: 30000,
        headers: this.headers
      }
    );

    this.updateCookies(response.headers["set-cookie"]);

    return response.data;
  }

  async generateImage({
    prompt,
    negative = "blur",
    style = "anime",
    ratio = "2:3"
  }) {
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    await this.fetchCookie();
    await this.registerAnonymous();

    const prediction = await this.createPrediction({
      prompt,
      negative,
      style,
      ratio
    });

    const predictionId = prediction?.id;

    if (!predictionId) {
      throw new Error(
        "Prediction ID tidak ditemukan dari Flixier."
      );
    }

    let task = null;

    // Maksimal sekitar 2 menit
    for (let i = 0; i < 40; i++) {
      task = await this.getPrediction(predictionId);

      if (
        task?.status === "COMPLETED" ||
        task?.status === "FAILED"
      ) {
        break;
      }

      await sleep(3000);
    }

    if (!task) {
      throw new Error("Gagal mendapatkan status prediction.");
    }

    if (task.status === "FAILED") {
      throw new Error(
        task.error || "Image generation failed."
      );
    }

    if (task.status !== "COMPLETED") {
      throw new Error(
        "Generation timeout. Silakan coba lagi."
      );
    }

    return {
      status: "COMPLETED",

      prompt:
        task.input?.prompt ||
        prompt,

      style:
        task.input?.style_preset ||
        style,

      url:
        task.output_url ||
        task.output_asset?.versions?.render_watermark?.url ||
        null,

      thumb:
        task.output_asset?.thumb ||
        null,

      resolution: {
        width:
          task.output_asset?.versions?.origin?.width ||
          null,

        height:
          task.output_asset?.versions?.origin?.height ||
          null
      },

      prediction_id: predictionId
    };
  }
}


/*
|--------------------------------------------------------------------------
| VERCEL API HANDLER
|--------------------------------------------------------------------------
|
| GET:
| /api/ai/flixier?prompt=futuristic+warrior+cat&style=cinematic
|
| POST:
| {
|   "prompt": "futuristic warrior cat",
|   "style": "cinematic",
|   "negative": "blur",
|   "ratio": "2:3"
| }
|
*/

export default async function handler(req, res) {

  // CORS
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

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

    const prompt =
      typeof params.prompt === "string"
        ? params.prompt.trim()
        : "";

    const negative =
      typeof params.negative === "string"
        ? params.negative.trim()
        : "blur";

    const style =
      typeof params.style === "string"
        ? params.style.trim()
        : "anime";

    const ratio =
      typeof params.ratio === "string"
        ? params.ratio.trim()
        : "2:3";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt wajib diisi.",
        example: {
          prompt: "futuristic warrior cat",
          style: "cinematic",
          negative: "blur",
          ratio: "2:3"
        }
      });
    }

    // Batasi input
    if (prompt.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Prompt maksimal 1000 karakter."
      });
    }

    const ai = new FlixierAI();

    const result = await ai.generateImage({
      prompt,
      negative,
      style,
      ratio
    });

    return res.status(200).json({
      success: true,
      source: "DIN API",
      service: "Flixier AI",
      ...result
    });

  } catch (error) {

    console.error(
      "FLIXIER API ERROR:",
      error?.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Internal Server Error"
    });
  }
}

export { FlixierAI };
