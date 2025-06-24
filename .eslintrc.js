
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended', // або vue/recommended якщо Vue 2
    'eslint:recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser', // або просто babel-eslint для старих проєктів
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": "off"  // Disable linebreak-style rule
  }
};
