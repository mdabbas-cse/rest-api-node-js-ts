import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import registerRoutes from './routers';
import registerMiddleware from './middlewares';

const port = process.env.PORT || 3000
const url = process.env.MONGODB_URI 

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())

// middleware registration
// registerMiddleware(app)

// routes registration
registerRoutes(app)


// connect to mongodb
mongoose.connect(url)
  .then(() => {
    console.log("connected to mongodb")
    // start server
    app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))
  })
  .catch(err => console.log(err))


