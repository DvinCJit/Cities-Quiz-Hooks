This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and implemented with MongoDB and Node.js.

## Cities Quiz Game with React Hooks

Single page app made from scratch in two days with MERN stack and Mapbox.

### Preview

![Cities Quiz Preview](https://res.cloudinary.com/drdwtcsc4/image/upload/v1595756046/Others/2020-07-26_11-32-16_oqfuav.gif "Cities Quiz Preview")

### Game Description

The player will see a map of Europe without Streets + Cities (Only Country-borders). Its mission is to find the right location to the city name on this map. After placing the needle pin, the game will show you the right location of the city and the difference of your needle pin and the city in kilometres. If it is in around 50km of the city, the selection will be defined as "correct".

### Game Logic

In the beginning, the player has a predetermined score of 1500 that symbolizes kilometres. At each round the difference between position of the city and your needle pin are reducing your score.

### Game End

The game ends when no kilometres are left or when all the cities have been placed (correctly or not).
The high score is the amount of cities you have found.

### Setup - Production Mode

To be able to run this application correctly on your machine or for future projects you might want to consider signing up to [Mapbox](https://www.mapbox.com/) and getting your own personal access token.

Make sure to create a .env.local file in the root of your project and add the following variables: REACT_APP_MAPBOX_TOKEN and REACT_APP_STYLE, the second is the mapbox style for your map.

You need to have installed on your machine a stable version of [Nodejs](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/try/download/community) to be able to run this project. You need to create a mongodb database and change the name of the connection string in 'server/db/index.js' of this project. [Part 3 of this tutorial](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb) should be useful. Alternatively you can create a [Mongodb Atlas](https://www.mongodb.com/cloud/atlas) free account and get a cloud hosted database. Paste the uri from Atlas in the mongoose.connect('uri') part of 'server/db/index.js'.

If you are using MongoDB Atlas make sure you create a .env file inside the server folder and add the following variable: ATLAS_URI

Once you have downloaded or cloned this project follow these steps:

1. Open your terminal (I use "Visual Basic Studio" with the "git bash" terminal installed for windows) and go to the 'cities-quiz/server' directory with `cd cities-quiz/server/`.
2. Install all dependencies with `npm install`. Once they are all installed you can continue to the next step.
3. Run `npm start` to launch the server on **localhost:8080**. If you go to **localhost:8080/api/cities** on your browser you will see the cities JSON being served up by the server. You won't see anything else yet since we still have to set up the frontend.
4. Open a **new terminal** and go to the 'cities-quiz' directory. If you are in the 'cities-quiz/server' directory use the command `cd ..`. If you are in the root directory 'cities-quiz-game' use this other command: `cd cities-quiz/`.
5. Install all dependencies with `npm install`. This time it is the frontend dependencies. Once they are all installed you can continue to the next step.
6. Run `npm start` to launch the app on **localhost:3000**. This might take a while. React will automatically open a tab on your browser after this last command and when it is done compiling you will see the Cities Quiz main page displayed on your browser.

For more information about React check out the readme on the 'cities-quiz' folder or go to [React's documentation page](https://reactjs.org/).
