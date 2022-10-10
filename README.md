# Sage Prosthetics 
<p align="center">
<img src=public/static/favicon.png width="250" height="250">
</p>

## About
This repo contains the source code for the Sage Prosthetics website. Sage Prosthetics is a service group at Sage Hill School that provides 3D printed prosthetic hands and arms for underpriveleged children and adults.

https://www.sageprosthetics.org

### Website Documentation
* All documentation for modifying the website can be found in the shared drive (ask current webmaster for invite)
* Login info: `Login Information` document on google drive
* Website Documentation: `Documentation` document on google drive
* [Cloudinary](https://cloudinary.com/) Keys: `.env` document on google drive
    * Download and put in root directory of `sageprosthetics` folder (see below)
### Source Code Setup Instructions
#### Open terminal (bash, zsh, git bash on windows)
1. Clone this repository:
```bash
cd ~/Desktop 
git clone https://github.com/sagehillprosthetics/sageprosthetics
```
2. [Install Node Version Manager](https://github.com/nvm-sh/nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# This loads nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
```
3.  Install Node 16.x
```bash
nvm install 16
```
4. Open IDE of choice (e.g. [Visual Studio Code](https://code.visualstudio.com/download), [Sublime Text](https://www.sublimetext.com/3))
5. Open `sageprosthetics` folder on your desktop
6. Setup [yarn](https://yarnpkg.com/)
* Open terminal and type:
```bash
cd ~/Desktop/sageprosthetics

yarn
```
7. Refer to `Terminal commands`
### Terminal commands:
```bash
yarn run build # build app
yarn run dev # run app in dev mode

# For other options refer to package.json
```
### Architecture
* All data stored on Firebase. 
* Images are stored on Cloudinary.
* Built using Grommet v1, React, and Next.js. Deployed using Vercel.