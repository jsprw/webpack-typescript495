# Dynamic imports broken for Webpack on Typescript higher than 4.9.1-beta

It looks like Typescript 4.9.2+ changed the code that it emits for dynamic imports: the import path is assigned to a variable (see microsoft/TypeScript#51554) prior to passing it to the import() function. Therefore Webpack does not seem to understand what to import and emits Critical dependency: the request of a dependency is an expression warnings. Before v4.9.2 it does not emit any warnings and it works fine.

## Usage

Use the following npm scripts to reproduce the error (it will set the correct Typescript version in the script):

- Working fine on Typescript@4.9.1-beta: `npm run typescript-4.9.1-beta`
- Broken on Typescript@latest: `npm run typescript-latest`

## Possible cause

> Code snippets below are not taken from this reproduction repository

What's emitted by Typescript 4.9.4:

```
await Promise.all(filesToImport.map((e) => { var _a; return _a = `./relative/path/to/files/${e}`, Promise.resolve().then(() => tslib_1.__importStar(__webpack_require__("./path/of/app sync recursive")(_a))); }))
```

What's emitted by Typescript 4.9.1-beta (and earlier) with the same project and Webpack configuration:
```
await Promise.all(filesToImport.map((e) => Promise.resolve().then(() => tslib_1.__importStar(__webpack_require__("./relative/path/to/files sync recursive ^\\.\\/.*$")(`./${e}`)))))
```
