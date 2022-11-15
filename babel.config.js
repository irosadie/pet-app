module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            "$root": "./",
            "$actions": "./src/actions",
            "$assets": "./src/assets",
            "$components": "./src/components",
            "$hooks": "./src/hooks",
            "$navigations": "./src/navigations",
            "$screens": "./src/screens",
            "$services": "./src/services",
            "$stores": "./src/stores",
            "$types": "./src/types",
            "$strings": "./src/strings",
            "$utils": "./src/utils",
          },
        }
      ],
      [
        "module:react-native-dotenv",
        {
          "moduleName": "@env",
          "path": ".env",
          "blocklist": null,
          "allowlist": null,
          "safe": false,
          "allowUndefined": true
        }
      ]
    ],
  }
};
