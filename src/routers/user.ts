import { isAuthentication } from "../middlewares/authentication";
import { getAllUsers } from "../controllers/user";
import { Router } from "express";


const router = Router()

router.get('/', getAllUsers)
    
export default router
