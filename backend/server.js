import express from 'express'
import cookieParser from 'cookie-parser';
import handle from './handle.js';

const app = express();
app.use(express.json()); //json parser
app.use(cookieParser()); 

app.set('myConfig', {
    appName: 'My Modular App',
    version: '1.0.0',
    author: 'Mofazzal',
  });

app.get('/user' , handle);

app.get('/user/:id', (req, res)=>{
    console.log(req.route) ;  
    res.send('Hello world') ; 
}); 

app.listen(5000, () => {
    console.log("listening on http://localhost:5000")
});