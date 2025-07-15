# Express.js Application Guide

## Table of Contents

1. [Application Object](#application-object)
2. [Express Methods](#express-methods)
   - [app.all()](#appall)
   - [app.listen()](#applisten)
   - [app.param()](#appparam)
   - [app.route()](#approute)
   - [app.engine()](#appengine)
3. [Middleware](#middleware)
4. [Request & Response](#request--response)
   - [Request Object](#request-object)
   - [Response Object](#response-object)
5. [Error Handling](#error-handling)
6. [Tips & Tricks](#tips--tricks)

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

<a id="request-object"></a>
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

<a id="response-object"></a>
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




