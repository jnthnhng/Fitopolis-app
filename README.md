# Fitopolis

Fitopolis is a cross-platform application that allows users to create and participate in fitness challenges. A community where people like-minded fitness enthusiasts can come for challenges.

## Features

- Cross platform

## Tech Stack

**Client:** React Native, Expo

**Serverless Backend:** Cloud Functions for Firebase

**Database:** Firebase Realtime Database

**Storage:** Cloud Storage for Firebase

**Authentication:** Firebase Authentication

**Activity Feed:** Stream Activity Feeds API

---

## Run on Android Studio Emulator

Source: [Expo Doc: Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

**Step 1: Set up Android Studio's Tools**

1. Download and install Android Studio 3.0+
2. Select "Standard" for the "Install Type" inside the wizard.
3. Inside Android Studio, go to Preferences > Appearance & Behavior > System Settings > Android SDK. Click on the "SDK Tools" tab and make sure you have at least one version of the "Android SDK Build-Tools" installed.
4. Copy or remember the path listed in the box that says "Android SDK Location."
5. If you are on macOS or Linux, add an environment variable pointing to the Android SDK location in ~/.bash_profile (or ~/.zshenv if you use Zsh) - eg. export ANDROID_HOME=/your/path/here. Copy and paste these two lines to do this automatically for Bash and Zsh:

```[ -d "$HOME/Library/Android/sdk" ] && ANDROID_HOME=$HOME/Library/Android/sdk || ANDROID_HOME=$HOME/Android/Sdk
echo "export ANDROID_HOME=$ANDROID_HOME" >> ~/`[[ $SHELL == *"zsh" ]] && echo '.zshenv' || echo '.bash_profile'`
```

6. On macOS, you will also need to add platform-tools to your ~/.bash_profile (or ~/.zshenv if you use Zsh) - eg. export PATH=/your/path/here:$PATH. Copy and paste this line to do this automatically for Bash and Zsh:

```
echo "export PATH=$ANDROID_HOME/platform-tools:\$PATH" >> ~/`[[ $SHELL == *"zsh" ]] && echo '.zshenv' || echo '.bash_profile'`
```

7. Reload the path environment variables by running:

```
source ~/`[[ $SHELL == *"zsh" ]] && echo '.zshenv' || echo '.bash_profile'`
```

8. Finally, make sure that you can run adb from your terminal.

**Step 2: Set up a virtual device**

1. On the Android Studio main screen, click "More Actions", then "Virtual Device Manager" in the dropdown.
2. If you already have a project, then the menu will show up under the three dots menu in the top right corner of the window.
3. Press the "Create device" button.
4. Select "Phone" from the left menu, and choose "Pixel 5"
5. Select an OS version "R", which is "Android 11.0".
6. Change any other settings you'd like, and press "Finish" to create the virtual device. You can now run this device anytime by pressing the Play button in the AVD Manager window.

**Step 3: Run the Fitopolis App**

1. Download the `Fitopolis-Android.apk` file from the `./project_build/android/` folder.
2. Press the "Play" button in the AVD Manager window to Open the Android Emulator.
3. Drag and Drop the `Fitopolis.apk` file onto the device. This will install the APK file.
4. Once installed, open the App menu and find the Fitopolis app. Open the App and enjoy!

---

## Run on iOS Simulator

Source: [Expo Doc: iOS Simulator](https://docs.expo.dev/workflow/android-studio-emulator/)

**Step 1: Install Xcode**

- This step is very easy but it takes a while. Open up the Mac App Store, search for Xcode, and hit install (or update if you have it already). If you're not able to update because your operating system is out of date, we recommend updating your operating system to the latest version and then updating Xcode. You may run into issues further down the line if your Xcode version is out of date, for example you may not be able to submit your app to the App Store.

**Step 2: Run Xcode & Simulator**

1. Open Xcode > Open Developer Tool > Simulator

**Step 3: Run the Fitopolis App**

1. Download the `...tar.gz` file from the `./project_build/ios/` folder.
2. Extract the file by opening it. You will now have a Fitopolis-app.app file.
3. Open up your simulator.
4. Drag `Fitopolis-app.app` into the simulator.
5. The app will be installed in a few seconds. When you see it appear on the simulator home screen, tap it to run it.

##

---

## **Run Locally**

## Prerequisites

Install Node Version Manager

(Mac/Linux)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

(Windows)

```
Install zip from: [https://github.com/coreybutler/nvm-windows/releases]
```

---

Clone the project

```bash
  git clone https://github.com/jph-cs/Fitopolis-app.git
```

Go to the project directory

```bash
  cd Fitopolis-app
```

Install Expo-CLI

```bash
  npm install -g expo-cli
```

Install dependencies and peer dependecies

```bash
  npm install --legacy-peer-deps
```

Start the application

_--no-dev flag run the application in production mode_

_--minify flag removes unecessary data (comments, formatting, unused code)_

(Android/Web)

```bash
  expo start --no-dev -minify
```

After the project has started press `"w"` to start in Web, or
press `"a"` to start in an Android emulator.

---

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

---

## Screenshots

![App Screenshot](https://lh3.googleusercontent.com/pw/AL9nZEVOfXaAKGhiNnlzdhR9X-3zlicLX3iIA2lU9IdcYaIWMPQusjp2GPcl92yPBtZgV-lgIUKdl3gpR85rJvhIyKNTQ-A31c1I6g6oWRXq11-_GmS89irP7ACnA1IdxlfoaksTLYShacVuGLE1EYl4Jis=w917-h855-no)

---

## Authors

- [@Catherine Wallin](https://github.com/CatWallin)
- [@Danielle Guedea](https://github.com/dguedea)
- [@Jonathan Hang](https://github.com/jph-cs)

---

## 🔗 Links

[Node Version Manager](https://github.com/nvm-sh/nvm)

[Expo](https://docs.expo.dev/)

[Stream Activity Feed API](https://getstream.io/)

[Firebase](https://firebase.google.com/)

---

## Acknowledgements

- The TAs and Professor Bill Pfeil from CS 467 Capstone Class U2022

- [Oregon State University: College of Engineering](https://engineering.oregonstate.edu/)
