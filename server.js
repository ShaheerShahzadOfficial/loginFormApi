import {createServer} from 'http'
import { config } from 'dotenv';
import app from './app.js';
import DBConnection from './dbConfig.js';
config()

const server = createServer(app)
DBConnection()

const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log('Server running on port 300')
})