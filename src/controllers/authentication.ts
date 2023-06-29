import UserModel from "../models/user"
import { Request, Response } from "express"
import { authentication, random } from "../helpers/encrypt"


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const user = await UserModel.getByEmail(email)

        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = random(16)

        const newUser = await UserModel.createUser({
            name,
            email,
            authentication: {
                password: authentication(salt, password),
                salt,
            }
        })

        return res.status(201).json(newUser).end()

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const user = await UserModel
            .getByEmail(email)
            .select("+authentication.salt +authentication.password")
            .exec()


        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        const salt = user.authentication.salt
        const hash = user.authentication.password

        const passwordHash = authentication(salt, password)

        if (passwordHash !== hash) {
            return res.status(403).json({ message: 'Incorrect password' })
        }

        const newSalt = random(16)

        user.authentication.sessionToken = authentication(newSalt, user._id.toString())

        await user.save()

        res.cookie(
            process.env.COOKIE,
            user.authentication.sessionToken,
            {
                httpOnly: true,
                domain: process.env.DOMAIN,
                path: '/',
            })

        return res.status(200).json(user).end()

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}