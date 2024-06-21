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
    '@weaaare/style/eslint/browser',
    '@weaaare/style/eslint/node',
    '@weaaare/style/eslint/typescript',
    '@weaaare/style/eslint/react',
    '@weaaare/style/eslint/next',
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
