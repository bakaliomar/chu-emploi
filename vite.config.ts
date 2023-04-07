import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

const rootDir = resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(rootDir, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${rootDir}/src/assets/variables.scss";`,
      },
    },
  },
  plugins: [
    Pages({
      routeNameSeparator: "_",
      onRoutesGenerated: (routes) => {
        return routes.map((route) => ({
          ...route,
          name: route.name?.replace(RegExp(`-index$`), ""),
        }));
      },
    }),
    Layouts(),
    vue() as Plugin,
  ],
});
