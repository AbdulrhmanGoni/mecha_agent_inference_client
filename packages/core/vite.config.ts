import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, "./", "");
    return {
        define: {
            "process.env.MECHA_AGENT_BASE_URL":
                `'${mode === "production" ? env.PROD_MECHA_AGENT_BASE_URL : env.DEV_MECHA_AGENT_BASE_URL}'`,
            "process.env.MECHA_AGENT_APP_URL":
                `'${mode === "production" ? env.PROD_MECHA_AGENT_APP_URL : env.DEV_MECHA_AGENT_APP_URL}'`,
        },
        build: {
            cssCodeSplit: false,
            lib: {
                entry: [
                    path.resolve(__dirname, 'src/lib/server.ts'),
                    path.resolve(__dirname, 'src/lib/client.ts'),
                ],
                formats: ['es', 'cjs'],
                fileName: (format, entry) => `${entry.split("/").at(-1)}/index.${format}.js`,
                cssFileName: "styles",
            },
            rollupOptions: {
                input: {
                    server: path.resolve(__dirname, 'src/lib/server.ts'),
                    client: path.resolve(__dirname, 'src/lib/client.ts'),
                },
                output: {
                    dir: 'dist',
                },
            },
        },
        plugins: [
            dts({
                entryRoot: 'src/lib',
                outDir: 'dist/types',
                copyDtsFiles: true,
            }),
        ],
    }
})