# profitpeak
By Marc Vaz, Ahmed Abidallah, Chelsea Pan, and Rayyan Shaik

<img src ="./static/pplogo.png" alt="Logo" style="width:20%;">

## Landing Page
[https://marcvaz1.github.io/profitPeakLandingPage/](https://marcvaz1.github.io/profitPeakLandingPage/)

## Video Demonstration
[https://drive.google.com/file/d/1ix7ziCldUymgyT08q8bOYNH0xOTlgmqj/view?usp=sharing](https://drive.google.com/file/d/1ix7ziCldUymgyT08q8bOYNH0xOTlgmqj/view?usp=sharing )

## Chrome Extension Short Demo

<img src="./static/profitpeak_demo.gif" alt="Screenshot 1" style="width:50%;">

## How to load as extension

1. Download the latest release `.zip` file from [https://github.com/aabdel0181/profitpeak/releases/tag/public](https://github.com/aabdel0181/profitpeak/releases/tag/public)
2. Unzip the file, and consider the resulting folder (likely named `release_a_b`) to be the chrome extension's folder / dist folder
3. Follow the `.gif` below to "load unpack" the chrome extension

<img src="./static/LoadExtensionVid1080p.gif" alt="Screenshot 2" style="width:100%;">

## How to build locally

1. cd into the "chrome-ext-react" directory via: `cd chrome-ext-react`
2. Install dependencies via: `npm install --force`
3. Install scripting dependencies if the building fails after running (2). Note, there is a packaging issue with these libraries so please run the following commands

- `npm install axios --save`
- `npm install cheerio --save`

4. Run the build command
   The output of the build command (dist directory) is the same, but the given machine needs to run its specific command due to how the `copy` command works

- (Mac/Linux): `npm run build-mac`
- (Windows): `npm run build-win`

5. Output should be produced as: `/chrome-ext-react/dist`

- The dist folder itself can be loaded as a developer/test chrome extension

## Licence

See License [here](./LICENSE)