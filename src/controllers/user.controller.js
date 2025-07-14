// user.controller.js
import asynchandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"; 
import { User } from "../models/user.models.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const regiterUser = asynchandler(async(req,res)=>{
   
    // get user detail from frontend
    // validation if user already exists  :username,email
    // check for images , check for avatar
    // upload to cloudinary,avtar
    // create user object - create entry in db
    // remove passward and refresh token field from response
    // check for user creation
    // return res

    const {fullname,email,username,password} = req.body
    // checking all fields are valid 
    if(
        [fullname,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"all feild are required")
    }
    // checking if user already exist or nat
   const existedUser =  User.findOne({
        $or : [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user is already existed with this name or email")
    }
    // taking image from multer
    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverimageLocalpath = req.files?.coverimage[0]?.path;
    if(!avatarLocalpath){
         throw new ApiError(400,"avatar file is required");
    }

    // uploading the images on cloudinary
    const avatar =  await uploadoncloudinary(avatarLocalpath);
    const coverimage = await uploadoncloudinary(coverimageLocalpath);
    if(!avatar){
        throw new ApiError(400,"please upload avatar image")
    }

   const user = await  User.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

   const is_created_user = User.findById(user._id).select(
       "-password -refreshToken"
   )
   if(!is_created_user){
       throw new ApiError(500,"something went wrong!!")
   }
  
   return res.status(201).json(
      new ApiResponse(201,is_created_user,"user resister successfully")
   )

}) 

export default regiterUser





























 // return  res.status(200).json({
    //     massage:"thank god"
    //  })    // previous code 