# MERN Stack Crash Course

A comprehensive guide for setting up and using Express.js in a MERN stack application.

## Table of Contents

1. ### [Project Setup](#project-setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
2. [MongoDB Database Setup](#mongodb-database-setup)
3. [Project Modularization](#modularizing-project)
  <br><br>
3. ### [Application Object](#application-object)
4. [Express Methods](#express-methods)
   - [app.all()](#appall)
   - [app.listen()](#applisten)
   - [app.param()](#appparam)
   - [app.route()](#approute)
   - [app.engine()](#appengine)
5. [Middleware](#middleware)
6. [Request & Response](#request--response)
7. [Error Handling](#error-handling)
8. [Tips & Tricks](#tips--tricks)

<a id="project-setup"></a>
## Project Setup


- Initialize the project in the main root folder (not in the backend or frontend)
  ```bash
  npm init -y
  ```

- Install dependencies
  ```bash
  npm install express mongoose dotenv
  ```
  (express for web framework and routing)

<a id="backend-setup"></a>
# Backend Setup 

- Create server.js in the backend folder (the main entry point of our app)

- We won't be using the commonjs but the module package to import stuff. So go to 
  package.json-> add another field called "type" : "module"

- Also in the script section, add:
  ```json
  "dev" : "node backend/server.js"
  ```

- Then run:
  ```bash
  npm run dev
  ```

- Now to make the server autorefresh everytime for any change, install nodemon package as devDependencies
  ```bash
  npm i nodemon -D
  ```

- Then change the script:
  ```json
  "dev" : "nodemon backend/server.js"
  ```

<a id="mongodb-database-setup"></a>
## MongoDB Database Setup

Now setting up the database: (mongoose is already installed)

<a id="create-connection-string"></a>
### Create Connection String

1. Create a MongoDB connection string and copy the database user password and place it in .env file
2. Name the database in the cluster string:
   - In the connection string, before the ? mark, set the db name 
   ```
   ___________@cluster0.badfsf.mongodb.net/?_________
   ```
   - Write the db name as products 
   ```
   ___________@cluster0.badfsf.mongodb.net/products?_________
   ```

<a id="set-network-access"></a>
### Set Network Access

- Now go to Security -> Network Access -> you'll see your IP as listed 
  - Now add IP address -> allow access from anywhere (which will make the access list entry to 0.0.0.0/0) 

<a id="access-mongodb"></a>
### Access MongoDB in Your Application

- But you can't access it from the server.js or any other files (that is why we installed dotenv)
- To use the mongo_uri in the .env file, use
  `import dotenv from "dotenv";`
  and then you can use it. To see this in the console with server.js:

```javascript
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MONGO_URI);
```

Console output: mongodb url from the .env file 

<a id="create-database-connection"></a>
### Create Database Connection Module

- Now create a config/db.js in the backend directory:
```javascript
import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config(); 

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`); 
        process.exit(1); // process code 1 means exit with failure, 0 means success
    }
}
```

<a id="nosql-database-structure"></a>
### NoSQL Database Structure

![NoSQL Database Structure](../images/image12.png)

<a id="creating-data-models"></a>
### Creating Data Models

- Now we will create a product model in models/product.model.js (.model is just a convention, file is still just a js file. You can also follow the Product.js convention to create schema)

```javascript
import mongoose from 'mongoose'; 

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true // createdAt, updatedAt
}); 

const Product = mongoose.model('Product', productSchema); 
export default Product; 
```

#### Important Notes on Mongoose Models:

- In the last two lines:
  `const Product = mongoose.model('Product', productSchema);` 
  - This is saying to mongoose that you should create a model called 'Product', which will follow this `productSchema` structure/schema and you should assign it to an object called Product. You should write the 'Product' in the model() function like this - first letter uppercase and the word is singular. MongoDB will make it - products or you can say - lowercase and plural. You can see the database collection as `products` in the mongodb cloud.
  
  `export default Product;` 
  - As we're exporting only one object Product from this file.
  
- The `timestamps: true` option will automatically keep createdAt and updatedAt data


<a id="modularizing-project"></a>
### Making the Project Modular 

- Create routes/product.route.js (also a convention, you can create like product.js) and move all the routes related to products into this file 

**product.route.js:**
```javascript
import express from 'express'; 
import mongoose from 'mongoose'; 
import Product from '../models/product.model.js';

const router = express.Router(); // making a router for product routes only

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.status(200).json({success: true, data: products}); 
    } catch (error) {
        console.log("Error fetching products: ", error.message); 
        res.status(500).json({success: false, message: "server error"}); 
    }
}); 

router.post('/', async (req, res) => {  // it should be an async function to use 'await'
    const product = req.body; 

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all the necessary fields"}); 
    }

    const newProduct = new Product(product); // use the schema model to create the product 

    // now save the model 
    try {
        await newProduct.save(); 
        res.status(201).json({success: true, data: newProduct}); 
    } catch (error) {
        console.error("Error in create Product: ", error.message); 
        res.status(500).json({success: false, message: "Server Error"}); 
    }
}); 

router.put('/:id', async (req, res) => {
    const {id} = req.params; 
    const product = req.body; // receives the updated product information 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product id"}); 
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); 
        res.status(200).json({success: true, data: updatedProduct}); 
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"}); 
    }
}); 

router.delete('/:id', async (req, res) => {
    const {id} = req.params; // productId should be an object (must be in {} braces)
    try {
        console.log(id); 
        await Product.findByIdAndDelete(id); 
        res.status(200).json({success: true, message: "Product Deleted"}); 
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"}); 
    }
}); 

export default router;
```

**server.js:**
```javascript
import express from 'express';
import productRouter from './routes/product.route.js';
import { connectDB } from './config/db.js';

const app = express();
app.use(express.json()); // using a json parser to parse json data in req.body

app.use('/api/products', productRouter); // routes to products related API 

app.listen(5000, () => {
    connectDB(); 
    console.log("listening on http://localhost:5000");
});
```

- But the product route is still so much messy with all the controller functions. So we can make some more modular changes to make the app more modular

To do that: 

- Create controllers/product.controller.js (also another convention, you can create like controllers/product.js) and 
paste all the controller functions in the API methods:

**product.controller.js:**
```javascript
import mongoose from 'mongoose'; 
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.status(200).json({success: true, data: products}); 
    } catch (error) {
        console.log("Error fetching products: ", error.message); 
        res.status(500).json({success: false, message: "server error"}); 
    }
}; 

export const createProduct = async (req, res) => {  // it should be an async function to use 'await'
    const product = req.body; 

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all the necessary fields"}); 
    }

    const newProduct = new Product(product); // use the schema model to create the product 

    // now save the model 
    try {
        await newProduct.save(); 
        res.status(201).json({success: true, data: newProduct}); 
    } catch (error) {
        console.error("Error in create Product: ", error.message); 
        res.status(500).json({success: false, message: "Server Error"}); 
    }
}; 

export const updateProduct = async (req, res) => {
    const {id} = req.params; 
    const product = req.body; // receives the updated product information 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product id"}); 
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); 
        res.status(200).json({success: true, data: updatedProduct}); 
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"}); 
    }
}; 

export const deleteProduct = async (req, res) => {
    const {id} = req.params; // productId should be an object (must be in {} braces)
    try {
        console.log(id); 
        await Product.findByIdAndDelete(id); 
        res.status(200).json({success: true, message: "Product Deleted"}); 
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"}); 
    }
}; 
```

Now the product.route.js will be like this, more structured and organized:
```javascript
import express from 'express'; 
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router(); // making a router for product routes only

router.get('/', getProducts); 
router.post('/', createProduct); 
router.put('/:id', updateProduct); 
router.delete('/:id', deleteProduct); 

export default router;
```

- Now everything is more modular and organized. 

### Flow Diagram of the Modular Project Structure

Below is a visual representation of how API requests flow through the different components of our modular backend structure:

```
┌───────────────┐     ┌───────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│               │     │                   │     │                      │     │                 │
│  API Request  │────▶│    server.js      │────▶│  product.route.js    │────▶│product.controller│
│   (Client)    │     │  (Entry Point)    │     │  (Route Handlers)    │     │ (Business Logic)│
│               │     │                   │     │                      │     │                 │
└───────────────┘     └───────────────────┘     └──────────────────────┘     └────────┬────────┘
                                │                                                      │
                                ▼                                                      ▼
                      ┌───────────────────┐                               ┌─────────────────────┐
                      │                   │                               │                     │
                      │    config/db.js   │                               │  product.model.js   │
                      │(Database Connect) │                               │   (Data Schema)     │
                      │                   │                               │                     │
                      └───────────────────┘                               └─────────────────────┘
                                │                                                      │
                                ▼                                                      ▼
                      ┌───────────────────┐                               ┌─────────────────────┐
                      │                   │                               │                     │
                      │    MongoDB        │◀──────────────────────────────│   CRUD Operations   │
                      │   (Database)      │                               │                     │
                      │                   │                               │                     │
                      └───────────────────┘                               └─────────────────────┘

Flow:
1. Client sends HTTP request to server
2. server.js routes requests to appropriate router (product.route.js)
3. product.route.js dispatches to appropriate controller function
4. Controller uses the Product model to interact with database
5. Database operations are performed
6. Response flows back through the same path to the client
```

<a id="application-object"></a>
## Application Object

Creating multiple app within a app or sub-app

```javascript
const app = express() // the main app
const admin = express() // the sub app
const dbAdmin = express(); 

admin.get('/', (req, res) => {
  console.log(admin.mountpath) // /admin
  res.send('Admin Homepage')
})

app.use('/admin', admin) // mount the sub app
admin.use('/dbadmin', dbAdmin); 
```

<a id="express-methods"></a>
## Express Methods

<a id="appall"></a>
### app.all()

To hit all the methods(GET, POST, PUT, DELETE) for a particular route

```javascript
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<a id="applisten"></a>
### app.listen()

To listen on a port

<a id="appparam"></a>
### app.param()

Format -> app.param(name, callback)

Add callback triggers to route parameters, where name is the name of the parameter or an array of them, and callback is the callback function. The parameters of the callback function are the request object, the response object, the next middleware, the value of the parameter and the name of the parameter, in that order.

- app.param() works as a middleware. 
For example you are trying to get the information of a user with a particular user id but you also want to check data and do some processing and bind some data with the request object and then send the response to the user. 

```javascript
app.get('/user/:id', (req, res) => {
    res.send("get from db by id"); 
}); 
```

So for the checking part, you can add app.param() and add a checking for the parameter id.
So the app.param() will look for the parameter 'id' in every route and if a route is hit by 
a format that has id in its format, then it will execute the callback trigger function. 

```javascript
app.param('id', (req, res, next, id) => {
    // you can do anything or any types of checking in this callback function 
    const user = {
        userId: id,
        name: "Mofazzal", 
        Address: "Bangladesh"
    }
    req.userDetails = user;
    // 
    next(); // at last you have to call the next() function to forward the req, res
}); 
```

You can do anything in the callback function. But remember to call the next() function at the last to forward the request after processing.

And app.param() middleware should be defined before the route.

```javascript
app.param('id', (req, res, next, id) => {
    // you can do anything or any types of checking in this callback function 
    const user = {
        userId: id,
        name: "Mofazzal", 
        Address: "Bangladesh"
    }
    req.userDetails = user;
    // 
    next(); // at last you have to call the next() function to forward the req, res
}); 

app.get('/user/:id', (req, res) => {
    console.log(req.userDetails); // Now you can see the details 
    res.send("get from db by id"); 
}); 
```

<a id="approute"></a>
### app.route()

Format: app.route(path)

- When you have to use a particular portion of a route to many methods or many full routes, then you can use app.route(particular route path) and then use method chaining to add all the other methods. 
- Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware. Use app.route() to avoid duplicate route names (and thus typo errors).

```javascript
app.route('/events')
  .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
  })
  .get((req, res, next) => {
    res.json({}) 
  })
  .post((req, res, next) => {
    // maybe add a new event...
  })
```

Or another example:

```javascript
app.route('/about/mission')
    .get((req, res) => {
        res.send("Application about mission with get") 
    })
    .post((req, res) => {
        res.send("Application about missioin with post"); 
    })
```

<a id="appengine"></a>
### app.engine()

- Using template engine (responding a html template as response)
- We are using EJS template engine (almost html) for example
- For using express as a MVC architecture app.

```javascript
app.set('view engine', 'ejs'); // see the settings table for information 
  
// now you can send a html rendered page as a response (like laravel)
app.get('/', (req, res) => {
    res.render('index') // this will search in the views folder of the project (by default) and send the index.ejs file
})
```

In the views folder, you can create sub-folder. In that case you have to send like this - dirname/index, dirname/about etc.

<a id="middleware"></a>
## Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. These functions can:

- Execute any code
- Make changes to the request and response objects
- End the request-response cycle
- Call the next middleware in the stack

Example of a custom middleware:

```javascript
// Custom middleware function
const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Don't forget to call next()
}

// Apply middleware to all routes
app.use(loggerMiddleware);

// Apply middleware to specific routes
app.use('/api', loggerMiddleware);
```

### Built-in Middleware

Express has several built-in middleware functions:

```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));
```

<a id="request--response"></a>
## Request & Response

### Request Object

The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, etc.

Common properties and methods:

```javascript
// Query parameters (?name=john)
req.query.name // "john"

// Route parameters (/users/:id)
req.params.id // "123"

// Request body (for POST requests)
req.body.username // "john_doe"

// HTTP headers
req.get('Content-Type') // "application/json"

// Request path
req.path // "/users"

// HTTP method
req.method // "GET"
```

### Response Object

The response object (res) represents the HTTP response that an Express app sends when it receives an HTTP request.

Common methods:

```javascript
// Send a response with status code
res.status(200).send('Hello World');

// Send JSON response
res.json({ user: 'john', id: 123 });

// Redirect to another URL
res.redirect('/dashboard');

// Set response headers
res.set('Content-Type', 'text/html');

// Render a view template
res.render('profile', { user: userObject });

// Send a file download
res.download('/path/to/file.pdf');
```

<a id="error-handling"></a>
## Error Handling

Express comes with a built-in error handler that deals with any errors that might be encountered in the app. The default error handling middleware is added at the end of the middleware stack.

Custom error handling middleware:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

For route-specific error handling:

```javascript
app.get('/users/:id', (req, res, next) => {
  // If id is invalid, pass an error to Express
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const err = new Error('Invalid ID');
    err.status = 400;
    return next(err);
  }
  
  // Otherwise continue normally
  res.send(`User: ${id}`);
});
```

<a id="tips--tricks"></a>
## Tips & Tricks

1. **Environment Variables**
   - Store configuration in environment variables, not in the app
   - Use `dotenv` package to load environment variables from a `.env` file
   ```javascript
   import dotenv from 'dotenv';
   dotenv.config();
   
   const PORT = process.env.PORT || 3000;
   ```

2. **Organizing Routes**
   - Group related routes in separate files using Express Router
   ```javascript
   // userRoutes.js
   import express from 'express';
   const router = express.Router();
   
   router.get('/', (req, res) => { /* ... */ });
   router.post('/', (req, res) => { /* ... */ });
   
   export default router;
   
   // server.js
   import userRoutes from './routes/userRoutes.js';
   app.use('/api/users', userRoutes);
   ```

3. **Async/Await with Express**
   - Wrap async route handlers to catch errors automatically
   ```javascript
   // Helper function to catch errors
   const asyncHandler = fn => (req, res, next) => {
     Promise.resolve(fn(req, res, next)).catch(next);
   };
   
   app.get('/users', asyncHandler(async (req, res) => {
     const users = await User.find({});
     res.json(users);
   }));
   ```

4. **Production Best Practices**
   - Use compression for smaller response bodies
   - Implement proper security headers
   - Set appropriate cache headers
   ```javascript
   import compression from 'compression';
   import helmet from 'helmet';
   
   app.use(compression()); // Compress responses
   app.use(helmet()); // Set security headers
   ```

5. **Validation**
   - Always validate user input on the server-side
   - Consider using validation libraries like Joi or express-validator
   ```javascript
   import { body, validationResult } from 'express-validator';
   
   app.post('/user', [
     body('email').isEmail(),
     body('password').isLength({ min: 6 })
   ], (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     // Process valid data...
   });
   ```

6. **Debugging**
   - Use the DEBUG environment variable with the debug package
   ```bash
   DEBUG=express:* node backend/server.js
   ```
   ```javascript
   import debug from 'debug';
   const log = debug('app:routes');
   
   app.get('/', (req, res) => {
     log('Home route accessed');
     res.send('Home');
   });
   ```




