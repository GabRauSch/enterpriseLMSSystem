import sequelize from "../config/mysql";
import { DataTypes, IncludeOptions, Model, Op, Optional } from 'sequelize';
import { generateHash } from "../config/passport";

interface UserAttributes {
    id: number;
    email: string;
    passwordHash: string;
    confirmationCode: string;
    name: string;
    pontuation: number;
    position: string;
    department: string;
    companyId: number;
    role: string;
}

interface UserCreationAttributes {email: string, passwordHash: string, confirmationCode: string}
interface UserGeneralData extends Exclude<UserAttributes, ['id', 'email', 'passwordHash', 'token', 'pontuation']> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public passwordHash!: string;
    public confirmationCode!: string;
    public name!: string;
    public pontuation!: number;
    public position!: string;
    public department!: string;
    public companyId!: number;
    public role!: string;

    static async getUserByEmailAndPasswordHash(email: string, passwordHash: string): Promise<UserModel | null>{
        try {
            const user = await UserModel.findOne({
                where: {
                    email, passwordHash
                }
            })
            if(!user){
                return null
            }
            return user
        } catch {
            return null
        }
    }


    static async getUserByEmail(email: string): Promise<UserModel | null>{
        try {
            const user = await UserModel.findOne({
                where: {
                    email
                }
            })
            if(!user){
                return null
            }
            return user
        } catch {
            return null
        }
    }

    static async getUserByName(name: string): Promise<UserModel | null>{
        try {
            const user = await UserModel.findOne({
                where: {
                    name
                }
            })
            if(!user){
                return null
            }
            return user
        } catch {
            return null
        }
    }
    
    static async createTemporaryUser(email: string, passwordHash: string, confirmationCode: string): Promise<boolean> {
        try {
            await UserModel.create({
                email, 
                passwordHash,
                confirmationCode
            })
            
            return true
        } catch {
            return false
        }
    }
    private async updateUserEmail(userId: number, newEmail: string): Promise<boolean>{
        try{
            const user = UserModel.update(
                {email: newEmail},
                {
                    where: {
                        id: userId
                    }
                },
            )
            if(!user){
                return false
            }
            return true
        } catch{
            return false
        }
    }
    private async updateUserPassowrd(userId: number, newPasswordHash: string): Promise<boolean>{
        try{
            const user = UserModel.update(
                {passwordHash: newPasswordHash},
                {
                    where: {
                        id: userId
                    }
                }
            )
            if(!user){
                return false
            }
            return true
        } catch{
            return false
        }
    }
    private async updateUserGeneralData(userId: number, data: UserGeneralData): Promise<boolean>{
        try {
            const user = UserModel.update(
                {
                    name: data.name,
                    department: data.department
                },
                {
                    where: {
                        id: userId
                    }
                }
            );
            if(!user){
                return false
            }
            return true
        } catch {
            return false
        }
    }

    private async getUsersByCompanyId(companyId: number): Promise<UserAttributes[] | boolean> {
        try {
            const users = await UserModel.findAll({
                where: {
                    companyId
                }
            })
            return users
        } catch {
            return false
        }
    }

    private async deleteUserByUserId(userId: number): Promise<boolean>{
        try {
            const user = await UserModel.findByPk(userId);
            user?.destroy();
            return true
        } catch {
            return false
        }
    }
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmationCode: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    pontuation: {
        type: DataTypes.INTEGER
    },
    position: {
        type: DataTypes.STRING
    },
    department: {
        type: DataTypes.STRING
    },
    companyId: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'user'
});

export default UserModel;
