import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ),

    {
        files: ["**/*.ts"],
        languageOptions: {
            parserOptions: {
                sourceType: "module",
                ecmaVersion: "latest",
            },
        },
        rules: {
            // désactive les règles inutiles en NestJS
            "@next/next/no-html-link-for-pages": "off",
            "@next/next/no-assign-module-variable": "off",

            // adoucit les règles globales
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },

    {
        files: ["**/*.spec.ts", "**/*.test.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
];

export default eslintConfig;
