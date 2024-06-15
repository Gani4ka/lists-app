import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from "typescript-eslint";
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import eslintConfigPrettier from 'eslint-config-prettier/recommended';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.tsx', '**/*.ts', '**/*.js',],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  pluginReactConfig,
  {
    rules: {
      'no-unused-vars': 'error',
    },
  },
];
