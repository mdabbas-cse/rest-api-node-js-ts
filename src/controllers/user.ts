import { Request, Response } from "express"
import UserModel from "../models/user"

export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const users = await UserModel.all()
        return res.status(200).json(users).end()
        
    } catch (error) {
        return res.status(400).json({ message: error.message }).end()
    }
}