export function generatePlaceholder(title: string, color?: string): string {
    const colors = [
        "#FFCDD2",
        "#F8BBD0",
        "#E1BEE7",
        "#D1C4E9",
        "#C5CAE9",
        "#BBDEFB",
        "#B3E5FC",
        "#B2EBF2",
        "#C8E6C9",
        "#DCEDC8",
        "#FFECB3",
        "#FFE0B2",
        "#FFCCBC",
    ];

    const randomColor =
        color || colors[Math.floor(Math.random() * colors.length)];

    // Formatting Title to prevent overflow

    const maxCharsPerLine = 20;
    const maxLines = 3;

    const splitIntoChunks = (text: string, chunkSize: number): string[] => {
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.slice(i, i + chunkSize));
        }
        return chunks;
    };

    let lines = splitIntoChunks(title, maxCharsPerLine);

    if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        lines[maxLines - 1] = lines[maxLines - 1].replace(/-$/, "") + "...";
    }

    lines = lines.map((line, index) =>
        index < lines.length - 1 ? line + "-" : line,
    );

    const lineHeight = 28;
    const startY = 150;
    const textElements = lines
        .map(
            (line, index) => `
            <text x="50%" y="${startY + index * lineHeight}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" dy=".3em">
                ${line}
            </text>
        `,
        )
        .join("");

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400" style="background-color: ${randomColor};">
            <rect width="300" height="400" fill="${randomColor}" />
            ${textElements}
        </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
}
