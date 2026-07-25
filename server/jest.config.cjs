

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

    clearMocks: true,
    testTimeout: 30000,
};

