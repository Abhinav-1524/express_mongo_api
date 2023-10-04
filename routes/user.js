const express = require('express')
const productdata = require('../models/productmodel')
const app = express.Router();

//creating and sending to db
app.post('/',async (req,res) => {
    try{
        const product = await productdata.create(req.body)
        res.status(200).json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
//get all data from db
app.get('/',async (req,res) => {
    try {
        const product = await productdata.find({});
        res.status(200).json(product)
    }catch (e){
        console.log(e.message)
        res.status(500).json({message:e.message})
    }
})

//get specific data by id from db
app.get('/:id',async (req,res) =>{
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
app.put('/:id',async (req,res) => {
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

app.delete('/:id',async (req,res) => {
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


module.exports = app;