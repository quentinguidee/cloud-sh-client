module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "^Pages(.*)$": "<rootDir>/src/Pages$1",
        "^Components(.*)$": "<rootDir>/src/Components$1",
    },
};
