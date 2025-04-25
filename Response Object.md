# Response Object in Express.js

## Request-Response Mechanism

Blue arrow - request  
Green arrow - response  
![Request-Response Mechanism](image-9.png)

Only browser clients can set cookies (cookies are set in the browser client, either by the server through an HTTP response or manually with JavaScript). Express apps can also send data with the response.

## Cookie Management Summary

| Action                | Who Does It                          |
|-----------------------|---------------------------------------|
| Sends cookie to client| Server via Set-Cookie header         |
| Stores cookie         | Browser or custom client code        |
| Reads/modifies cookie | JavaScript in browser via document.cookie |

| Client Type       | Supports Cookies? | Notes                                   |
|-------------------|-------------------|-----------------------------------------|
| Browser           | ✅ Yes            | Automatically handles them              |
| Postman/cURL/etc. | ✅ With effort    | You manage them manually or with tools  |

## Properties

### `res.app`
- Same as `req.app`.

### `res.headersSent`
- Returns `false` if headers have not been sent yet.

### `res.locals`
- For local variables scoped to the response.
- These variables can only be used in views or template engine views.

## Methods

### `res.cookie()`
- Sets a cookie name to a value.

### `res.clearCookie()`
- Clears cookies by name.

### `res.end()`
- Ends the response process and disconnects from the client.

### `res.send()`
- Sends the HTTP response.
- Used to send data with the response.

### `res.json()`
- Sends a JSON response.

### `res.status()`
- Sets the HTTP status code.

### `res.sendStatus()`
- Sets the status code and sends the status message to the client, ending the response.

### `res.render()`
- Renders a view.

### `res.format()`
- Performs content negotiation on the `Accept` HTTP header in the request object.
- Reads the content type the client accepts and formats the response accordingly.
- Example: If the client accepts only `application/json`, `res.format()` can send a response of this type.

### `res.location()`
- Sets a `Location` header with a URL value in the response.
- Informs the client where to redirect but does not automatically redirect.

### `res.redirect()`
- Redirects the URL derived from the specified path.

## Explanation with Code Examples

### `res.locals`

You need a view engine to work with this:

```bash
# Install EJS engine
npm install ejs
```

```javascript
const app = express();
app.set('view engine', 'ejs');

app.get('/about', (req, res) => {
    res.render('pages/about', {
        // Sending data in an object to be accessed via res.locals in the about page
        name: 'Bangladesh'
    });
});
```

The object `{ name: "Bangladesh" }` will be stored in `res.locals`.

Now create the About page in `views/pages/about.ejs` and write this code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>About Page</title>
  </head>
  <body>
    <h1>Welcome to <%= name %></h1>
  </body>
</html>
```



