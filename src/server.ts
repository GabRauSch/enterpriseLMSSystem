import express, { ErrorRequestHandler } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import sequelize from './config/mysql';
import Course from './routes/CourseRoutes'
import { syncAllDatabase } from './config/createDB';
import passport from 'passport';

dotenv.config()

const server = express();

server.use(passport.initialize())

syncAllDatabase();

sequelize.authenticate();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(Course)

const errorHandler: ErrorRequestHandler = (err, req, res, next)=>{
    if(err.message){
        return res.json({err: err.message})
    }
    return res.json({err: "Error in server"})
}
server.use(errorHandler)

server.listen(process.env.PORT, ()=>{
    console.log('server started...')
});