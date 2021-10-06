# Sage Prosthetics

## About

This repo contains the source code for the Sage Prosthetics website. Sage Prosthetics is a service group at Sage Hill School that provides 3D printed prosthetic hands and arms for underpriveleged children and adults.

https://www.sageprosthetics.org

## Usage
Ask current webmaster for invite to GitHub repo
Ask current webmaster for the cloudinary keys and login information
Email Timothy Guo @ timg51237@gmail.com to add to firebase project:
https://console.firebase.google.com/u/0/project/sage-prosthetics/overview

### Instructions (all commands to be typed in terminal)
1. Clone this repository:
```
cd [where you want the repo (ex: home/user/Desktop)]
git clone https://github.com/timg512372/sageprosthetics.git
```
2. Install Node Version Manager:
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
Note: To exit the installations type `:q` on your keyboard 
Running either of the above commands downloads a script and runs it. The script clones the nvm repository to `~/.nvm`, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

3. Install Node 12.x
```
nvm install 12
```
4. Install and set up yarn
```
npm install --global yarn
yarn
```
5. Refer to `Terminal commands`

### Terminal commands:
```
// Optional: if you want to test cloudinary upload
export NEXT_PUBLIC_CLOUD_NAME=sageprosthetics
export NEXT_PUBLIC_UPLOAD_PRESET=slefbggs

// to run in dev mode (for options refer to package.json)
yarn run dev
yarn run next
yarn run build
yarn run start
yarn run now-build
```

## Architecture

All data stored on Firebase. Please email me for the keys.

Images are stored on Cloudinary.

Built using Grommet v1, React, and Next.js. Deployed using Vercel.
