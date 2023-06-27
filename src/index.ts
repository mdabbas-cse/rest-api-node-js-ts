import express from 'express';
import http from "http"
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';


const app = express()

app.use(cors({
    credentials: true,
}))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())

const server = http.createServer(app)

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000/')
})
