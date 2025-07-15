# MERN Stack Crash Course 🚀

[![GitHub Repository](https://img.shields.io/badge/GitHub-MERN--Crash__course-blue?style=flat-square&logo=github)](https://github.com/Mofazzal874/MERN-Crash_course)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-green?style=flat-square)](https://product-store-mern-3ld6.onrender.com)
[![Node.js](https://img.shields.io/badge/Node.js-22.14.0-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

A comprehensive learning repository for mastering the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) from fundamentals to deployment. This repository contains structured modules covering JavaScript fundamentals, modern JavaScript features, React development, backend development with Node.js and Express, database management with MongoDB, and Next.js framework.

## 🌟 Features

- **Complete MERN Stack Implementation** - Full-stack e-commerce application
- **Step-by-step Learning Modules** - Organized from basics to advanced concepts
- **Interactive Examples** - Hands-on coding examples and projects
- **Production Deployment** - Ready-to-deploy applications with Render.com
- **Modern JavaScript** - ES6+ features and best practices
- **Responsive Design** - Mobile-first approach with modern UI frameworks

## 📚 Table of Contents

### 1. [JavaScript Fundamentals](./01.%20Javacript/)
**Core JavaScript concepts essential for MERN stack development**

- **Classes and Inheritance** - Object-oriented programming in JavaScript
- **Asynchronous JavaScript** - Callbacks, promises, and async/await patterns
- **Prototypes** - Understanding JavaScript's prototype chain and inheritance

### 2. [Modern JavaScript](./02.%20Modern%20Javascript/) 
📋 [**Detailed README**](./02.%20Modern%20Javascript/README.md) - *Comprehensive guide to ES6+ features with interactive examples and hands-on exercises*

- **Arrow Functions** - ES6 function syntax and scope handling
- **Ternary Operators** - Conditional expressions and best practices
- **Objects and Arrays** - Destructuring, spread/rest operators, and advanced methods
- **Interactive Guides** - Browser-based learning tools with Gemini AI integration

### 3. [React.js Development](./03.%20REACT%20js/)
**Frontend development with React ecosystem**

- **React Fundamentals** - Components, state, and lifecycle methods
- **DOM Manipulation** - Event handling and dynamic content updates
- **Virtual DOM** - Understanding React's rendering optimization
- **Practice Projects** - Hands-on React applications and components
- 📋 [**Hudai React App**](./03.%20REACT%20js/Hudai_react_app/README.md) - *Complete React application with Vite build system*

### 4. [MongoDB Database](./04.%20MongoDB/)
**NoSQL database management and operations**

- **MongoDB Commands** - CRUD operations and database management
- **Aggregation Pipelines** - Advanced data processing and analysis
- **Mongoose ODM** - Object document mapping for Node.js
- 📋 [**To-Do App**](./04.%20MongoDB/To%20Do%20App/README.md) - *Full-stack to-do application with MongoDB integration*
- **E-commerce Schema** - Real-world database design patterns

### 5. [Express.js Backend](./05.%20Express%20JS/)
**Server-side development with Express framework**

- 📋 [**Express Basics**](./05.%20Express%20JS/Express%20Basics/README.md) - *Fundamental Express.js concepts, middleware, and routing*
- **EJS Template Engine** - Server-side rendering with dynamic templates
- **RESTful API Design** - Best practices for API development
- **Middleware Implementation** - Custom and third-party middleware integration

### 6. [Next.js Framework](./06.%20Next%20JS/)
📋 [**Next.js Guide**](./06.%20Next%20JS/README.md) - *Modern React framework with server-side rendering and optimization features*

- **App Router** - Next.js 13+ routing system
- **TypeScript Integration** - Type-safe development environment
- **Tailwind CSS** - Utility-first CSS framework integration
- **Production Optimization** - Performance and SEO enhancements

## 🎯 Main Project: E-commerce Full Stack Application

### 📋 [**Complete MERN E-commerce App**](./Basic_crud_with_e_commerce_full%20stack/README.md)
*Full-featured e-commerce platform with CRUD operations, state management, and production deployment*

**🌐 Live Demo:** [https://product-store-mern-3ld6.onrender.com](https://product-store-mern-3ld6.onrender.com)

#### Key Features:
- **Frontend:** React.js with Vite, Chakra UI, and Zustand state management
- **Backend:** Node.js with Express.js and RESTful API design
- **Database:** MongoDB Atlas with Mongoose ODM
- **Deployment:** Render.com with production optimizations
- **Authentication:** Secure user management and session handling

#### Tech Stack:
```javascript
{
  "frontend": ["React.js", "Vite", "Chakra UI", "Zustand"],
  "backend": ["Node.js", "Express.js", "Mongoose"],
  "database": "MongoDB Atlas",
  "deployment": "Render.com",
  "tools": ["Git", "npm", "dotenv"]
}
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ ([Download](https://nodejs.org/))
- **MongoDB Atlas Account** ([Sign up](https://www.mongodb.com/atlas))
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mofazzal874/MERN-Crash_course.git
cd MERN-Crash_course
```

2. **Install dependencies**
```bash
# For the main e-commerce project
cd "Basic_crud_with_e_commerce_full stack"
npm install
npm install --prefix frontend
```

3. **Environment Setup**
```bash
# Create .env file in the backend directory
echo "MONGO_URI=your_mongodb_connection_string" > backend/.env
echo "NODE_ENV=development" >> backend/.env
```

4. **Development Mode**
```bash
# Run backend (from project root)
npm run dev

# Run frontend (in another terminal)
cd frontend
npm run dev
```

5. **Production Build**
```bash
# Build and start production server
npm run build
npm start
```

## 🔧 Technologies Used

| Category | Technologies |
|----------|-------------|
| **Frontend** | React.js, Next.js, Chakra UI, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js, RESTful APIs |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **State Management** | Zustand, React Context |
| **Build Tools** | Vite, npm, Webpack |
| **Deployment** | Render.com, Vercel |
| **Development** | Nodemon, ESLint, Git |


## 🌐 Deployment

### Render.com Deployment

