import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx,vue}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      globals: globals.browser,
    },
    plugins: { "@typescript-eslint": typescriptPlugin },
    rules: {
      // 你可以直接复制 @typescript-eslint 推荐规则
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  pluginVue.configs["flat/essential"],
]);
