const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const session       = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

const app     = express();
const port    = 5000;

//game routes
const gameRoutes = require('./routes/gameRoute');

//user routes
const userRoutes = require('./routes/userRoute');

const { urlencoded } = require('express');

mongoose.connect('mongodb://localhost:27017/gamehub', {
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

const configSession = {
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(configSession));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
//needed for an express based application
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({ username: username}, function(err, user){
            if(err) { return done(err); }
            if(!user){
                return done(null, false, { message: 'Incorrect username.'});
            }
            if(!user.checkPassword(password)){
                return done(null, false, { message: 'Incorrect password'});
            }
            return done(null, user);
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, { _id: user._id })
});
passport.deserializeUser((id, done) => {
    User.findOne(
        { _id: id},
        'username',
        (err, user) => {
            done(null, user)
        }
    )
});

//game routes
app.use('/g', gameRoutes);

//user rotues
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});