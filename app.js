const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');

const app     = express();
const port    = 5000;

//game routes
const gameRoutes = require('./routes/gameRoute');
const { urlencoded } = require('express');

mongoose.connect('mongodb://localhost:27017/gamehub', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connection open');
}).catch( err => {
    console.log("MongoDB connection failed");
    console.log(err);
});

app.use(cors());
app.use(urlencoded({ extended: true }));

//game routes
app.use('/g', gameRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});