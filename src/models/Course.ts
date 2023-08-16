import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize';

interface CourseInstance  extends Model{
    id: number,
    name: string,
    ownerId: number,
    description: string,
    tagsList: string[],
    pontuation: number,
    evaluation: number
}

export const Course = sequelize.define<CourseInstance>('Course', {
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
    ownerId: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    tagsList: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    pontuation:{
        type: DataTypes.INTEGER
    },
    evaluation:{
        type: DataTypes.DOUBLE
    }
}, {
    timestamps: false,
    tableName: 'course'
})