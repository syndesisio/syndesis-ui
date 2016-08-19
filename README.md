# Hawtio iPaaS
The front end application for Red Hat iPaaS - a flexible, customizable, cloud-hosted platform that provides core integration capabilities as a service. It leverages Red Hat's existing product architecture with OpenShift Online/Dedicated and Fuse Integration Services. For the back end application, please see [this repo](https://github.com/fabric8io/fabric8-forge).

Included in this stack are the following technologies:

>- Language: [TypeScript](http://www.typescriptlang.org) (JavaScript with @Types)
- Framework: [Angular 2](https://angular.io/)
- Module Bundler: [Webpack](http://webpack.github.io/)
- Design Patterns: [PatternFly](https://www.patternfly.org/#_)
- Material Design: [Angular Material](https://material.angularjs.org/latest/)
- Data Visualization: [C3](http://c3js.org/)
- Testing: [Jasmine](http://jasmine.github.io/) (BDD Unit Test Framework), [Karma](https://karma-runner.github.io/1.0/index.html) (Unit Test Runner), [Protractor](http://www.protractortest.org/#/) (E2E Framework), [Istanbul](https://github.com/gotwarlost/istanbul) (Code Coverage)
- Linting: [TsLint](https://github.com/palantir/tslint) (Linting for TypeScript)
- Code Analysis: [Codelyzer](https://github.com/mgechev/codelyzer) (TsLint rules for static code analysis of Angular 2 TypeScript projects)

### Quick Start
**Make sure you have node version >= 6.x.x and NPM version >= 3.x.x**

> Clone/download the repo start editing `app.component.ts` inside [`/src/app/`](/src/app/app.component.ts)

```
# clone our repo
git clone https://github.com/hawtio/hawtio-ipaas.git

# change directory to iPaaS
cd hawtio-ipaas

# install the repo with npm
npm install

# start the server
npm start
```

Go to [http://0.0.0.0:1337](http://0.0.0.0:1337) or [http://localhost:1337](http://localhost:1337) in your browser.

# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running](#running)
    * [Testing](#testing)
    * [Configuring](#configuring)
* [Contributing](#contributing)
* [Resources](#resources)


## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app, usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class.
```
hawtio-ipaas/
 ├──config/                    * our configuration
 |   ├──helpers.js             * helper functions for our configuration files
 |   ├──karma.conf.js          * karma config for our unit tests
 |   ├──protractor.conf.js     * protractor config for our end-to-end tests
 |   ├──spec-bundle.js         * ignore this magic that sets up our angular 2 testing environment
 │   ├──webpack.dev.js         * our development webpack config
 │   ├──webpack.prod.js        * our production webpack config
 │   └──webpack.test.js        * our testing webpack config
 │
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──index.html             * where we generate our index page
 │   │
 |   ├──main.browser.ts        * our entry file for our browser environment
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 |   ├──vendor.ts              * our vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.component.ts   * a simple version of our App component components
 │   │   ├──app.e2e.ts         * a simple end-to-end test for /
 │   │   └──app.spec.ts        * a simple test of components in app.ts
 │   │
 │   └──assets/                * static assets are served here
 │       ├──human.txt          * for humans to know who the developers are
 │       ├──icon/              * our list of icons from www.favicon-generator.org
 │       ├──robots.txt         * for search engines to crawl your website
 │       └──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │
 │
 ├──npm-shrinkwrap.json        * npm's way of allowing us to control exact versions of dependencies
 ├──package.json               * what npm uses to manage it's dependencies
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──tslint.json                * typescript lint config
 ├──typedoc.json               * typescript documentation generator
 └──typings.json               * our typings manager
```

# Getting Started
## Dependencies
What you need to run this app:

- `node` and `npm` (`brew install node` for OS X users)
- Ensure you're running the latest versions Node `v6.x.x`+ and NPM `3.x.x`+

## Installing
* `fork` the ipaas repo
* `clone` your fork
* `npm install` to install all dependencies
* `npm start` to start the dev server

## Running
After you have installed all dependencies you can now run the app. Run `npm start` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:1337` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:1337/`).

### Development
```bash
$ npm start
```

### Production
```
$ npm run build:prod
$ npm run server:prod
```

For a list of common commands, see [here](/docs/commands.md).

## Testing

### Run Tests
```
npm run test
```

### Watch and Run Tests
```
npm run watch:test
```

For a list of common commands, see [here](/docs/commands.md).

## Configuring
Configuration files live in `/config`. Configuration files are currently available for Webpack, Karma, and Protractor.

# Contributing
Pull requests are always welcome. Please read through our [Contribution](/docs/contributing.md) guidelines in the `/docs` directory.

# Resources
Resources used in planning and developing this project.

- [Backend of iPaaS](https://github.com/fabric8io/fabric8-forge)
- [Design Prototype](https://projects.invisionapp.com/share/4P84NS9K6#/screens)
- [Entity Relationships](/docs/entities.md)
- [Google Drive iPaaS Folder](https://drive.google.com/drive/folders/0B8Kpb4FsPn_fQ3NsOVRlNzIzZTg?usp=sharing)
- [User Flow](https://drive.google.com/a/redhat.com/file/d/0B5uwxxDGbUVzNTl4aFQ4NVNnWlE/view)

## Frequently Asked Questions (FAQ)
You can read our FAQ, located in our `/docs` directory, [here](/docs/faq.md).

