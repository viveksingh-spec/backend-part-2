 import mongoose from "mongoose";
 import{ DB_NAME } from "../constants.js";

 const connectDB = async ()=>{
      try{
      const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       console.log(`\n mongoDB connected !!! DB host : ${connectioninstance.Connection.host}`);

      }
      catch(error){
         console.log("error kaha se aya hai ",error);
           process.exit(1);
      }
 }

    export default connectDB;