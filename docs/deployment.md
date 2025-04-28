



Right now our backend api application is in -> localhost:5000 
and frontend react application is in       -> localhost:5173 


we want to make a way so that both(server and client) can be visited at -> localhost:5000 

first build the frontend 
npm run build

go to server.js->

and add 
import path from "path" 
and 
const __dirname = path.resolve() ; 


and then this code part->
```javascript
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist"))) //__dirname will take to root and then
                                                                    //go to frontend and then dist


    app.get("*" , (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html")) ;
    })
}
```




and then you can delete the node_modules in both frontend and backend(optional , good for github).



now to make the project deployable under localhost:5000 :
- what we will do ? - we will create a mechanism that , when we run the project(with npm run build) in the root folder , it will also run the frontend project as well.
-go to package.json of the root project(not frontend or backend):

package.json 
and add this in the scripts: 

"build" : "npm install && npm install --prefix frontend && npm run build --prefix frontend"


- so actually it is installing npm packages both backend(the first npm install) and frontend(the second npm install) and then running the npm run build command at the last .


then we need to add another script in the root package.json :
"start" : "node backend/server.js"



Now before running npm run build , we have to do another thing. We have to specify NODE_ENV that we declared in the server.js file. So in the scripts , we'll specify it if the environment is in development or production.



"scripts": {
  "dev": "set NODE_ENV=development&& nodemon backend/server.js",
  "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
  "start": "set NODE_ENV=production&& node backend/server.js"
}

**Note:** The && must be right after the environment variable definition without a space.



now run :
npm run start or npm start 
in the root of the project folder 
- this will start the both server


so the scripts in the root projects's package.json will look like this:
![alt text](../images/image14.png)







