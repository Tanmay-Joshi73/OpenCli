import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
