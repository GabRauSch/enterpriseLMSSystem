import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';
import Course from "./Course";
import UserModel from "./User";

interface CompanyAquisitionAttributes {
    id: number;
    companyId: number;
    courseId: number;
}
interface CompanyAquisitionCreationAttributes extends Optional<CompanyAquisitionAttributes, 'id'> {}

class CompanyAquisition extends Model<CompanyAquisitionAttributes, CompanyAquisitionCreationAttributes> implements CompanyAquisitionAttributes {
    public id!: number;
    public companyId!: number;
    public courseId!: number;

    static async getAquisitionsByCompanyId(companyId: number): Promise<CompanyAquisition[] | null> {
        try {
            const aquisitions = await CompanyAquisition.findAll({
                attributes: ['courseId'],
                where: { companyId }
            });
            return aquisitions;
        } catch {
            return null;
        }
    }

    static async getCompanyAquisitionByCompanyAndCourseId(companyId: number, courseId: number): Promise<CompanyAquisition | null>{
        try {
            const aquisition = await CompanyAquisition.findOne({
                where: {
                    companyId,
                    courseId
                }
            })  
            return aquisition
        } catch {
            return null
        }
    }
    static async createAquisition(data: CompanyAquisitionCreationAttributes): Promise<CompanyAquisition | null>{
        try {
            const newAquisition = await CompanyAquisition.create(data);
            return null
        } catch {
            return null;
        }
    }
    
}

CompanyAquisition.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    companyId: {
        type: DataTypes.INTEGER
    },
    courseId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'companyAquisition'
});

export default CompanyAquisition;
