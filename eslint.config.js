const antfu = require("@antfu/eslint-config").default;

module.exports = antfu(
  {
    typescript: true,
    stylistic: {
      quotes: "double",
      semi: true,
    },
  },
  {
    rules: {
      "curly": ["error", "all"],
      "no-lone-blocks": "off",
      "style/brace-style": "off",
      "ts/brace-style": ["error", "1tbs"],
      "ts/consistent-type-imports": "off",
    },
  },
);
