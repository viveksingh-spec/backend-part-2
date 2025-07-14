import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

  cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadoncloudinary = async (localfilepath)=>{
             try{
               if(!localfilepath)return null;
               // upload the file on  cloudinary
             const responce = await  cloudinary.uploader.upload(localfilepath,{
                   resource_type:"auto"
               })
               // file has been uploaded successfully
              //  console.log("file is uploaded on cloudinary",responce.url)
              fs.unlinkSync(localfilepath)
               return responce

             }
             catch(error){
                 fs.unlinkSync(localfilepath)// remove the localy temp file 
                 return null
             }
    }

    export {uploadoncloudinary}