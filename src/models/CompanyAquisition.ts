import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';
import Course from "./Course";

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
        } catch (error) {
            console.error('Error fetching aquisitions by company ID:', error);
            return null;
        }
    }

    static async createAquisition(data: CompanyAquisitionCreationAttributes): Promise<CompanyAquisition | null>{
        try {
            const aquisitions = await CompanyAquisition.findOne({
                where: {
                    companyId: data.companyId,
                    courseId: data.courseId
                }
            })  
            const course = await Course.findByPk(data.courseId)

            if(!aquisitions && course){
                const newAquisition = await CompanyAquisition.create(data);
                return newAquisition;
            }
            return null
        } catch (error) {
            console.error('Error fetching aquisitions by company ID:', error);
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
