const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'))

module.exports = {
  env: {
    browser: false,
    amd: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/warnings'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['import', 'prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'comma-dangle': [2, 'always-multiline'],
    quotes: [
      1,
      'single',
      {
        avoidEscape: true,
      },
    ],
    'no-undef': 2,
    'global-strict': 0,
    'no-extra-semi': 2,
    semi: ['error', 'never'],
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'no-unused-expressions': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'no-useless-constructor': 0,
    'prefer-const': 0,
    'no-trailing-spaces': [
      1,
      {
        skipBlankLines: true,
      },
    ],
    'no-unreachable': 1,
    'no-alert': 1,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
  },
}
