import { isAuthentication } from "./authentication"


export default (app: any) => {
    app.use(isAuthentication)
}