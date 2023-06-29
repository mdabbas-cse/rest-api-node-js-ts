import { Request, Response, NextFunction } from 'express'
import { merge } from 'lodash'
import UserModel from '../models/user'

export const isAuthentication = async (req: Request, res: Response, next: NextFunction) => {

    try {
        console.log('request',req)
        const sessionToken = req.cookies[process.env.COOKIE]

        console.log(sessionToken)

        if (!sessionToken) {
            return res.status(401).json({ message: 'Unauthorized access!' })
        }

        const existUser = await UserModel.getUserBySessionToken(sessionToken)

        if (!existUser) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        merge(req, { identify: existUser })

        return next()
        
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}