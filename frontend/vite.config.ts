import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: "./",
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    esbuild: {
        target: "es2022",
    },
});
