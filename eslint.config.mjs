import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import jest from 'eslint-plugin-jest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    'eslint:recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ),
  {
    plugins: {
      jest,
      boundaries,
    },

    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },

    settings: {
      'boundaries/include': ['src/**/*'],

      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/shared/**/*',
            'src/__tests__/**/*',
            'src/assets/**/*',
            'src/lib/**/*',
          ],
        },
        {
          mode: 'full',
          type: 'feature',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*'],
        },
        {
          mode: 'full',
          type: 'app',
          capture: ['_', 'fileName'],
          pattern: ['src/app/**/*'],
        },
        {
          mode: 'full',
          type: 'neverImport',
          pattern: ['src/*', 'src/scripts/**/*'],
        },
      ],
    },

    rules: {
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],

      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',

          rules: [
            {
              from: ['shared'],
              allow: ['shared'],
            },
            {
              from: ['feature'],

              allow: [
                'shared',
                [
                  'feature',
                  {
                    featureName: '${from.featureName}',
                  },
                ],
              ],
            },
            {
              from: ['neverImport'],
              allow: ['shared', 'feature'],
            },
            {
              from: ['app'],
              allow: ['shared', 'feature', 'app'],
            },
            {
              from: ['app'],

              allow: [
                [
                  'app',
                  {
                    fileName: '*.css',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
  },
];

export default config;
