# GameHub

GameHub is a single page web application where users can create, update, view, and delete the games they have played.

# Motivation

To build a web application application using the MERN stack.

# Technologies

* Front end
 * React.js
 * Material UI
 * Axios

* Back end
 * Mongoose.js
 * Passport.js 
 * Passport-local-mongoose.js
 * Node.js
 * Express.js
 * Express-Session.js

# Installation

To run the application you will need to:

* Clone the repository locally

```
 git clone https://github.com/AlanGarc1a/GameHub.git
```

* Create a ``` .env ``` file and store all the database connection information or any other environment variables that will change.
* Install dependencies for both client and server using ``` npm install ```

# Project Structure

```
 client 

📦src                         // entry point for the React client side application
 ┣ 📂components
 ┃ ┣ 📂games
 ┃ ┃ ┣ 📜GameCard.js
 ┃ ┃ ┣ 📜GameCardCreate.js
 ┃ ┃ ┣ 📜GameCardEdit.js
 ┃ ┃ ┣ 📜GameCardView.js
 ┃ ┃ ┗ 📜GameList.js
 ┃ ┣ 📂store
 ┃ ┃ ┗ 📜AuthContext.js
 ┃ ┣ 📂user
 ┃ ┃ ┗ 📜UserForm.js
 ┃ ┣ 📜App.js
 ┃ ┣ 📜Home.js
 ┃ ┣ 📜Login.js
 ┃ ┣ 📜NavBar.js
 ┃ ┣ 📜NotFound.js
 ┃ ┗ 📜Register.js
 ┗ 📜index.js

 server

 📦controllers                  // controllers for routes
 ┣ 📜gamecardcontroller.js
 ┗ 📜usercontroller.js

 📦models                       // represents data from our database
 ┣ 📜gamecard.js                // schema for gamecard collection
 ┗ 📜user.js                    // schema for user collection

 📦routes                       // folder containing all routes
 ┣ 📜gameRoute.js               // routes for gamecard
 ┗ 📜userRoutes.js              // routes for user

 app.js                         // the entry point for running the backend server

```