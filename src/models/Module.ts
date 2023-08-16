import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'


interface ModuleInstance extends Model{
    id: number,
    title: string,
    description: string
}

export const Module = sequelize.define<ModuleInstance>('Module', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'module'
})