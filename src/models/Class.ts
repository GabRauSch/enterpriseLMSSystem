import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'
interface ClassInstance  extends Model{
    id: number,
    title: string,
    videoRef: string,
    moduleId: number
}

export const Class = sequelize.define<ClassInstance>('Class', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoRef: {
        type: DataTypes.STRING
    },
    moduleId: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'class'
})