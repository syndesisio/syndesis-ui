# Command List
For a more complete list of commands we recommend you explore the `"scripts"` section of the `package.json` file.

## Running

### Development
```bash
$ npm start
```

### Production
```
$ npm run build:prod
$ npm run server:prod
```

## Building

### Build Files: Development
```
$ npm run build:dev
```

### Build Files: Production
```
$ npm run build:prod
```

### Hot Module Replacement
Webpack allows you to swap out modules dynamically during runtime by adding an HMR to your bundle during build time. It runs inside of your app and tracks your modules for changes, with consideration of their dependencies. To read more about Webpack's Hot Module Replacement (HMR) feature, click [here](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html). It can be used as a replacement for LiveReload and has a wide variety of features.
```
$ npm run server:dev:hmr
```

### Watch and Build Files
```
$ npm run watch
```


## Testing

### Run Tests
```
npm run test
```

### Watch and Run Tests
```
npm run watch:test
```

### Run End-to-End Tests
```
# make sure you have your server running in another terminal
npm run e2e
```

### Run Webdriver (for End-to-End)
```
npm run webdriver:update
npm run webdriver:start
```

### Run Protractor's elementExplorer (for End-to-End)
```
npm run webdriver:start
# in another terminal
npm run e2e:live
```

