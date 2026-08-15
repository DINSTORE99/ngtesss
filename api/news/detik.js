const executeEndpoint = async (endpoint, values) => {
  setTesterLoading(true);
  setTesterResponse(null);
  setTesterError("");

  try {
    const query = new URLSearchParams();

    Object.entries(values || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, value);
      }
    });

    // =========================================
    // API REQUEST
    // =========================================

    const url =
      endpoint.path +
      (query.toString()
        ? `?${query.toString()}`
        : "");

    const response = await fetch(url, {
      method: endpoint.method || "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const contentType =
      response.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          `HTTP ${response.status}`
      );
    }

    // =========================================
    // RESPONSE
    // =========================================

    if (
      endpoint.path === "/api/news/detik"
    ) {
      setTesterResponse({
        type: "detik",
        data,
      });
    } else {
      setTesterResponse({
        type: "json",
        data,
      });
    }

  } catch (error) {
    console.error(error);

    setTesterError(
      error?.message ||
        "Gagal menjalankan API."
    );
  } finally {
    setTesterLoading(false);
  }
};
