// require('dotenv').config({path:'./.env'})
import dotenv from 'dotenv';
dotenv.config({ path: './.env'});
import connectDB from "./db/index.js";


connectDB()








/*
const app = express();
;(async()=>{
      try{
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
             app.on("error",(error)=>{
                  console.log("error aya hai :",error);
                  throw error;
             })
             app.listen(process.env.PORT,()=>{
                 console.log(`your app is listing on port ${process.env.PORt}`)
             })
      }
      catch(error){
          console.error("ERROR:",error);
          throw error;
      }
})()
 */