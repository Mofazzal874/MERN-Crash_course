import  express from 'express'
import productRoutes from './routes/product.route.js'
import { connectDB } from './config/db.js ';

import path from "path" ; 




const app = express();
const PORT = process.env.PORT || 5000 ; 

const __dirname = path.resolve() ; 

app.use(express.json()) ; //using a json parser to parse json data in req.body




app.use('/api/products' , productRoutes)  ; //routes to products related API 



if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist"))) //__dirname will take to root and then
                                                                    //go to frontend and then dist


    app.get("*" , (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html")) ;
    })
}

app.listen(PORT, () => {
    connectDB(); 
    console.log("listening on http://localhost:"+PORT) ; 
});





