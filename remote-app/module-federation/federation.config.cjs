const {
    withNativeFederation,
    shareAll,
  } = require('@softarc/native-federation/build');
  
  module.exports = withNativeFederation({
    name: 'remote-app',
  
    exposes: {
      './main': './src/main',
    },
  
    shared: {
      ...shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
        includeSecondaries: false,
      }),
    },
  });
