import express from 'express'
import userRouter from './routes/userRoute'
import connectDB from './configure/db'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const port =3000
connectDB()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
  };
app.use(cors(corsOptions))  
app.use('/',userRouter)
app.listen(port,()=>{
    console.log(`Server started:http://localhost:${port}`);
    
})