export async function apiFetch(
    url: string,
    options: RequestInit = {},
): Promise<Response> {
    const userId = localStorage.getItem("user_id");
    const isAdmin = localStorage.getItem("is_admin") === "true";

    // Default headers
    const defaultHeaders = {
        "Content-Type": "application/json",
        "X-User-ID": userId || "",
        "X-User-Role": isAdmin ? "admin" : "user",
    };

    // Merge default headers with any headers passed in options
    const headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    // Return the fetch call with merged headers and options
    return fetch(url, { ...options, headers });
}
