# Garden Adventures: DHBW STUTTGART INF21B Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/melonjs/es6-boilerplate/blob/master/LICENSE)

Description of the game here...

## Git Workflow

- Als erstes: `git fetch [optional-branch-name]` (aktueller Stand abholen)
- Git Branch wechsln: `git branch [branch-name]` (Alle branches anzeigen mit `git branch`)
- Arbeiten in branch
- Fertig:
- `git add .` (ganzes Verzeichnis hinzufügen)
- `git commit -m "[type]: [message]"` (meistens types: feat oder bug)(eslint checkt ob code gut und commitmessage i.O.)
- `git push`

## Prerequisites

Ensure you have [Node.js](http://nodejs.org/) >= 19.8.1 installed, then clone the repository, `cd gardenAdventures` and run:

    $ [sudo] npm install

## Usage

### Common

- `npm run dev` to start the dev server on watch mode at `localhost:9000`.
- `npm run build` to generate a minified, production-ready build, in the `public` folder.
- `npm run lint` to automaticly check the ts and js files in `src` folder.
- `npm run prettier` to automaticly format the code.

> Note: when generating the production build, Webpack will attempt to filter files under the data folder to only copy final assets and ignore project files (e.g. .ftpp project files from Free Texture Packer). If you find your file being wrongly ignore you can easily add the corresponding extension in the [webpack.config.js](webpack.config.js) file

### Git commit and push

- `git add .` to add the current folders or `git add [filename | dir]` to add filename or dir directly.
- `git commit -m "[commit type]:[custom commit text]"` to commit. Commit types an be found under commitlint.config.js, e.g. `git commit -m "feat: hero can jump"`. Git commit will automaticly pre-check the code and check if the commit type is valid.
- `git push` to push to the remote repository. git push will automaticly pre-build, only if success push.

## Folder structure

```none
src
└── data
│    ├── bgm
│    ├── fnt
|    ├── img
|    ├── map
|    └── sfx
└── favicon
└── js
|    ├── renderables
|    └── stage
└── types
├── index.js
├── index.css
├── index.html
├── manifest.ts
public
├── data
├── bundle.js
└── index.html
```

- `src`
  - the root folder for your game source code
  - The entry file is [index.js](src/index.js).
  - [index.css](src/index.css) and [index.html](src/index.html) are default templates that can be customized
  - [manifest.js](src/manifest.ts) is a list of asset to be preloaded by melonJS (these won't be automatically imported and bundled by webpack)
- `src/js`
  - add your source classes here
- `src/data`
  - where to add your game assets
- `public`
  - where the production-ready build files will be copied/generated when using `npm run build`

## Debug plugin

The boilerplate include the melonJS plugin, and will automatically import and instantiate it when running under a development environement.

the Debug Panel is hidden by default and can be displayed using the "S" key, see [here](https://github.com/melonjs/debug-plugin/blob/main/README.md) for more details about the plugin.

## melonJS ES6 Webpack Boilerplate from melonjs

A simple ES6 Webpack based boilerplate to create games with [melonJS](https://github.com/melonjs/melonJS), built with :

- [melonJS 2](https://github.com/melonjs/melonJS)
- [ECMAScript 6](http://es6-features.org) structure and semantic
- [Webpack](https://webpack.js.org/guides)
- [Webpack Dev Server](https://github.com/webpack/webpack-dev-server) plugin for local development
- [Hot Reloading](https://webpack.js.org/concepts/hot-module-replacement) dev server
- Basic Asset Build [management](https://webpack.js.org/plugins/copy-webpack-plugin/)
- Minification and Transpiling to ES5 using [Babel](https://babeljs.io/docs/setup/#installation)
- Favicon support using the [favicons Webpack Plugin](https://www.npmjs.com/package/favicons-webpack-plugin)
- melonJS [debug plugin](https://github.com/melonjs/debug-plugin) to display stats on number of objects, memory usage, draw time, frame rate, etc...

## Melonjs questions, need help ?

If you need technical support, you can contact us through the following channels :

- Forums: with melonJS 2 we moved to a new discourse [forum](https://melonjs.discourse.group), but we can still also find the previous one [here](http://www.html5gamedevs.com/forum/32-melonjs/)
- Chat: come and chat with us on [discord](https://discord.gg/aur7JMk), or [gitter](https://gitter.im/melonjs/public)
- we tried to keep our [wikipage](https://github.com/melonjs/melonJS/wiki) up-to-date with useful links, tutorials, and anything related melonJS.
