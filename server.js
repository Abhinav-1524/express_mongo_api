const mongoose = require('mongoose');
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const productdata = require('./models/productmodel')
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

//creating and sending to db
app.post('/product',async (req,res) => {
    try{
        const product = await productdata.create(req.body)
        res.status(200).json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
//get all data from db
app.get('/product',async (req,res) => {
    try {
        const product = await productdata.find({});
        res.status(200).json(product)
    }catch (e){
        console.log(e.message)
        res.status(500).json({message:e.message})
    }
})

//get specific data by id from db
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


//update data to db
app.put('/product/:id',async (req,res) => {
    try {
        const {id} = req.params;
        const product = await productdata.findByIdAndUpdate(id, req.body);
        const updated = await productdata.findById(id)
        //if product is not there in db
        if(!product){
            res.status(404).json({message:'cannot find any product by Id $(id)'})
        }else {
            res.status(200).json(updated)
        }

    }catch (e){
        console.log(e.message)
        res.status(500).json({message:e.message})
    }
})

app.delete('/product/:id',async (req,res) => {
    try {
        const {id} = req.params;
        const product = await productdata.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:'cannot find any product by Id $(id)'})
        }else {
            res.status(200).json({message: 'deleted'})
        }
    }catch (e){
        console.log(e.message)
        res.status(500).json({message:e.message})
    }
})