const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//Import Routes

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//DB Config
const db = require('./config/keys.config').MongoURI;

//Connect ot mongoDB
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Mongo Db connected'))
    .catch(err => console.log(err));


//Use Routes
app.use('/candidate', require('./routes/candidate.routes'));

//serve static assets if in Production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('FrontEnd/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'FrontEnd', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running ...`));