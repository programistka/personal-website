module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: [
        "prettier",
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
        "prettier/prettier": "error",
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

// Old tslintrc for reference
// {
//     "rulesDirectory": ["tslint-plugin-prettier"],
//     "defaultSeverity": "error",
//     "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
//     "jsRules": {},
//     "rules": {
//         "prettier": true,
//         "interface-name": ["never-prefix"],
//         "interface-over-type-literal": false,
//         "member-access": [false],
//         "ordered-imports": false,
//         "no-unused-expression": true,
//         "no-console": [false],
//         "no-var-requires": false,
//         "arrow-parens": false,
//         "object-literal-sort-keys": false,
//         "object-literal-key-quotes": [true, "as-needed"],
//         "only-arrow-functions": false,
//         "jsx-no-multiline-js": false,
//         "jsx-no-lambda": false
//     }
// }
