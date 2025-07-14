// user.routes.js
import { Router } from "express";
import  regiterUser  from "../controllers/user.controller.js";
const router = Router();
import {upload} from "../middlerwares/multer.middleware.js";

router.route("/register").post(
    upload.fields([
        {
          name:"avatar",
          maxCount:1
        },
        {
           name:"coverimage",
           maxCount:1
        }
    ]),
    regiterUser
);

export default router;