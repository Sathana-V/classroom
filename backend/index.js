import express  from "express";
import cors  from "cors";
import mongoose from 'mongoose'
import { userRouter } from "./routes/users.js";
import { taskRouter } from "./routes/Tasks.js";
import { classRouter } from "./routes/Class.js";
const app = express()
// every api request converrt into json 
app.use(express.json())
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
  
app.use("/auth", userRouter)
app.use("/receipe",taskRouter)
app.use("/class", classRouter)
mongoose.connect("mongodb+srv://sathanavenkatesan02:Sathana123@recepies.qnla2aj.mongodb.net/?retryWrites=true&w=majority")
app.listen(3004, () => {
    console.log('server started');
})