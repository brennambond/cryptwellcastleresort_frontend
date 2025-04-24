import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // ✅ Correct
  },
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
};
export default config;
