import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import sequelize from './config/mysql';
import Course from './routes/CourseRoutes'
import { syncAllDatabase } from './config/createDB';

dotenv.config()

const server = express();

syncAllDatabase();

sequelize.authenticate();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(Course)

server.listen(process.env.PORT, ()=>{
    console.log('server started...')
});