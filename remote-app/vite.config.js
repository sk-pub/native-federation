import { resolve } from "path";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";

export default defineConfig(async ({ command }) => {
    // npm run dev, npm run preview
    if (command === 'serve') {
        return {
            build: {
                outDir: "dist",
                emptyOutDir: true,
                lib: {
                    entry: resolve(__dirname, "src/main.ts"),
                    name: "RemoteApp",
                    fileName: "main",
                    formats: ["es"],
                },
            },
            preview: {
                port: 4170
            },
            server: {
                port: 4170
            }
        };
    }

    // npm run build
    return {
        build: {
            outDir: "dist",
            emptyOutDir: true,
            lib: {
                entry: resolve(__dirname, "src/main.ts"),
                name: "RemoteApp",
                fileName: "main",
                formats: ["es"],
            },
        },
        plugins: [
            await federation({
                options: {
                    workspaceRoot: __dirname,
                    outputPath: "dist",
                    tsConfig: "tsconfig.json",
                    federationConfig: "module-federation/federation.config.cjs",
                    verbose: false,
                    dev: command === "serve",
                },
                adapter: createEsBuildAdapter({
                    plugins: [],
                }),
            }),
        ],
    };
});
