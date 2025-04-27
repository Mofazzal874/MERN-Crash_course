import  express from 'express'
import { connectDB } from './config/db.js ';

const app = express();


app.get('/products' , (req, res)=>{
    res.send('About') ; 
}) ; 


app.listen(5000, () => {
    connectDB(); 
    console.log("listening on http://localhost:5000")
});





