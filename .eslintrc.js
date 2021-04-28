module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential', // 必须遵守的
    // 'plugin:vue/strongly-recommended', // 强烈推荐的
    // 'plugin:vue/recommended', // 推荐的
    '@vue/airbnb', // airbnb风格规范
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ["**/dist/**/*.js", "**/.vscode/*.js"],
  rules: {
    'linebreak-style': 'off',
    'max-len': ['error', 200],
    'no-console': 'off',
    'no-debugger': 'off',
  },
};