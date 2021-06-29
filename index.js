const express=require('express');
const dotenv=require('dotenv');
const morgan = require('morgan');

const DB=require('../ecom-backend/utils/db.connection');
const userRouter=require('../ecom-backend/routes/user.routes');


const app=express();

dotenv.config();

DB.connectToDb();

app.use(express.json());


app.use(morgan('dev'));

app.use(userRouter);




app.get('/healthCheck',(req,res)=>{
    res.send("health checked");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server Started On Port Nummm: ${process.env.PORT}`);
});