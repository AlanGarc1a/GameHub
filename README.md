# GameHub

GameHub is a single page web application where users can create, update, view, and delete the games they have played.

# Motivation

To build a full stack application using the MERN stack.

# API

![image](https://user-images.githubusercontent.com/32556354/129487856-c49c5ef7-27cc-4a35-8bb9-c5d6ef9cf4c7.png)

# Technologies

* Mongoose.js - Object Data Mapper for MongoDB
* Passport.js - User Authentication 
* React.js - Javascript Library for building User interfaces
* Axios - http requests
* Node.js - Back end services API
* Express.js - building web servers

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

# Installation

To run the application you will need to:

* Clone the repository locally

```
 git clone https://github.com/AlanGarc1a/GameHub.git
```

* Create a ``` .env ``` file and store all the database connection information or any other environment variables that will change.
* Install dependencies for both client and server using ``` npm install ```