import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config();



const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

app.set('trust proxy', 1)



//mongoose connection

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connect to Db suucessfuly!!")
}).catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{console.log('server running at port 3000')})



app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)