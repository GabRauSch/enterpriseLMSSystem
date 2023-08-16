import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'

interface CompanyAquisitionInstance  extends Model{
    id: number,
    companyId: string,
    courseId: string,
}

export const CompanyAquisition = sequelize.define<CompanyAquisitionInstance>('CompanyAquisition', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    companyId: {
        type: DataTypes.INTEGER
    },
    courseid: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'companyAquisition'
})