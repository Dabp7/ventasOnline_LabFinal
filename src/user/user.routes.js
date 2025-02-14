import { Router } from "express";
import { updateUser, deleteUser } from "./user.controller.js";
import { updateUserValidator, updateRoleValidator, deleteUserValidator } from "../middlewares/user-validators.js";
//import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.patch("/editRole/:uid", updateRoleValidator, updateUser)

router.put("/editUser/:uid", updateUserValidator, updateUser)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

export default router;
