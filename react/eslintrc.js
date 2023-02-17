module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
  ],
  ignorePatterns: ["**/dist/**/*.js", "**/.vscode/*.js", "**/node_modules/**/*.js"],
  rules: {
    "no-console": "off",
    "no-unused-vars": "off"
  }
};