import { defineConfig } from "vite";
import babel from "@rolldown/plugin-babel"

export default defineConfig({
  plugins: [
    babel({
      presets: [{
        preset: () => ({ plugins: [["@babel/plugin-proposal-decorators", { version: "2023-11" }]] }),
        rolldown: { filter: { code: "@" } },
      }],
    }),
  ],
})