const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
require('dotenv').config();

const app     = express();
const port = process.env.PORT;
const DB = process.env.DB_HOST;

//game routes
const gameRoutes = require('./routes/gameRoute');

//user routes
const userRoutes = require('./routes/userRoutes');

const { urlencoded } = require('express');

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

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(urlencoded({ extended: true }));

//game routes
app.use('/g', gameRoutes);

//user routes
app.use('/u', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${port}`);
});