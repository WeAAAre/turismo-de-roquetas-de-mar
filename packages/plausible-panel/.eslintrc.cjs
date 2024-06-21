const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    '@weaaare/style/eslint/node',
    '@weaaare/style/eslint/typescript',
  ].map(require.resolve),
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: [require.resolve('@weaaare/style/eslint/jest')],
    },
  ],
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
    "src/shims.d.ts",
    'node_modules/',
    'dist/',
    '.eslintrc.js',
  ],
};
