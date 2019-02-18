---
slug: '/using-eslint-and-prettier-in-a-typescript-project'
date: '2019-02-10'
title: 'Using ESLint and Prettier in a TypeScript Project'
description: "ESLint's large set of linting rules and the increased commitment to use ESLint by the TypeScript team makes ESLint a great tool for linting TypeScript projects."
categories: ['typescript', 'javascript', 'developer tools']
banner: './images/banner.png'
---

import Link from "$components/Link";

![Banner Image.](./images/banner.png)

When it comes to linting TypeScript code, there are two major linting options to choose from: <Link to="https://palantir.github.io/tslint/">TSLint</Link> and <Link to="https://eslint.org/">ESLint</Link>. TSLint is a linter than can only be used for TypeScript, while ESLint supports both JavaScript and TypeScript.

In the <Link to="https://github.com/Microsoft/TypeScript/issues/29288#developer-productivity-tools-and-integration">TypeScript 2019 Roadmap</Link>, the TypeScript core team explains that **ESLint has a more performant architecture than TSLint** and that they will **only be focusing on ESLint** when providing editor linting integration for TypeScript. For that reason, I would recommend using ESLint for linting TypeScript projects.

---

## Setting up ESLint to work with TypeScript

First, install all the required dev dependencies:

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

-   <Link to="https://www.npmjs.com/package/eslint"><code>eslint</code></Link>: The core ESLint linting library
-   <Link to="https://www.npmjs.com/package/@typescript-eslint/parser"><code>@typescript-eslint/parser</code></Link>: The parser that will allow ESLint to lint TypeScript code
-   <Link to="https://www.npmjs.com/package/@typescript-eslint/eslint-plugin"><code>@typescript-eslint/eslint-plugin</code></Link>: A plugin that contains a bunch of ESLint rules that are TypeScript specific

Next, add an `.eslintrc.js` configuration file in the root project directory. Here is a sample configuration for a TypeScript project:

```javascript
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
};
```

**Note:** I prefer using a JavaScript file for the `.eslintrc` file (instead of a JSON file) as it supports comments that can be used to better describe rules.

If using TypeScript with React, the <Link to="https://www.npmjs.com/package/eslint-plugin-react"><code>eslint-plugin-react</code></Link> dev dependency should be installed and the following configuration can be used:

```javascript
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
```

Ultimately it's up to you to decide what rules you would like to extend from and which ones to use within the `rules` object in your `.eslintrc.js` file.

## Adding Prettier to the mix

What works well along with ESLint is <Link to="https://prettier.io/">prettier</Link>, which does a great job at handling code formatting. Install the required dev dependencies to get prettier working with ESLint:

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
```

-   <Link to="https://www.npmjs.com/package/prettier"><code>prettier</code></Link>: The core prettier library
-   <Link to="https://www.npmjs.com/package/eslint-config-prettier"><code>eslint-config-prettier</code></Link>: Disables ESLint rules that might conflict with prettier
-   <Link to="https://www.npmjs.com/package/eslint-plugin-prettier"><code>eslint-plugin-prettier</code></Link>: Runs prettier as an ESLint rule

In order to configure prettier, a `.prettierrc.js` file is required at the root project directory. Here is a sample `.prettierrc.js` file:

```javascript
module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
};
```

Next, the `.eslintrc.js` file needs to be updated:

```javascript
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
};
```

The advantage of having prettier setup as an ESLint rule using `eslint-plugin-prettier` is that code can automatically be fixed using ESLint's `--fix` option.

## Automatically Fixing Code (VS Code)

For a good developer experience, it's useful to setup your editor to automatically run ESLint's automatic fix command (i.e. `eslint --fix`) whenever a file is saved. Since i'm using VS Code, here is the config required in the `settings.json` file in VS Code to get automatic fixing whenever saving a file:

```json
"eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {"language": "typescript", "autoFix": true },
    {"language": "typescriptreact", "autoFix": true }
],
```

If you've also set the `editor.formatOnSave` option to `true` in your `settings.json`, you'll need to add the following config to prevent running 2 formatting commands on save for JavaScript and TypeScript files:

```json
"editor.formatOnSave": true,
"[javascript]": {
    "editor.formatOnSave": false,
},
"[javascriptreact]": {
    "editor.formatOnSave": false,
},
"[typescript]": {
    "editor.formatOnSave": false,
},
"[typescriptreact]": {
    "editor.formatOnSave": false,
},
```

---

And there you have it. That's how you can lint a TypeScript project using ESLint. If you want to make sure all the files you commit to git pass the ESLint checks, take a look at <Link to="https://github.com/okonet/lint-staged">lint-staged</Link>, which can run ESLint on files being commited.