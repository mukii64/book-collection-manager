export function generatePlaceholder(title: string, color?: string): string {
    // Expanded pastel color palette
    const colors = [
        "#FFCDD2", // Light Red
        "#F8BBD0", // Light Pink
        "#E1BEE7", // Light Purple
        "#D1C4E9", // Lavender
        "#C5CAE9", // Light Indigo
        "#BBDEFB", // Light Blue
        "#B3E5FC", // Light Cyan
        "#B2EBF2", // Light Teal
        "#C8E6C9", // Light Green
        "#DCEDC8", // Light Lime
        "#FFECB3", // Light Amber
        "#FFE0B2", // Light Orange
        "#FFCCBC", // Light Coral
    ];

    const randomColor =
        color || colors[Math.floor(Math.random() * colors.length)];

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400" style="background-color: ${randomColor};">
            <rect width="300" height="400" fill="${randomColor}" />
            <text x="50%" y="50%" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" dy=".3em">
                ${title}
            </text>
        </svg>
    `;

    // Convert the SVG to a data URL
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}
