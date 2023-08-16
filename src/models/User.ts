import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'


interface UserInstance  extends Model{
    id: number,
    email: string,
    passwordHash: string,
    token: string,
    name: string,
    pontuation: number,
    position: string,
    departament: string,
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    pontuation: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'user'
})