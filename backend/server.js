import  express from 'express'
import productRoutes from './routes/product.route.js'
import { connectDB } from './config/db.js ';


const app = express();
const PORT = process.env.PORT || 5000 ; 

app.use(express.json()) ; //using a json parser to parse json data in req.body




app.use('/api/products' , productRoutes)  ; //routes to products related API 

app.listen(PORT, () => {
    connectDB(); 
    console.log("listening on http://localhost:"+PORT) ; 
});





