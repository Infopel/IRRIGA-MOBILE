module.exports = {
  // presets: ["module:metro-react-native-babel-preset", "@babel/preset-typescript"],
  presets: [
    ["@rnx-kit/babel-preset-metro-react-native"],
    // ["@rnx-kit/babel-preset-metro-react-native", { disableImportExportTransform: true }],
    // "@babel/preset-typescript",
  ],
  env: {
    production: {},
  },
  plugins: [
    ["lodash"],
    ["@babel/plugin-transform-flow-strip-types"],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-optional-catch-binding"],
    [
      "module-resolver",
      {
        alias: {
          components: "./app/components",
          storage: "./app/services/storage",
          models: "./app/models",
          navigators: "./app/navigators",
          api: "./app/services/api",
          containers: "./app/containers",
          utils: "./app/utils",
          theme: "./app/theme",
          assets: "./assets",
        },
      },
    ],
  ],
}
