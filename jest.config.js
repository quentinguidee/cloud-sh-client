module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "\\.(sass)$": "<rootDir>/identity-obj-proxy.js",
        "^Assets(.*)$": "<rootDir>/src/Assets$1",
        "^Components(.*)$": "<rootDir>/src/Components$1",
        "^Layouts(.*)$": "<rootDir>/src/Layouts$1",
        "^Pages(.*)$": "<rootDir>/src/Pages$1",
    },
};
