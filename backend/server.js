import  express from 'express'

const app = express();
const adminRouter = express() ; 

const loggerWrapper = (options) => {
    return function logger(req, res, next) {  //this is the logger function 
        if(options.log){
            console.log(
            `${new Date(Date.now()).toLocaleString()} - ${req.method}  - ${req.originalUrl} - ${req.protocol}- ${req.ip}`
        ) ; 
        next() ; //call next() function

        }
        else {
            throw new Error("Failed to log") ; 
        }
         
    }
} ; 
adminRouter.use(loggerWrapper({log: true})) ;  //now use loggerWrapper instead of logger and send the datas 

adminRouter.get('/dashboard' , (req,res)=>{
    res.send("Dashboard") ;
}) ;


app.use('/admin', adminRouter);

app.get('/about' , (req, res)=>{
    res.send('About') ; 
}) ; 


const errorMiddleware = (err, req, res, next)=>{

    console.log(err) ; //showing the error in console  
    res.status(500).send("there was a server side error") ; //you must end the response 

}

adminRouter.use(errorMiddleware);

app.listen(5000, () => {
    console.log("listening on http://localhost:5000")
});

