import {Schema, model} from 'mongoose';

interface User {
    name: string,
    email: string,
    authentication: {
        password: string,
        salt: string,
        sessionToken: string,
    }
}

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        }
    }
})

export default  model('User', UserSchema)
