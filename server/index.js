import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import cors from 'cors'
dotenv.config();



const app = express()
app.use(express.json())

app.use(cors());



//mongoose connection

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connect to Db suucessfuly!!")
}).catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{console.log('server running at port 3000')})

//error handle middleware 

// app.use((err,req,res,next)=>{
//     const statusCode = err.statusCode ||500
//     const message = err.message ||'Internal server errror'
//     return res.status(statusCode).json({
//         success:false,
//         statusCode,
//         message
//     })
// })

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)