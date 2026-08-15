/*
 * Created by : febry.is-a.dev
 * GitHub     : vandebry10-star
 * Date       : 15-08-2026
 *
 * Do not remove the creator's watermark.
 */

import axios from "axios";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

class FlixierAI {
  constructor() {
    this.cookieJar = {};

    this.headers = {
      accept: "*/*",
      "accept-language": "id-ID,id;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      origin: "https://flixier.com",
      pragma: "no-cache",
      referer: "https://flixier.com/",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/131.0.0.0 Mobile Safari/537.36"
    };
  }

  getCookieHeader() {
    return Object.entries(this.cookieJar)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  }

  updateCookies(setCookies = []) {
    if (!Array.isArray(setCookies)) return;

    for (const cookie of setCookies) {
      const firstPart = cookie.split(";")[0];

      const separator = firstPart.indexOf("=");

      if (separator === -1) continue;

      const name = firstPart
        .slice(0, separator)
        .trim();

      const value = firstPart
        .slice(separator + 1)
        .trim();

      if (name) {
        this.cookieJar[name] = value;
      }
    }
  }

  getHeaders(extra = {}) {
    const headers = {
      ...this.headers,
      ...extra
    };

    const cookie = this.getCookieHeader();

    if (cookie) {
      headers.cookie = cookie;
    }

    if (this.cookieJar["XSRF-TOKEN"]) {
      try {
        headers["x-xsrf-token"] =
          decodeURIComponent(
            this.cookieJar["XSRF-TOKEN"]
          );
      } catch {
        headers["x-xsrf-token"] =
          this.cookieJar["XSRF-TOKEN"];
      }
    }

    return headers;
  }

  async fetchCookie() {
    try {
      const response = await axios.get(
        "https://flixier.com/ai/ai-image-generator/ai-cartoon-generator",
        {
          timeout: 15000,

          headers: this.getHeaders({
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
          })
        }
      );

      this.updateCookies(
        response.headers["set-cookie"] || []
      );

      return true;
    } catch (error) {
      throw new Error(
        `Flixier initial request failed: ${this.formatAxiosError(error)}`
      );
    }
  }

  async registerAnonymous() {
    try {
      const response = await axios.post(
        "https://api.flixier.com/api/register/anonymous",
        {
          remember: true
        },
        {
          timeout: 15000,

          headers: this.getHeaders({
            accept:
              "application/json, text/plain, */*",
            "content-type":
              "application/json"
          })
        }
      );

      this.updateCookies(
        response.headers["set-cookie"] || []
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Flixier anonymous registration failed: ${this.formatAxiosError(error)}`
      );
    }
  }

  async createPrediction({
    prompt,
    negative,
    style,
    ratio
  }) {
    try {
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
          timeout: 30000,

          headers: this.getHeaders({
            accept:
              "application/json, text/plain, */*",
            "content-type":
              "application/json"
          })
        }
      );

      this.updateCookies(
        response.headers["set-cookie"] || []
      );

      return response.data;

    } catch (error) {
      throw new Error(
        `Flixier prediction failed: ${this.formatAxiosError(error)}`
      );
    }
  }

  async getPrediction(predictionId) {
    try {
      const response = await axios.get(
        `https://api.flixier.com/api/predictions/${encodeURIComponent(
          predictionId
        )}`,

        {
          timeout: 15000,

          headers: this.getHeaders({
            accept:
              "application/json, text/plain, */*"
          })
        }
      );

      this.updateCookies(
        response.headers["set-cookie"] || []
      );

      return response.data;

    } catch (error) {
      throw new Error(
        `Flixier status request failed: ${this.formatAxiosError(error)}`
      );
    }
  }

  formatAxiosError(error) {
    if (!error) {
      return "Unknown error";
    }

    if (error.response) {
      const status = error.response.status;

      let data = error.response.data;

      if (typeof data === "object") {
        try {
          data = JSON.stringify(data);
        } catch {
          data = "Unknown response";
        }
      }

      return `HTTP ${status}: ${data}`;
    }

    if (error.code) {
      return `${error.code}: ${error.message}`;
    }

    return error.message || "Unknown error";
  }

  async generateImage({
    prompt,
    negative = "blur",
    style = "anime",
    ratio = "2:3"
  }) {
    if (!prompt) {
      throw new Error("Prompt is required.");
    }

    /*
     * 1. Get initial cookies
     */

    await this.fetchCookie();

    /*
     * 2. Anonymous session
     */

    await this.registerAnonymous();

    /*
     * 3. Create prediction
     */

    const prediction =
      await this.createPrediction({
        prompt,
        negative,
        style,
        ratio
      });

    const predictionId =
      prediction?.id;

    if (!predictionId) {
      throw new Error(
        "Flixier tidak memberikan prediction ID."
      );
    }

    /*
     * 4. Poll status
     *
     * Jangan terlalu lama karena Vercel
     * mempunyai batas waktu Function.
     */

    let task = null;

    const maxAttempts = 20;

    for (
      let attempt = 0;
      attempt < maxAttempts;
      attempt++
    ) {
      task =
        await this.getPrediction(
          predictionId
        );

      const status =
        String(task?.status || "")
          .toUpperCase();

      if (
        status === "COMPLETED" ||
        status === "FAILED"
      ) {
        break;
      }

      await sleep(3000);
    }

    if (!task) {
      throw new Error(
        "Tidak mendapatkan response prediction."
      );
    }

    const finalStatus =
      String(task.status || "")
        .toUpperCase();

    /*
     * 5. Failed
     */

    if (finalStatus === "FAILED") {
      throw new Error(
        task.error ||
        "Flixier gagal membuat gambar."
      );
    }

    /*
     * 6. Still processing
     */

    if (finalStatus !== "COMPLETED") {
      return {
        status: "PROCESSING",
        prediction_id: predictionId,
        prompt,
        style,
        message:
          "Gambar masih diproses. Silakan cek prediction_id kembali."
      };
    }

    /*
     * 7. Get output URL
     */

    const asset =
      task.output_asset || {};

    const versions =
      asset.versions || {};

    const origin =
      versions.origin || {};

    const watermark =
      versions.render_watermark || {};

    const imageUrl =
      task.output_url ||
      watermark.url ||
      origin.url ||
      null;

    const thumb =
      asset.thumb ||
      null;

    return {
      status: "COMPLETED",

      prompt:
        task.input?.prompt ||
        prompt,

      style:
        task.input?.style_preset ||
        style,

      url: imageUrl,

      thumb,

      resolution: {
        width:
          origin.width ||
          null,

        height:
          origin.height ||
          null
      },

      prediction_id:
        predictionId
    };
  }
}


/*
|--------------------------------------------------------------------------
| VERCEL SERVERLESS FUNCTION
|--------------------------------------------------------------------------
*/

export default async function handler(
  req,
  res
) {

  /*
   * CORS
   */

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, x-api-key"
  );

  /*
   * OPTIONS
   */

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  /*
   * Method
   */

  if (
    req.method !== "GET" &&
    req.method !== "POST"
  ) {
    return res.status(405).json({
      success: false,
      message:
        "Method not allowed"
    });
  }

  try {

    /*
     * Get parameters
     */

    const params =
      req.method === "GET"
        ? req.query || {}
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

    /*
     * Validate prompt
     */

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message:
          "Parameter prompt wajib diisi.",

        example:
          "/api/ai/flixier?prompt=futuristic%20warrior%20cat&style=cinematic"
      });
    }

    /*
     * Prompt limit
     */

    if (prompt.length > 1000) {
      return res.status(400).json({
        success: false,
        message:
          "Prompt maksimal 1000 karakter."
      });
    }

    /*
     * Generate
     */

    const ai =
      new FlixierAI();

    const result =
      await ai.generateImage({
        prompt,
        negative,
        style,
        ratio
      });

    /*
     * Success
     */

    return res.status(200).json({
      success: true,
      source: "DIN API",
      service: "Flixier AI",
      ...result
    });

  } catch (error) {

    console.error(
      "FLIXIER ERROR:",
      error
    );

    /*
     * Error response
     */

    return res.status(500).json({
      success: false,
      service: "Flixier AI",

      message:
        error?.message ||
        "Internal Server Error"
    });
  }
}

export {
  FlixierAI
};
