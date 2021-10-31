module.exports = {
  env: {
    jest: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['error', { code: 100, ignoreStrings: true }],
    'no-console': ['error', { allow: ['info'] }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
}
