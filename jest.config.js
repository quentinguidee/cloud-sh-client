module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "\\.(sass)$": "<rootDir>/identity-obj-proxy.js",
        "\\.(png)$": "<rootDir>/src/Mocks/fileMock.js",
        "pretty-bytes": "<rootDir>/src/Mocks/prettyBytes.js",
        "^Assets(.*)$": "<rootDir>/src/Assets$1",
        "^Backend(.*)$": "<rootDir>/src/Backend$1",
        "^Components(.*)$": "<rootDir>/src/Components$1",
        "^Layouts(.*)$": "<rootDir>/src/Layouts$1",
        "^Models(.*)$": "<rootDir>/src/Models$1",
        "^Pages(.*)$": "<rootDir>/src/Pages$1",
        "^Store(.*)$": "<rootDir>/src/Store$1",
    },
};
