import  express from 'express'
import mongoose from 'mongoose';

import { connectDB } from './config/db.js ';
import Product from './models/product.model.js';

const app = express();

app.use(express.json()) ; //using a json parser to parse json data in req.body



app.get('/api/products' , async (req , res)=>{
    try{
        const products = await Product.find({}) ; 
        res.status(200).json({success: true , data: products}) ; 
    }catch(error){
        console.log("Error fetching products: " , error.message) ; 
        res.status(500).json({succes: false , message : "server error"}) ; 
    }
}) ; 
app.post('/api/products' , async (req, res)=>{  //it should be an sync function to use 'await'
    const product = req.body; 

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false , message : "Please provide all the necessary fields"}) ; 
    }

    const newProduct = new Product(product) ; //use the schema model to create the product 

    //now save the model 

    try{

        await newProduct.save() ; 
        res.status(201).json({success: true , data : newProduct}) ; 
    } catch(error){
        console.error("Error in create Product: ", error.message) ; 
        res.status(500).json({success: false , message: "Server Error"}) ; 

    }
}) ; 


app.put('/api/products/:id' , async (req, res)=>{
        const {id} = req.params ; 
        const product = req.body  ; //receives the updated product information 


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false , message: "Invalid Product id"}) ; 
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, product , {new:true}) ; 
            res.status(200).json({success: true , data: updatedProduct}) ; 
        }catch(error){

            res.status(500).json({success: false , message : "Server Error"}) ; 

        }
}) ; 

app.delete('/api/products/:id' , async (req , res)=>{
    const {id} = req.params;  //productId should be an object(must be in a {} braces)
    try{
        console.log(id) ; 
        await Product.findByIdAndDelete(id) ; 
        res.status(200).json({success: true , message: "Product Deleted"}) ; 
    } catch(error){
        res.status(404).json({succes: false , message: "Product not found"}) ;  
    }
}) ; 


app.listen(5000, () => {
    connectDB(); 
    console.log("listening on http://localhost:5000")
});





