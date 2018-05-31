# Complete starter seed project for Angular

## Bootstrap Branch

> Featuring Bootstrap 4 and ng-bootstrap, Webpack (and Webpack DLL plugin for faster dev builds), HMR (Hot Module Replacement), and @ngrx for state management.

###### You can use npm, but it's recommended to use yarn as it installs a lot faster and has other benefits https://yarnpkg.com/ . Make sure you are using yarn version 0.16.0 or newer (check with 'yarn --version')

```bash
git clone -b bootstrap https://github.com/qdouble/angular-webpack-starter.git
cd angular-webpack-starter
yarn
yarn start
```

### [Material Branch with Universal (Server-side rendering) support](https://github.com/qdouble/angular-webpack-starter)

### [Material Branch without Universal (Server-side rendering) support](https://github.com/qdouble/angular-webpack-starter/tree/no-universal-support)

### [Bootstrap and Universal Branch](https://github.com/qdouble/angular-webpack-starter/tree/bootstrap-and-universal)

### [Minimal Branch](https://github.com/qdouble/angular-webpack-starter/tree/minimal)

## Features

* Angular
  * Async loading
  * Treeshaking
  * AOT (Ahead of Time/ Offline) Compilation
  * AOT safe SASS compilation
* Webpack 4
  * Webpack Dlls (Speeds up devServer builds)
  * @ngTools AOT plugin
* HMR (Hot Module Replacement)
* TypeScript 2
  * @types
* Bootstrap 4 and @ng-bootstrap
* @ngrx
  * store (RxJS powered state management for Angular apps, inspired by Redux)
  * effects (Side effect model for @ngrx/store)
  * router-store (Bindings to connect angular/router to ngrx/store)
  * store-devtools (Developer Tools for @ngrx/store)
  * ngrx-store-logger (Advanced console logging for @ngrx/store applications, ported from redux-logger.)
  * ngrx-store-freeze in dev mode (@ngrx/store meta reducer that prevents state from being mutated.)
* Karma/Jasmine testing
* Protractor for E2E testing

## Project Goals

* The main goal is to provide an environment where you can have great dev tools and create a production application without worrying about adding a bunch of stuff yourself.
* The goal of your design should be so that you can easily copy and paste your app folder and your constants file into to a new update of this project and have it still work. Use constants and have proper separation to make upgrades easy. If you have any suggestions on areas where this starter can be designed to make updates more easy, file an issue.

## Basic scripts

Use `yarn start` for dev server. Default dev port is `3000`.

Use `yarn run start:hmr` to run dev server in HMR mode.

Use `yarn run build` for production build.

Use `yarn run server:prod` for production server and production watch. Default production port is `8088`.

Default ports and option to use proxy backend for dev server can be changed in `constants.js` file.

To create AOT version, run `yarn run build:aot`. This will compile and build script.
Then you can use `yarn run prodserver` to see to serve files.

### Store Logger

Store-logger outputs ngrx actions to the console.
To set your development mode store logging preference, go to the constant.js file and edit the `STORE_DEV_TOOLS` constant.
Available options are `logger | none`

### HMR (Hot Module Replacement)

HMR mode allows you to update a particular module without reloading the entire application.
The current state of your app is also stored in @ngrx/store allowing you to make updates to your
code without losing your currently stored state.

### AOT  Don'ts

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

### Testing

For unit tests, use `yarn run test` for continuous testing in watch mode and use
`yarn run test:once` for single test. To view code coverage after running test, open `coverage/html/index.html` in your browser.

For e2e tests, use `yarn run e2e`. To run unit test and e2e test at the same time, use `yarn run ci`.

### Wiki Links

[Recommended Steps for merging this starter into existing project](https://github.com/qdouble/angular-webpack-starter/wiki/Recommended-Steps-for-Merging-Starter-into-Existing-Project)

### License

[MIT](https://github.com/qdouble/angular-webpack-starter/blob/bootstrap/LICENSE)
