module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["prettier", "import"],
    extends: ["plugin:prettier/recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            "jsx": true
        }
    },
    rules: {
        "prettier/prettier": "error",
        "import/order": ["error", { "newlines-between": "always"}],
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
