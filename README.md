# BaseApp

This project is a bare-bones Angular website. A demo is available at http://base-app-demo.lasp.colorado.edu/ . 

Fork this repo to start your LASP website project.

BaseApp includes some sample pages and graphics, and includes the standard LASP header, footer, and search modules.

Checklist of things you will need for a new app:
- main logo, a horizontal logo for the upper left, height = ~208px
- smaller, text-based logo for the mobile/sticky header, height = ~88px
- if not using the standard LASP logo in the upper right, get the logo for the parent organization, height = ~208px
- favicon
- theme colors (this site is helpful for creating palettes: http://mcg.mbitson.com)
- a start on nav items (can be a different list for header and footer)
- social media links (if applicable)
    - facebook, twitter, youtube, and github have icons; if you need a new icon, get its background color (e.g., 'hotpink' or '#f34592' and svg path (e.g., 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z')
- partner logos (if applicable) for the footer, height = ~100px

For optimal performance, take a few minutes to ensure each logo is the proper size and most advantageous format, see https://www.interactivesearchmarketing.com/jpeg-png-proper-image-formatting/ for a quick summary of when to use .jpg vs .png.

## After you fork

**Do not make any changes to your forked repo until you follow these steps.**

* Run `npm install`
* Run `npm run after-fork` and follow the prompts.

## Contacts

BaseApp is collectively owned by the front-end developers in the LASP web team.

* **Experienced Devs:**
    * Hunter Leise (<Hunter.Leise@lasp.colorado.edu>)
    * Jenny Knuth (<Jennifer.Knuth@lasp.colorado.edu>)
    * Ransom Christofferson (<Ransom.Christofferson@lasp.colorado.edu>)
    * Ty Traver (<Tyler.Traver@lasp.colorado.edu>)


## Relevant JIRA Project(s)

* [WEBAPP](http://mods-jira.lasp.colorado.edu:8080/projects/WEBAPP/)


## Development

Whenever you make changes to BaseApp, keep in mind what a developer may need to do after forking this repo, and make changes to `after-fork.ts` or `after-fork.instructions` if necessary.

`after-fork.ts` is a script that automates many tasks, such as replacing 'base-app' with the name of the new project. `after-fork.instructions` is a set of instructions shown to the user which cannot easily be automated.

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

## DOCKER

If you are using docker, be sure to follow the instructions in after-fork.instructions.

### Building a docker image

Once you have followed the steps in after-fork.instructions you can run `./docker-build.sh` to build a new image locally

### Running a dev image locally

Once you have built your image using the command above, you can `./docker-run.sh` to start a local development image. This image will be served at `http://localhost:8080/dev`

To stop your image run `docker stop {{project-name}}`

Cleaning up old images is also a good idea from time to time. To clean up your unused docker resources run `docker system prune`

### Pushing an image to the LASP web registry

When you are ready to push your image, contact the web team infrastructure group for credentials and instructions on how to log in. Once this is complete you can run `./docker-publish.sh` to publish your image to the server.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
