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
const DB_URL = process.env.MONGO_URI || process.env.DB_DEV_URL;

//game routes
const gameRoutes = require('./routes/gameRoute');

//user routes
const userRoutes = require('./routes/userRoutes');

const { urlencoded } = require('express');

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

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
     .connect( DB_URL)
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

//middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(cors());
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

if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});


module.exports = app;