import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config()

const sequelize = new Sequelize(
    process.env.MYDB as string,
    process.env.MYUSER as string,
    process.env.MYPASS as string,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MYPORT as string)
    }
);

export default sequelize