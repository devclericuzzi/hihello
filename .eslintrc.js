module.exports = {
  ignorePatterns: ["dist/**"],
  env: {
    node: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: null,
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
  rules: {
    "prettier/prettier": ["warn", { semi: true, trailingComma: "all", singleQuote: false, printWidth: 120 }],
    "@typescript-eslint/ban-ts-comment": "off",
  },
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/consistent-type-imports": [
          "warn",
          {
            prefer: "type-imports",
            disallowTypeAnnotations: false,
          },
        ],
        "@typescript-eslint/ban-ts-comment": ["warn", "off"],
        "@typescript-eslint/no-unsafe-member-access": "off",
        //Typescript does a better job of detecting this, eslint has a lot of false positives
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
