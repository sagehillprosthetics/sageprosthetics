# Sage Prosthetics

## About

This repo contains the source code for the Sage Prosthetics website. Sage Prosthetics is a service group at Sage Hill School that provides 3D printed prosthetic hands and arms for underpriveleged children and adults.

https://www.sageprosthetics.org

## Usage
* Ask current webmaster for invite to GitHub repo
* Ask current webmaster to share google drive folder for the cloudinary key, website admin login, & comprehensive documentation
* Email Timothy Guo @ timg51237@gmail.com to add to firebase project:

https://console.firebase.google.com/u/0/project/sage-prosthetics/overview

### Instructions for mac and linux (all commands to be typed in terminal)
1. Clone this repository:
```
cd [where you want the repo (ex: home/user/Desktop)]
git clone https://github.com/timg512372/sageprosthetics.git
```
2 Install Node 12.x
* Install on Mac and Linux
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node@12
```
4. Install and set up yarn
```
sudo npm install --global yarn
yarn
```
5. Download cloudinarykeys.json from shared google drive and move to root folder of project
6. Refer to `Terminal commands`

### Terminal commands:
```
// Optional: if you want to test cloudinary upload
export NEXT_PUBLIC_CLOUD_NAME=sageprosthetics
export NEXT_PUBLIC_UPLOAD_PRESET=slefbggs

// to run in dev mode (for other options refer to package.json)
yarn run build
yarn run dev
```

## Architecture

All data stored on Firebase. 

Images are stored on Cloudinary.

Built using Grommet v1, React, and Next.js. Deployed using Vercel.
