# What is it?
inCite is a Google Chrome extension built with React and MobX. It allows users to easily create web-related bibliographies by fetching the metadata from their active webpage, generating a citation for it in several styles and adding it to their bibliography at the click of a button. It supports storage of multiple bibliographies, several citation styles and editing if needed. Future updates may include shared/sync'd bibliographies, metadata querying for other materials (ex. books, newspaper articles, etc) or anything else that comes to mind.

# To anyone thinking of building on this
We tried to keep the project as simple as possible for development. It follows the standard set of steps for most React extensions:

1. Clone or download the project.
2. Go to the project's root directory and run `npm i`.
3. In the root directory, run `npm run build` (or `yarn build`).
4. Go to `chrome://extensions/`. Enable developer mode in the top-right corner and drag and drop the build folder from the project's root directory onto the Chrome page. From here, you should be able to see the inCite icon with the rest of your extensions which can be used for testing as you build the app.
5. After changing code, if you want to see changes, run `npm run build` or `yarn build` and check the updates to the extension in Chrome.

## Our general file structure is:
- `/bin` contains scripts used by the project. At the moment, in only contains a single script run when building the project to un-inline js code which is needed to run the project
- `/src/assets` contains the project's assets and fonts
- `/src/components` contains resuable (to some degree), custom components used throughout the project that match the general style used
- `/src/navigator` contains the App. It selects which screen to render based on navigation handled in the MobX store and/or localstorage
- `/src/pages` contains the implementations of each screen. The code in the project follows the presentational/container components structure (also known as smart/dumb components). In this projects, container/smart components can be found in` /src/pages/screens` and presentational/dumb components can be found in `/src/pages/views`
- `/src/services` contains various tools used in the project including citation generating and sorting
- `/src/stores` contains MobX stores. This handles almost all of the state management used throughout the app. There are a few exceptions at the time of writing which will be fixed soon
- `/test` is designated for tests. At the moment, only a few tests exist for some citations styles. Future additions may include Storybook UI tests and more extensive citation generating unit tests

### A few things to note are:
- This project was mostly developed with Chrome in mind so it should work on Chrome and Chromium-based browsers.
- It is untested on non-Chrome browsers and functionality like auto-fetching metadata will likely not work on these browsers.