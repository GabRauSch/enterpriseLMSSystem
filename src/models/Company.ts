import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';

interface CompanyAttributes {
    id: number;
    name: string;
    ownerId: number;
    premiumExpiration: number;
    federationUnity: string;
    city: string;
    detailedLocal: string;
    instagram: string;
    youtube: string;
    facebook: string;
    logo: string;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}

class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
    public id!: number;
    public name!: string;
    public ownerId!: number;
    public premiumExpiration!: number;
    public federationUnity!: string;
    public city!: string;
    public detailedLocal!: string;
    public instagram!: string;
    public youtube!: string;
    public facebook!: string;
    public logo!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static async getCompanyById(id: number): Promise<Company | null> {
        try {
            const company = await Company.findOne({
                where: { id }
            });
            return company;
        } catch (error) {
            // Handle the error
            console.error('Error fetching company by ID:', error);
            return null;
        }
    }
    static async createCompany(data: CompanyCreationAttributes): Promise<Company | null> {
        try {
            const company = await Company.create(data);
            return company;
        } catch (error) {
            // Handle the error
            console.error('Error creating company:', error);
            return null;
        }
    }
}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    ownerId: {
        type: DataTypes.INTEGER
    },
    premiumExpiration: {
        type: DataTypes.DATE
    },
    federationUnity: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    detailedLocal: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    youtube: {
        type: DataTypes.STRING
    },
    facebook:{
        type: DataTypes.STRING
    },
    logo: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Company',
    timestamps: false,
    tableName: 'company'
});

export default Company;
