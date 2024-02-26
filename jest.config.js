module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
