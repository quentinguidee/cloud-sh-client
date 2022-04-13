module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "\\.(sass)$": "<rootDir>/identity-obj-proxy.js",
        "^Assets(.*)$": "<rootDir>/src/Assets$1",
        "^Components(.*)$": "<rootDir>/src/Components$1",
        "^Pages(.*)$": "<rootDir>/src/Pages$1",
    },
};
