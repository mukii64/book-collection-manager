export async function apiFetch(
    url: string,
    options: RequestInit = {},
): Promise<Response> {
    const userId = localStorage.getItem("user_id");
    const isAdmin = localStorage.getItem("is_admin") === "true";

    const defaultHeaders = {
        "Content-Type": "application/json",
        "X-User-ID": userId || "",
        "X-User-Role": isAdmin ? "admin" : "user",
    };

    const headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    try {
        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            const errorDetails = await response.json().catch(() => null);
            const errorMessage = errorDetails?.message || response.statusText;

            throw new Error(
                `API request failed with status ${response.status}: ${errorMessage}`,
            );
        }

        return response;
    } catch (error) {
        console.error("Error in apiFetch:", error);

        throw error;
    }
}
