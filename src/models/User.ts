import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';

interface UserAttributes {
    id: number;
    email: string;
    passwordHash: string;
    token: string;
    name: string;
    pontuation: number;
    position: string;
    departament: string;
    companyId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface UserGeneralData extends Exclude<UserAttributes, ['id', 'email', 'passwordHash', 'token', 'pontuation']> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public passwordHash!: string;
    public token!: string;
    public name!: string;
    public pontuation!: number;
    public position!: string;
    public departament!: string;
    public companyId!: number;

    private async updateUserEmail(userId: number, newEmail: string): Promise<boolean | null>{
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
    private async updateUserPassowrd(userId: number, newPasswordHash: string): Promise<boolean | null>{
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
    private async updateUserGeneralData(userId: number, data: UserGeneralData): Promise<boolean | null>{
        try {
            const user = UserModel.update(
                {
                    name: data.name,
                    departament: data.departament
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

    private async getUsersByCompanyId(companyId: number): Promise<UserAttributes[] | null> {
        try {
            const users = await UserModel.findAll({
                where: {
                    companyId
                }
            })
            return users
        } catch {
            return null
        }
    }

    private async deleteUserByUserId(userId: number): Promise<boolean | null>{
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
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    pontuation: {
        type: DataTypes.INTEGER
    },
    position: {
        type: DataTypes.STRING
    },
    departament: {
        type: DataTypes.STRING
    },
    companyId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'user'
});

export default UserModel;
