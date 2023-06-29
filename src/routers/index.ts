import authentication from "./authentication";
import user from "./user";


export default (app: any) => {
    app.use('/auth', authentication)
    app.use('/user', user)
}