---
slug: '/front-end-javascript-environment-variables'
date: '2019-05-27'
title: 'Managing Front-end JavaScript Environment Variables'
# Description should be no more than 160 characters in length
description: 'Learn why, when, and how to use environment variables for front-end JavaScript applications built with webpack, parcel, Create React App, and Gatsby.'
categories: ['javascript', 'react', 'gatsby']
banner: './images/banner.png'
---

![Managing Front-end JavaScript Environment Variables](./images/banner.png)

Environment variables are used in applications in order to have different behavior for different environments. For example, if an analytics tool is used in an application, it might be useful to send analytic events to different destinations depending on the environment so development and production related data doesn't get mixed together.

This article explains how the _[dotenv](https://github.com/motdotla/dotenv)_ package is the basis for implementing environment variables in JavaScript and how to use environment variables with project bundlers and popular front-end frameworks. The bundlers and frameworks that will be covered in this article are the following:

-   _[Webpack](https://webpack.js.org/)_
-   _[Parcel](https://parceljs.org/)_
-   _[Create React App](https://facebook.github.io/create-react-app/)_
-   _[Gatsby](https://www.gatsbyjs.org/)_

---

## dotenv

The _dotenv_ package is by far the most popular way of setting environment variables in JavaScript. The dotenv package works by reading environment variables found in different `.env` files. The main `.env` file usually contains production variables while other `.env` files with different suffixes contain variables for other environments. Here are some examples:

-   `.env.development` (used when running an app locally or on a development server)
-   `.env.staging` (used when running an app on a staging server)
-   `.env.test` (used when running tests)

### Assigning values

The way environment variables are specified in `.env` files as follows:

```bash
MY_VARIABLE=aCoolValue
ANOTHER_VARIABLE=yetAnotherValue
```

All values assigned to environment variables are represented as strings when they are accessed in JavaScript code. That means a variable assigned as `MY_VARIABLE=true` will have the value of `true` be the string `'true'` in JavaScript.

If spaces are required in the value of an environment variable, then quotes can be used around the value of the environment variable:

```bash
MY_VARIABLE="a cool value"
```

### Reading values

This article won't discuss how to setup _dotenv_ such that it loads the correct environment variables from the `.env` files since that is managed by the bundlers and frameworks that are mentioned later on in the article. However, in all the scenarios described in the article, environment variables are added to the `process.env` object and can, therefore, be accessed in JavaScript code using the following syntax:

```bash
process.env.MY_VARIABLE
```

### Build time injection

Environment variables are injected into applications at build/compile time, which means that a server will need to be restarted or the project files will need to be re-built in order to see changes made to values in `.env` files.

---

## Webpack

When using _webpack_, environment variables can be set using the [_DefinePlugin_](https://webpack.js.org/plugins/define-plugin/). _DefinePlugin_ allows global variables to be set and made available in JavaScript code. To use _DefinePlugin_, add it to a `webpack.config` file's plugins array:

```javascript
const webpack = require('webpack');

module.exports = () => ({
    plugins: [
        new webpack.DefinePlugin({
            'process.env.MY_VALUE': JSON.stringify('aCoolValue'),
        }),
    ],
});
```

In the above example, the environment variable can be accessed in JavaScript using `process.env.MY_VALUE`. It should be noted that the _DefinePlugin_ does a search and replace of the JavaScript where it will look up any references to `process.env.MY_VALUE` and replace it with `'aCoolValue'`. This means that `MY_VALUE` isn't a property on the `process.env` object and therefore `MY_VALUE` cannot be accessed by destructuring the `process.env` object:

```javascript
const { MY_VALUE } = process.env; // This won't work ❌
```

### Specifying Environments

There are many ways to specify different environments with _webpack_. A simple way is to pass the path of the `webpack.config` file that corresponds with the environment you would like to build:

```json
"scripts": {
  "build:development": "webpack --config webpack.config.development.js",
  "build:staging": "webpack --config webpack.config.staging.js",
  "build:production": "webpack --config webpack.config.production.js",
}
```

### Resources

[Webpack _DefinePlugin_ documentation](https://webpack.js.org/plugins/define-plugin)

[Using _dotenv_ in combination with DefinePlugin](https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5)

---

## Parcel

_[Parcel](https://github.com/parcel-bundler/parcel)_ uses _dotenv_ to manage environment variables. All that is required is to create `.env` files for different environments and then those variables will be made accessible in JavaScript code using the `process.env.VARIABLE_NAME` syntax.

### Specifying Environments

When running the normal parcel serve command (e.g. `parcel index.html`), the environment (specified by the `NODE_ENV` environment variable) will be _development_ by default. To specify an environment other than _development_ while using the parcel serve command, you can specify the environment when running the parcel serve command:

```bash
NODE_ENV=staging parcel index.html
```

When running the parcel build command (e.g. `parcel build index.html`), the environment will be _production_ by default. Again, you can specify a specific environment when running the build command:

```bash
NODE_ENV=staging parcel build index.html
```

### Order of priority/inheritance

Environment variables can be taken from multiple `.env` files. For example, all environments will inherit environment variables from the main `.env` file. If in a _development_ environment, you can inherit values from 4 different files: `.env.development.local`, `.env.development`, `.env.local`, and `.env`. If the same variables are found in multiple `.env` files, then the value for the environment variable will be taken with the `.env` file with the highest priority. Here is the order of priority, from highest to lowest:

-   `.env.${NODE_ENV}.local`
-   `.env.${NODE_ENV}`
-   `.env.local`
-   `.env`

> **Note:** The _test_ environment ignores all local `.env` files. This is done because the tests should produce the same result for everyone.

### Source control

You should commit all your `.env` files to source control with the exception of `.env*.local` files. The local `.env` files should only be used to tweak your app's configurations when running the app locally.

### Resources

[Parcel environment variables](https://parceljs.org/env.html)

[Parcel dotenv configuration](https://github.com/parcel-bundler/parcel/blob/75310e15f6fa3c8a0ce6593ada1bcca00240ea54/packages/core/parcel-bundler/src/utils/env.js) (repo code)

---

## Create React App

_[Create React App](https://facebook.github.io/create-react-app/)_ uses both _dotenv_ and _webpack_'s _DefinePlugin_ to manage environment variables. Just like with _parcel_, environment variables need to be defined in `.env` files at the same level as the project's `package.json` file.

### Naming requirements

Environment variables need to be prefixed by `REACT_APP_` in order for the variables to be accessible on the `process.env` object in JavaScript.

```bash
REACT_APP_MY_VARIABLE=testing123
```

### Specifying environments

_Create React App_ does not allow to change the value of the `NODE_ENV` environment variable. The `npm start` command will set the `NODE_ENV` to _development_, the `npm test` command will set the `NODE_ENV` to _test_, and the `npm run build` command sets the `NODE_ENV` to _production_.

Given that the `NODE_ENV` is set for you and that the value for `NODE_ENV` is used to reconcile the correct `.env` file, the following `.env` files can be used:

-   `.env`
-   `.env.local` (loaded for all environments except _test_)
-   `.env.development`, `.env.test`, `.env.production`
-   `.env.development.local`, `.env.test.local`, `.env.production.local`

### Order of priority/inheritance

The order of priority and inheritance is exactly the same as that described for the parcel bundler:

-   `.env.${NODE_ENV}.local`
-   `.env.${NODE_ENV}`
-   `.env.local`
-   `.env`

### Additional environments

To use environment variables for environments other than _development_, _test_, and _production_, you can create additional `.env` files and load the correct `.env` file using _[env-cmd](https://www.npmjs.com/package/env-cmd)_.

To take a _staging_ environment as an example:

-   Create a `.env.staging` file and add environment variables to the file
-   Add _env-cmd_ as a project dependency (`npm install env-cmd --save`)
-   Create script commands for the `staging` environment

```json
{
    "scripts": {
        "start:staging": "env-cmd .env.staging npm start",
        "build:staging": "env-cmd .env.staging npm run build"
    }
}
```

-   Run the `start:staging` or `build:staging` command to start a local _staging_ environment or to build the _staging_ environment bundle

It's important to note that the `NODE_ENV` will still be set to _development_ when running the `npm start` command and the `NODE_ENV` will be set to _production_ when running the `npm run build` command, so environment variables can still be loaded from either `.env.development` or `.env.production` depending on the command used.

For example, running the `start:staging` command from above would load environment variables from the following files (in order of priority):

-   `.env.staging`
-   `.env.development.local`
-   `.env.development`
-   `.env.local`
-   `.env`

### Source control

Just like with _Parcel_, you should commit all your `.env` files to source control with the exception of `.env*.local` files. The local `.env` files should only be used to tweak your app's configurations when running the app locally.

### Resources

[CRA environment variable documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#docsNav)

[CRA dotenv configuration](https://github.com/facebook/create-react-app/blob/4562ab6fd80c3e18858b3a9a3828810944c35e36/packages/react-scripts/config/env.js) (repo code)

[CRA webpack configuration](https://github.com/facebook/create-react-app/blob/b36d1ea1aa1458907839da9dd5028a372f9d48d0/packages/react-scripts/config/webpack.config.js#L572) (repo code)

---

## Gatsby

_Gatsby_ handles environment variables in a unique way compared to _Create React App_ and _Parcel_. _Gatsby_ uses both _dotenv_ and _webpack_'s DefinePlugin to manage environment variables.

By default, _Gatsby_ supports a _development_ and a _production_ environment, so environment variables should be added to either a `.env.development` or a `.env.production` file. _Gatsby_ does not support `.env` files that do not contain a suffix.

### Naming requirements

Any environment variables that are used in the front-end code should be prefixed with `GATSBY_` in order for the environment variables to work properly in a deployed environment.

If an environment variable is not used in the front-end code but rather used at some point in the _Gatsby_ build process, it does not need to be prefixed by `GATSBY_` when the environment variable is defined in `.env` files.

See the "Source control" section below for some exceptions to these naming requirements.

### Specifying environments

When running the `gatsby develop` command, that will set the `NODE_ENV` to _development_ and environment variables will be taken from `.env.development`. When building the app using `gatsby build`, the `NODE_ENV` will be set to _production_ and environment variables will be taken from `.env.production`.

If you'd like to have more than a _development_ and a _production_ environment, you can do so by specifying a value for `GATSBY_ACTIVE_ENV` when running one of the gatsby commands. For example, if you were to have a `.env.staging` file, you would be able to access the variables from that file by running one of the following commands:

```bash
GATSBY_ACTIVE_ENV=staging gatsby develop
GATSBY_ACTIVE_ENV=staging gatsby build
```

> **Note:** if using `GATSBY_ACTIVE_ENV` to select a different `.env` file, then the environment variables from `.env.development` and `.env.production` will be ignored.

### Source control

_Gatsby_ recommends that you don't commit your `.env` files to source control, but rather add environment variables to your app's hosting provider's deployment tool. This is because sometimes API keys are required to perform certain operations during the _Gatsby_ build step (which is done in a backend-end environment). Because you don't want these private API keys exposed to the public through source control, these API keys should be stored in `.env` files that are not committed to source control.

If you do decide to commit your `.env` files to source control and make those available on your hosted environment, you do not need to prefix any of your environment variables by `GATSBY_`, even if those environment variables are used on the front-end.

### Resources

[_Gatsby_ environment variable documentation](https://www.gatsbyjs.org/docs/environment-variables/)

[_Gatsby_ _dotenv_ config](https://github.com/gatsbyjs/gatsby/blob/2870dfb6760d205738573c5b6b320dbdbfc0b156/packages/gatsby/src/utils/webpack.config.js#L50) (repo code)

[_Gatsby_ _webpack_ config](https://github.com/gatsbyjs/gatsby/blob/2870dfb6760d205738573c5b6b320dbdbfc0b156/packages/gatsby/src/utils/webpack.config.js#L186) (repo code)

---

## A note on environment variables and source control

Almost all the articles I've read on environment variables say to never commit your `.env` files to source control, so I've been terrified to do so for so long. However, this is bad advice. If all your environment variables will be embedded in your front-end JavaScript code, then there is no harm in committing your `.env` files to source control. Any environment variable used in your front-end code will be viewable in the browser if a user decides to inspect the browser's source code.

In fact, I would recommend committing these files in source control as this will make the installation process for a project much simpler for all developers. It's even OK to commit API keys saved in your environment variables as long as **you're sure** those API keys are being used in your front-end code and that is how they are intended to be used. For example, if you'd like to embed Google Maps on a web page, it's required to use a Google Maps API key to do that. That API key has no choice but to be exposed to the public since it will be [part of an `iframe`'s `src` value](https://developers.google.com/maps/documentation/embed/guide).

You might think that having an API key exposed to the public is bad since anyone will be able to use that API key and then potentially max our your API call limits. However, API keys that need to be exposed to the front-end (like the Google Maps API key mentioned above), have ways to restrict the usage of the API keys by restricting usage to certain IP addresses, referrer URLs, and mobile apps. You can read Google's recommendation for [API Key Best Practices](https://developers.google.com/maps/api-key-best-practices) for more details.

With all that being said, if you are using API keys for back-end code (like what could be the case when building a Gatsby site), then the API keys should be kept in `.env` files and those files should not be committed to source control.

---

Hopefully, this article gives you a better idea of when, why, and how to use environment variables in your front-end JavaScript applications. Let me know if you have other useful tips related to environment variables.

Interested in learning how environment variables should be configured on the back-end with Node.js? [Read this excellent article](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786) by John Papa.
