import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    testEnvironment: "jest-environment-jsdom",
    moduleDirectories: ["node_modules", "<rootDir>/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    transformIgnorePatterns: ["node_modules/(?!(jose)/)"],

    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.spec.json",
        },
    },

    // Ajout pour forcer Jest à scanner tous les fichiers
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts", // ignore les fichiers de type
        "!src/**/index.{ts,tsx}", // ignore les fichiers d'export
        "!src/**/__tests__/**", // ignore les dossiers de tests dédiés
    ],
};

export default createJestConfig(customJestConfig);
