# ng-seed/universal

[![CircleCI](https://circleci.com/gh/ng-seed/universal.svg?style=shield)](https://circleci.com/gh/ng-seed/universal)
[![coverage](https://codecov.io/github/ng-seed/universal/coverage.svg?branch=master)](https://codecov.io/gh/ng-seed/universal)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Greenkeeper badge](https://badges.greenkeeper.io/ng-seed/universal.svg)](https://greenkeeper.io/)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`ng-seed/universal`** is a seed project for Angular Universal apps following the common patterns and [best practices](https://angular.io/styleguide)
in file and application organization, providing the following features:

- [x] [Angular] as the application framework.
- [ ] [Angular Material] as the UI language and component library.
- [ ] [Angular Flex Layout] for dynamic responsive layouts.
- [x] Ready-to-go build system using [gulp] and [Webpack] for working with [TypeScript].
- [x] [angular-webpack-config] as configuration preset for [Webpack].
- [x] Adjustable build configuration via `json` file (`./tools/build/build-config.json`).
- [x] Managing the type definitions using [@types].
- [x] Production and development modes.
- [x] [Webpack DLL]s to speed up development builds.
- [x] Hot Module Replacement with [Webpack] and [webpack-hot-middleware].
- [x] [AoT compilation] for rapid page loads on production builds (*using [@ngtools/webpack]*).
- [x] Tree-shaking the production builds with `harmony` branch of [UglifyJs2].
- [x] Both inline and external [SCSS] compilation.
- [x] [Lazy loading] of modules.
- [ ] Uses [ngx-universal] for express engine and caching server responses on client bootstrap (no flickering).
- [x] Uses [ngrx/store] for **state management**.
- [x] Uses [ngx-config] for configuration management.
- [ ] Uses [ngx-auth] for basic JWT-based authentication.
- [x] Uses [ngx-cache] for caching.
- [x] Uses [ngx-translate] for i18n support.
- [x] Uses [ngx-meta] for SEO (*title, meta tags, and Open Graph tags for social sharing*).
- [ ] Uses [ngx-i18n-router] for localized routes.
- [x] Vendor-agnostic analytics using [angulartics2].
- [x] Unit tests with [Jest], including code coverage.
- [ ] End-to-end tests with [Protractor].
- [x] [CircleCI] for continuous integration and testing support.
- [x] [angular-tslint-rules] as configuration preset for [TSLint] and [codelyzer].

> Built with `Angular v4.3.0`, bundled with `gulp v4.0` and `webpack v3.5.6`.

You can find the live app [here](https://ng-seed-universal.azurewebsites.net).

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Setting up upstream repository](#setting-up-upstream-repository)
  - [Building](#building)
- [Directory structure](#directory-structure)
- [Configuring `ng-seed/universal`](#configuring)
- [External stylesheets](#external-scss)
- [Contributing](#contributing)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
Packages in this seed project depend on `@angular v4.3.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.3.4`** or higher.

## <a name="getting-started"> Getting started
### <a name="installation"> Installation
You can install **`ng-seed/universal`** by simply forking the repo:
```
# clone the repo
$ git clone https://github.com/ng-seed/universal.git [your-project-name]
$ cd [your-project-name]
```

### <a name="setting-up-upstream-repository"> Setting up upstream repository
Once you have cloned the repo, you can follow these steps to allow sync changes made in this repo with your fork:
```
# set up `origin`
$ git remote set-url origin [your-fork-repo]

# set up `upstream` to sync future changes
$ git remote add upstream https://github.com/ng-seed/universal.git

# verify the upstream repo specified for your fork
$ git remote -v
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (fetch)
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (push)
upstream  https://github.com/ng-seed/universal.git (fetch)
upstream  https://github.com/ng-seed/universal.git (push)

# initial push for the fork
$ git push
```

Now, you can create a new directory (*ex: `src/client/app/shared`*) to build your codebase out, while benefiting from the
client framework located at the `src/client/app/framework` directory.

In order to merge the latest upstream changes, simply follow:
```
# fetch the latest upstream
$ git fetch upstream

# merge the upstream changes
$ git merge upstream/master
```
then handle any conflicts, and go on with building your app.

### <a name="building"> Building
These are the scripts to lint, test and build this seed project:
```
# use npm (or yarn) to install the dependencies
$ npm install

# run tslint
$ npm run lint

# run unit tests
$ npm test

# dev build (SPA / lean Angular)
$ npm run rebuild:spa-dev
# prod build (SPA / lean Angular)
$ npm run rebuild:spa-prod

# start the server (SPA / lean Angular)
$ npm run serve:spa
# start the server (SPA / lean Angular, with HMR support)
$ npm run serve:spa-hmr

# dev build (Universal)
$ npm run rebuild:universal-dev
# prod build (Universal)
$ npm run rebuild:universal-prod

# start the server (Angular Universal)
$ npm run serve
```

Navigate to `http://localhost:1337` for **lean Angular** (*client-side rendering*) and `http://localhost:8000` for **Angular
Universal** (*server-side rendering*) in your browser.

## <a name="directory-structure"></a> Directory structure
We use the component approach in this seed project, which is a standard for developing Angular apps and also a great way
to ensure maintainable code by encapsulation of our behavior logic.

A component is basically a self contained app usually in a single file or a directory with each concern as a file: style,
template, specs, and component class.

> As an old convention, we use the `+` prefix for lazy-loaded modules. Please keep in mind that it does nor change the router
behavior, neither makes the directory unworkable. It's just a handy method to identify lazy-loaded modules by looking at
the directory structure.

```
universal/
 ├──.cache/                         * cache directory for ngx-cache
 ├──.circleci/
 |   └──config.yml                  * CircleCI config
 ├──.github/                        * issue & pr templates
 ├──.server/                        * dev server, output directory to extract server bundles
 ├──coverage/                       * test coverage reports
 ├──node_modules/                   * dependencies
 ├──public/                         * output directory to extract client bundles
 |
 ├──src/
 |   ├──client/                     * client code
 |   |   ├──app/
 |   |   |   ├──components/         * components (USE HERE)
 |   |   |   |   ├──some-module/    * some module (as an example)
 |   |   |   |   └──+lazy-module/   * some LAZY module (attn to the `+` prefix for lazy-loaded modules)
 |   |   |   └──framework/          * client framework
 |   |   └──assets/                 * static assets (scss, img, json, etc.)
 |   ├──coverage/                   * e2e (integration) tests
 |   └──server/                     * server code
 |
 ├──tools/
 |   ├──build/                     * build config and scripts (gulp, webpack, etc.)
 |   ├──config/                    * config files for static-assets (stylelint, postcss, etc.)
 |   └──test/                      * test setup/scripts
 |
 ├──.gitignore                     * GIT settings
 ├──.jshintrc                      * jshint config
 ├──CHANGELOG.md                   * change log
 ├──CODE_OF_CONDUCT.md             * code of conduct
 ├──CONTRIBUTING.md                * contributing info
 ├──gulpfile.js                    * gulp entry point
 ├──LICENSE                        * software license
 ├──package.json                   * deps management
 ├──README.md                      * project information
 ├──test-report.xml                * JUNIT test results
 ├──tsconfig.json                  * typescript config
 ├──tslint.json                    * tslint config
 └──yarn.lock                      * deps lockfile
```

## <a name="configuring"></a> Configuring `ng-seed/universal`
Most of the configuration is done via `./tools/build/build.config.json`, where you can customize host name, port numbers,
and output directories for your app.

## <a name="external-scss"></a> External stylesheets
Any stylesheets (*SCSS*) placed in the `src/client/assets/scss` directory and imported into your project will automatically
be compiled into an external .css and embedded in your production builds.

All other stylesheets (*SCSS*) located below `src/client/app` scope will become extracted into the generated bundle (*inline*).

## <a name="contributing"></a> Contributing
If you want to file a bug, contribute some code, or improve documentation, please read up on the following contribution guidelines:
- [Issue guidelines](CONTRIBUTING.md#submit)
- [Contributing guidelines](CONTRIBUTING.md)
- [Coding rules](CONTRIBUTING.md#rules)
- [Change log](CHANGELOG.md)

## <a name="license"></a> License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[Angular]: https://github.com/angular/angular/blob/master/CHANGELOG.md
[Angular Material]: https://material.angular.io
[Angular Flex Layout]: https://github.com/angular/flex-layout
[gulp]: http://gulpjs.com
[Webpack]: http://webpack.github.io
[TypeScript]: https://github.com/Microsoft/TypeScript
[angular-webpack-config]: https://github.com/ng-seed/angular-webpack-config
[@types]: https://www.npmjs.com/~types
[Webpack DLL]: https://robertknight.github.io/posts/webpack-dll-plugins
[webpack-hot-middleware]: https://github.com/glenjamin/webpack-hot-middleware
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[@ngtools/webpack]: https://www.npmjs.com/package/@ngtools/webpack
[UglifyJs2]: https://github.com/mishoo/UglifyJS2/tree/harmony
[SCSS]: http://sass-lang.com
[Lazy loading]: https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html
[ngx-universal]: https://github.com/fulls1z3/ngx-universal
[ngrx/store]: https://github.com/ngrx/store
[ngx-config]: https://github.com/fulls1z3/ngx-config
[ngx-auth]:  https://github.com/fulls1z3/ngx-auth
[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[ngx-translate]: https://github.com/ngx-translate/core
[ngx-meta]: https://github.com/fulls1z3/ngx-meta
[ngx-i18n-router]: https://github.com/fulls1z3/ngx-i18n-router
[angulartics2]: https://github.com/angulartics/angulartics2
[Jest]: https://facebook.github.io/jest
[Protractor]: http://www.protractortest.org
[CircleCI]: https://circleci.com
[angular-tslint-rules]: https://github.com/fulls1z3/angular-tslint-rules
[TSLint]: https://github.com/palantir/tslint
[codelyzer]: https://github.com/mgechev/codelyzer
[Burak Tasci]: http://www.buraktasci.com
