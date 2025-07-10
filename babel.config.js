module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'import-glob',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@app': './src/app',
          '@components': './src/app/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@hooks': './src/app/hooks',
          '@interfaces': './src/interfaces',
          '@navigationHelper': './src/app/components/AppNavigator/helper',
          '@redux': './src/redux',
          '@screens': './src/app/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          '@assets': './src/app/assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
  ],
};
