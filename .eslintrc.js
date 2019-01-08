module.exports = {
    parser: "typescript-eslint-parser",
    // TODO: Add
    // - https://github.com/benmosher/eslint-plugin-import
    plugins: ["typescript", "prettier"],
    extends: ["plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        "prettier/prettier": "error",
        "typescript/class-name-casing": "error",
        // "typescript/explicit-function-return-type": "error",
        "typescript/member-ordering": "error",
        // "no-unused-vars": "error",
        // "typescript/no-unused-vars": "error",
        "typescript/no-use-before-define": "error",
        "typescript/type-annotation-spacing": "error",
        // "sort-imports": "error",
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
