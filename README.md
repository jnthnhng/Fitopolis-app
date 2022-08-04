# Fitopolis

Fitopolis is a cross-platform application allows users to create and participate in fitness challenges. A community where people like-minded fitness enthusiasts can come for challenges.

## Features

- Cross platform

## Tech Stack

**Client:** React Native, Expo

**Serverless Backend:** Cloud Functions for Firebasee

**Database:** Firebase Realtime Database

**Storage:** Cloud Storage for Firebase

**Authentication:** Firebase Authentication

**Activity Feed:** Stream Activity Feeds API

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


## Run Locally

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

*--no-dev flag run the application in production mode*

*--minify flag removes unecessary data (comments, formatting, unused code)*



(Android/Web)
```bash
  expo start --no-dev -minify
```
After the project has started press ```"w"``` to start in Web, or
press  ```"a"```  to start in an Android simulator.



## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Usage/Examples

```javascript
import Component from 'my-project';

function App() {
  return <Component />;
}
```

## Screenshots

![App Screenshot](https://lh3.googleusercontent.com/pw/AL9nZEVOfXaAKGhiNnlzdhR9X-3zlicLX3iIA2lU9IdcYaIWMPQusjp2GPcl92yPBtZgV-lgIUKdl3gpR85rJvhIyKNTQ-A31c1I6g6oWRXq11-_GmS89irP7ACnA1IdxlfoaksTLYShacVuGLE1EYl4Jis=w917-h855-no)

## Authors

- [@Catherine Wallin](https://github.com/CatWallin)
- [@Danielle Guedea](https://github.com/dguedea)
- [@Jonathan Hang](https://github.com/jph-cs)

## 🔗 Links

[Node Version Manange](https://github.com/nvm-sh/nvm)

[Expo](https://docs.expo.dev/)

[Stream Activity Feed API](https://getstream.io/)

[Firebase](https://firebase.google.com/)

## Acknowledgements

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
