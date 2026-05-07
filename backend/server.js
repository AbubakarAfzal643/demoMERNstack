const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const demoRoutes = require('./routes/demoRoutes')

// connection + setup + middlewares here 
dotenv.config()
connectDB();
const app = express()
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))


// api routes here 
app.use('/api/students',demoRoutes)

// port + start server
const PORT = process.env.PORT || 5000
app.listen(PORT , () => {
    console.log('Server is running on port number : ',PORT);
})