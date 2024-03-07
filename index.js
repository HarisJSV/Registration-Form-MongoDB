import express from "express";
import mongoose from "mongoose";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const app=express();
const dirname1=dirname(fileURLToPath(import.meta.url));
const port=process.env.PORT||3000;
mongoose.connect(`mongodb+srv://${process.env.MONGO_UN}:${process.env.MONGO_PW}@cluster0.liphcee.mongodb.net/regdb`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
const regschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});
const reg=mongoose.model("Registration",regschema);
app.use(bodyParser.urlencoded({extended:true}));
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})
app.get("/",(req,res)=>{
    res.sendFile(dirname1+"/index.html");
})
app.post("/register",async(req,res)=>{
    try{
      const {name,email,password}=req.body;
      const regdata=new reg({
        name,
        email,
        password
      });
      await regdata.save();
      res.redirect("/success");
    }
    catch(error){
        res.redirect("/error");
    }
  })
  app.get("/success",(req,res)=>{
    res.sendFile(dirname1+"/success.html");
  })
  app.get("/error",(req,res)=>{
    res.sendFile(dirname1+"/error.html");
  })