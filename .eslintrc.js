module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: { parser: '@babel/eslint-parser' },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'object-curly-newline': ['error', { multiline: true, minProperties: 4 }],
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/alt-text': 'off',
    'vue/comment-directive': 'off',
    'vue/no-reserved-component-names': ['error', {
      disallowVueBuiltInComponents: false,
      disallowVue3BuiltInComponents: false,
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: { jest: true },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: { jest: true },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: { jest: true },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: { jest: true },
    },
  ],
};
