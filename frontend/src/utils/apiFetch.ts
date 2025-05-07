export async function apiFetch(
    url: string,
    options: RequestInit = {},
): Promise<Response> {
    const token = localStorage.getItem("token");

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

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
