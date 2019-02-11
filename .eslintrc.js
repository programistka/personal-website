module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: [
        "import",
    ],
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended", // Make sure "plugin:prettier/recommended" is always the last extension in the extends array
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            "jsx": true
        }
    },
    rules: {
        "@typescript-eslint/camelcase": "warn",
        "import/order": ["error", { "newlines-between": "always"}],
        "import/named": "off",
        "@typescript-eslint/array-type": ["error", "array"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "react/no-unescaped-entities": "off"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
}