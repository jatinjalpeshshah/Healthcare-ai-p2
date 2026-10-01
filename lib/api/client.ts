const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = `Request failed with status ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson.detail) {
        if (typeof errorJson.detail === "string") {
          errorDetail = errorJson.detail;
        } else if (errorJson.detail.message) {
          errorDetail = errorJson.detail.message;
        } else {
          errorDetail = JSON.stringify(errorJson.detail);
        }
      }
    } catch {
      // Non-JSON error response
    }
    throw new Error(errorDetail);
  }

  return response.json();
}
