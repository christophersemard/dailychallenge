import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn", // ou "off" si tu veux complètement désactiver l'erreur
                {
                    argsIgnorePattern: "^_", // Ignore les paramètres inutilisés qui commencent par "_"
                    varsIgnorePattern: "^_", // Ignore les variables inutilisées qui commencent par "_"
                },
            ],
        },
    },
];

export default eslintConfig;
