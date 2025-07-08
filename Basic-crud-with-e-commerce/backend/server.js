import express from 'express'
import productRoutes from './routes/product.route.js'
import { connectDB } from './config/db.js';
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //using a json parser to parse json data in req.body

// Routes
app.use('/api/products', productRoutes); //routes to products related API 

// Serve static assets in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist"))) //__dirname will take to root and then
                                                                   //go to frontend and then dist

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Connect to database before starting server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    });





