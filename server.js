const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const product = require('./routes/user')
dotenv.config()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
    res.send('Hello World!')
});


//connecting to mongodb
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser:true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use('/product',product);