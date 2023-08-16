import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'


interface SegmentInstance  extends Model{
    id: number,
    name: string,
    companyId: number,
    hasRightForCourses: boolean
}

export const Segment = sequelize.define<SegmentInstance>('Segment', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER
    },
    hasRightForCourses: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false,
    tableName: 'segment'
})