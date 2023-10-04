const mongoose = require('mongoose');
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const productdata = require('./models/productmodel')
dotenv.config()
const port = 3000


app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
});



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


app.post('/product',async (req,res) => {
    try{
        const product = await productdata.create(req.body)
        res.status(200).json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/product',async (req,res) => {
    try {
        const product = await productdata.find({});
        res.status(200).json(product)
    }catch (e){
        console.log(e.message)
        res.status(500).json({message:e.message})
    }
})

app.get('/product/:id',async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await productdata.findById(id);
        res.status(200).json(product)
    }catch (e){
        console.log(e.message)
        res.status(500).json({message:e.message})
    }
})

