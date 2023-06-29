import User from "../db/user";


const UserModel = {
    
    all: () => User.find({}).exec(),

    getByEmail: (email: String) => User.findOne({ email: email }),

    getUserBySessionToken: (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken }).exec(),

    getUserById: (id: string) => User.findById(id).exec(),

    createUser: (values: Record<string, any>) => new User(values).save().then((user) => user.toObject()),

    deleteUserById: (id: string) => User.findByIdAndDelete({ _id: id }).exec(),

    updateUserById: (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values, { new: true }).exec(),

}

export default UserModel