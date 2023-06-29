import * as crypto from 'crypto'

export const random = (length: number | null) => crypto
    .randomBytes(length)
    .toString('base64')

export const authentication = (salt: string, password: string) => {

    return crypto
        .createHmac('sha256', [salt, password].join('/'))
        .update(process.env.SECRET)
        .digest('hex')
}