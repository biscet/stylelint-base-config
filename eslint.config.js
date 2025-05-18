import js from '@eslint/js';
import tsParser   from '@typescript-eslint/parser';
import tsPlugin   from '@typescript-eslint/eslint-plugin';
import importPlugin  from 'eslint-plugin-import';
import nodePlugin    from 'eslint-plugin-n';      
import promisePlugin from 'eslint-plugin-promise';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';
import 'eslint-plugin-only-warn';                

export default [
  { ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**', 'tests'] },
  {                                            
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.node
      }
    },
     settings: {
      node: {
        version: '>=14.0.0'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      n: nodePlugin,
      promise: promisePlugin,
      sonarjs: sonarjsPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...nodePlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      ...sonarjsPlugin.configs.recommended.rules,
      semi: ['error', 'always'],
      'no-extra-semi': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'n/no-missing-import': 'off',
      'import/no-unresolved': 'off'
    }
  }
];
