


# MongoDB Commands Reference Guide

A comprehensive guide to MongoDB commands and operations for development and production environments.

## 📚 Table of Contents

1. [Local MongoDB Server Management](#local-mongodb-server-management)
2. [MongoDB Atlas Cloud Setup](#mongodb-atlas-cloud-setup)
3. [Basic MongoDB Commands](#basic-mongodb-commands)
4. [VS Code MongoDB Integration](#vs-code-mongodb-integration)

---

## 🖥️ Local MongoDB Server Management

### Starting and Stopping MongoDB Service

```bash
# Start MongoDB server (Windows)
net start MongoDB

# Stop MongoDB server (Windows)
net stop MongoDB
```

### Accessing MongoDB Shell

```bash
# Open MongoDB shell
mongosh
```

---

## ☁️ MongoDB Atlas Cloud Setup

### Step-by-Step Setup Process

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create Free Cluster**
   - Choose the free tier (M0 Sandbox)
   - Select your preferred cloud provider and region

3. **Configure Network Access**
   - Add your IP address to the IP Access List
   - For development: Use `0.0.0.0/0` (allows all IPs)
   - ⚠️ **Security Note**: Restrict IP access in production

4. **Create Database User**
   - Go to Database Access
   - Create a new database user with username and password
   - Assign appropriate privileges

5. **Get Connection String**
   - Click "Connect" button on your cluster
   - Select "Connect with MongoDB Shell"
   - Copy the provided connection string

### Connecting to MongoDB Atlas

```bash
# Connect to MongoDB Atlas
mongosh "mongodb+srv://cluster0.mongodb.net/" --username myUser

# Alternative connection method
mongosh
# Then paste the full connection string when prompted
```

---

## 🛠️ Basic MongoDB Commands

### Database Operations

```javascript
// Show all databases in the cluster
show dbs

// Create or switch to a database
use myFirstDatabase

// Access current database
db

// Show current database name
db.getName()

// Drop current database
db.dropDatabase()
```

### Collection Operations

```javascript
// Show all collections in current database
show collections

// Create a collection (happens automatically when inserting documents)
db.createCollection("products")

// Drop a collection
db.products.drop()
```

### Document Operations

#### Insert Operations

```javascript
// Insert a single document
db.products.insertOne({
    name: 'iPhone 10',
    price: 1000,
    category: 'smartphone',
    active: true
});

// Insert multiple documents
db.products.insertMany([
    { name: 'iPhone 11', price: 1200, category: 'smartphone', active: true },
    { name: 'Samsung Galaxy', price: 900, category: 'smartphone', active: true },
    { name: 'iPad Pro', price: 800, category: 'tablet', active: false }
]);
```

#### Read Operations

```javascript
// Find all documents
db.products.find()

// Find with pretty formatting
db.products.find().pretty()

// Find with conditions
db.products.find({ category: 'smartphone' })

// Find one document
db.products.findOne({ name: 'iPhone 10' })

// Find with multiple conditions
db.products.find({ category: 'smartphone', active: true })

// Find with price range
db.products.find({ price: { $gte: 900, $lte: 1200 } })
```

#### Update Operations

```javascript
// Update a single document
db.products.updateOne(
    { name: 'iPhone 10' },
    { $set: { price: 950, active: false } }
);

// Update multiple documents
db.products.updateMany(
    { category: 'smartphone' },
    { $set: { category: 'mobile' } }
);

// Replace a document
db.products.replaceOne(
    { name: 'iPhone 10' },
    { name: 'iPhone 10 Pro', price: 1100, category: 'smartphone', active: true }
);
```

#### Delete Operations

```javascript
// Delete a single document
db.products.deleteOne({ name: 'iPhone 10' })

// Delete multiple documents
db.products.deleteMany({ active: false })

// Delete all documents in collection
db.products.deleteMany({})
```

### Query Operators

```javascript
// Comparison operators
db.products.find({ price: { $gt: 500 } })      // Greater than
db.products.find({ price: { $gte: 500 } })     // Greater than or equal
db.products.find({ price: { $lt: 1000 } })     // Less than
db.products.find({ price: { $lte: 1000 } })    // Less than or equal
db.products.find({ price: { $ne: 1000 } })     // Not equal
db.products.find({ category: { $in: ['smartphone', 'tablet'] } }) // In array

// Logical operators
db.products.find({
    $and: [
        { price: { $gte: 500 } },
        { category: 'smartphone' }
    ]
})

db.products.find({
    $or: [
        { price: { $lt: 600 } },
        { category: 'tablet' }
    ]
})
```

---

## 🔧 VS Code MongoDB Integration

### Setting up MongoDB Extension

1. **Install MongoDB Extension**
   - Open VS Code
   - Go to Extensions (`Ctrl+Shift+X`)
   - Search for "MongoDB for VS Code"
   - Install the official MongoDB extension

2. **Connect to Local MongoDB**
   - Open MongoDB view in VS Code
   - Click "Add Connection"
   - Select "Connect with Connection String"
   - Enter the connection string:

```bash
# Default local MongoDB connection string
mongodb://127.0.0.1:27017
```

3. **Connect to MongoDB Atlas**
   - Follow the same steps as above
   - Use your Atlas connection string:

```bash
# MongoDB Atlas connection string format
mongodb+srv://username:password@cluster0.mongodb.net/database?retryWrites=true&w=majority
```

### VS Code MongoDB Features

- **Browse databases and collections**
- **Run queries directly in VS Code**
- **View and edit documents**
- **Export query results**
- **IntelliSense for MongoDB operations**

---

## 📝 Best Practices
### Performance
- Create indexes for frequently queried fields
- Use projection to limit returned fields
- Implement pagination for large result sets
- Monitor query performance with `explain()`

### Development Workflow
- Use descriptive database and collection names
- Implement proper error handling in applications
- Use MongoDB Compass for visual database management
- Regular backup of important data

---

## 🔗 Useful Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB University (Free Courses)](https://university.mongodb.com/)
- [MongoDB Compass (GUI Tool)](https://www.mongodb.com/products/compass)

---

## 🎯 Quick Reference Card

| Operation | Command |
|-----------|---------|
| Show databases | `show dbs` |
| Use database | `use dbName` |
| Show collections | `show collections` |
| Insert document | `db.collection.insertOne({})` |
| Find documents | `db.collection.find({})` |
| Update document | `db.collection.updateOne({}, {$set: {}})` |
| Delete document | `db.collection.deleteOne({})` |
| Count documents | `db.collection.countDocuments({})` |

---




