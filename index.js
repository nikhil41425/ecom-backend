const express=require('express');
const dotenv=require('dotenv');
const morgan = require('morgan');

const DB=require('../ecom-backend/utils/db.connection');
const userRouter=require('../ecom-backend/routes/user.routes');

let api=process.env.API_URL;

const app=express();

dotenv.config();

DB.connectToDb();

app.use(express.json());

app.use(morgan('dev'));

app.use("/user",userRouter);

//http://localhost:3200/api/v1/healthcheck

app.get(`${api}/healthcheck`,(req,res)=>{
    res.send("health checked");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server Started On Port Num: ${process.env.PORT}`);
});

