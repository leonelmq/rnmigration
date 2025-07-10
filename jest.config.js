const { defaults } = require('jest-config');

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'png', 'jpg'],
  setupFilesAfterEnv: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '@testing-library/jest-native/extend-expect',
    './__mocks__/jest.setup.js',
  ],
  testMatch: [
    './__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
    './__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native/community|flipper-redux-observer|@react-native/js-polyfills/error-guard.js|@react-native/virtualized-lists/index.js|@react-native/assets-registry/path-support.js|@react-native/assets-registry/registry.js|rn-flipper-async-storage-advanced|galicia-.*/)',
  ],
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 35,
      lines: 50,
      statements: 45,
    },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/console.js',
    '!**/node_modules/**',
    '!**/.history/**',
    '!**/build/**',
    '!**/migrations/**',
    '!**/config/**',
    '!**/scripts/**',
    '!**/app/models/**',
    '!**/test/**',
    '!**/__tests__/**',
    '!**/__mocks__/**',
    '!**/coverage/**',
    '!**/server.js',
    '!**/app/middlewares/apiInfo**',
  ],
};
