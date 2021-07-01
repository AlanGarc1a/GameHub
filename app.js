const express        = require('express');
const mongoose       = require('mongoose');
const cors           = require('cors');
const passport       = require('passport');
const localStrategy  = require('passport-local').Strategy;
const session        = require('express-session');

const User = require('./models/user');

require('dotenv').config();

const app  = express();
const port = process.env.PORT;
const DB   = process.env.DB_HOST;

//game routes
const gameRoutes = require('./routes/gameRoute');

//user routes
const userRoutes = require('./routes/userRoutes');

const { urlencoded } = require('express');

//cors options
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

//session object
const sesObject = {
    secret: "ultrasecretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

mongoose.connect(DB, {
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB connection open');
}).catch( err => {
    console.log("MongoDB connection failed");
    console.log(err);
});

//middleware
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
app.use('/g', gameRoutes);

//user routes
app.use('/u', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${port}`);
});