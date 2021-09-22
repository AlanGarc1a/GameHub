if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express        = require('express');
const mongoose       = require('mongoose');
const cors           = require('cors');
const passport       = require('passport');
const localStrategy  = require('passport-local').Strategy;
const session        = require('express-session');
const MongoStore     = require('connect-mongo');
const path           = require('path');

const User = require('./models/user');

const app  = express();
const port = process.env.PORT || 8000;
const sess_secret = process.env.SESS_SECRET || 'devsecretsess';
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/gamehub';

//game routes
const gameRoutes = require('./routes/gameRoute');

//user routes
const userRoutes = require('./routes/userRoutes');

const { urlencoded } = require('express');

//cors options
const corsOptions = {
    origin: "*"
};

//session object
const sesObject = {
    store: MongoStore.create({
        mongoUrl: DB_URL,
        secret: sess_secret,
        touchAfter: 24 * 60 * 60
    }),
    secret: sess_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000, // 1 hour
    }
};

mongoose
     .connect( DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

//middleware
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors(corsOptions));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(session(sesObject));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//game routes
app.use('/api/games', gameRoutes);

//user routes
app.use('/api/users', userRoutes);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});


module.exports = app;