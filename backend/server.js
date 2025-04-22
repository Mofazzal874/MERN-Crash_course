import express from 'express'

const app= express() ; 


app.get('/' , (req , res)=>{
    res.send("server is ready")

}) ; 
app.post('/' , ()=>{
    res.send("Server is ready with post request")
}) ; 


app.listen(5000, ()=>{
    console.log("server started Successfully at http://localhost:5000")
}) ; 