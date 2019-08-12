# BaseApp

This project is a bare-bones Angular website. Fork it to start your LASP website project.

BaseApp includes some sample pages and graphics, as well as header, footer, and search modules to be used as a standard across LASP sites.

## After you fork

You will need to change the following items:

* the name of the app in `package.json`
* the name of the project in `angular.json` -- change all instances of `base-app` to the name of your project
* the `<title>` tag in `src/index.html`
* navigation items, logos, and social links in `src/app.component.ts`
* header and footer configuration in `src/app.component.html`
* selector prefixes in `src/tslint.json` -- change `["app", "lasp"],` to something more specific to your app, i.e. `["lisird", "lasp"],`
* selector prefixes in your components -- change them to match the prefixes in the last step, i.e. `lisird-search-results` instead of `app-search-results`

You *might* need to change the following items:

* `src/favicon.ico` (unless you want to use the LASP logo)
* the Google Analytics ID in `src/environments/environment.prod.ts`
* the site's theme colors in `src/theme/theme-colors.scss`


## Modules

### LASP Nav

The Nav module provides a site header and navigation for both mobile and desktop views.

This module requires and imports the LASP Search Module.

### LASP Search

The Search module provides an input element for site-wide searches.

This module has no dependencies.

### LASP Footer

The Footer module includes logos, navigation links, a copyright statement, and other miscellaneous items that
generally belong in the footer of a website.

This module has no dependencies.

### LASP App

The LASP App Module rolls up the LASP Nav Module and the LASP Footer Module into one module.

## Development

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `npm run build:prod`  for a production build.

### Linting

Run `npm run lint` to lint your code, or run `npm run lint:watch` to automatically lint every time you change a file.

Automatically fix many linter warnings by running `npm run lint:fix`.

### Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
