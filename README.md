# profitpeak

## How to load as extension

TODO: insert GIF

## How to build locally

1. cd into the "chrome-ext-react" directory via: `cd chrome-ext-react`
2. Install dependencies via: `npm install --force`
3. Install scripting dependencies. Note, there is a packaging issue with these libraries so please run the following commands

- `npm install axios --save`
- `npm install cheerio --save`

4. Run the build command
   The output of the build command (dist directory) is the same, but the given machine needs to run its specific command due to how the `copy` command works

- (Mac/Linux): `npm run build-mac`
- (Windows): `npm run build-win`

5. Output should be produced as: `/chrome-ext-react/dist`

- The dist folder itself can be loaded as a developer/test chrome extension
