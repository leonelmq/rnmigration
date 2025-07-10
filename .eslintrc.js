module.exports = {
  extends: ['@react-native', 'plugin:i18next/recommended'],
  plugins: ['react-hooks'],
  rules: {
    complexity: 'off',
    'no-nested-ternary': 'off',
    'no-magic-numbers': 'off',
    'new-cap': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    semi: [0, 'always'],
    'trailing-comma': [0, 'always'],
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/resolver': {
      node: {
        paths: ['src'],
        settings: {
          'import/resolver': {
            node: {
              paths: ['src'],
              extensions: [
                '.ios.js',
                '.android.js',
                '.js',
                '.jsx',
                '.ts',
                '.tsx',
                '.json',
              ],
            },
          },
        },
      },
    },
  },
};
