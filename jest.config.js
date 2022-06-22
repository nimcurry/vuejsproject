module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    browsers: [
      'chrome',
      'firefox',
      'safari',
    ],
  },
  preset: '@vue/cli-plugin-unit-jest',
  // transform: { '^.+\\.vue$': 'vue-jest' },
  transform: { '^.+.js$': 'babel-jest', '.*.(vue)$': '@vue/vue3-jest' },
};
