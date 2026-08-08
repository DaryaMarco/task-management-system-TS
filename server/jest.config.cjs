module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  testMatch: [
    "**/*.test.ts"
  ],

  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup.ts"
  ],

  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  },

  clearMocks: true,
  testTimeout: 30000
};