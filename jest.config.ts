// module.exports = {
//   preset: 'react-native',
//   setupFilesAfterEnv: ['./tests/setup.js'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };

import type { Config } from "@jest/types"
const { pathsToModuleNameMapper } = require("ts-jest")
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const tsconfig = require("./tsconfig.json")
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect", "./tests/setupTests.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((@types|jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|headers-polyfill|react-native-svg)",
  ],
  moduleDirectories: ["app", "node_modules", "./app/utils/test-utils.tsx"],
  setupFiles: [
    "<rootDir>/tests/setup.js",
    "<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
    },
  },
  // globalSetup:"<rootDir>/tests/globalSetup.js",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "\\.([jt]sx?)$": "babel-jest",
  },
  testRegex: "(test|spec)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
export default config
