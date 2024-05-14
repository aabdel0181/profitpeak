# profitpeak

## Landing Page
[https://marcvaz1.github.io/profitPeakLandingPage/](https://marcvaz1.github.io/profitPeakLandingPage/)

## Video Demonstration
[https://drive.google.com/file/d/1ix7ziCldUymgyT08q8bOYNH0xOTlgmqj/view?usp=sharing](https://drive.google.com/file/d/1ix7ziCldUymgyT08q8bOYNH0xOTlgmqj/view?usp=sharing )

## Chrome Extension Short Demo

<img src="./static/profitpeak_demo.gif" alt="Screenshot" style="width:50%;">

## How to load as extension

1. Download the latest release `.zip` file from [https://github.com/aabdel0181/profitpeak/releases/tag/public](https://github.com/aabdel0181/profitpeak/releases/tag/public)
2. Unzip the file, and consider the resulting folder (likely named `release_a_b`) to be the chrome extension's folder / dist folder
3. Follow the `.gif` below to "load unpack" the chrome extension

<img src="./static/LoadExtensionVid1080p.gif" alt="Screenshot" style="width:100%;">

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

Copyright (c) 2004 ProfitPeak (Rayyan Shaik, Marc Vaz, Chelsea Pan, Ahmed Abdellah). All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use the Software for non-commercial purposes only. This includes the rights to use, copy, and distribute the Software in its original form.

The following restrictions apply:
1. The Software may not be modified, remixed, or adapted in any form.
2. The Software may not be used for commercial purposes without express written permission from ProfitPeak.
3. Redistributions of the Software must retain the above copyright notice, this list of conditions, and the following disclaimer.

ProfitPeak reserves the right to modify or update this license at any time without prior notice. By using the Software, you agree to be bound by the terms of the license in effect at the time of use.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.