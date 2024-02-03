const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

module.exports = {
  root: true,
  extends: [
    '@gisei-studio/style/eslint/browser',
    '@gisei-studio/style/eslint/node',
    '@gisei-studio/style/eslint/typescript',
    '@gisei-studio/style/eslint/react',
    '@gisei-studio/style/eslint/next',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.eslintrc.js',
    '.next',
    '.turbo',
    'src/lib/directus/schema.ts',
  ],
};
