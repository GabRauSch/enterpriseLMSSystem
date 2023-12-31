import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';

interface StatusAttributes {
    id: number;
    userId: number;
    classId: number;
}

interface StatusCreationAttributes extends Optional<StatusAttributes, 'id'> {}

class Status extends Model<StatusAttributes, StatusCreationAttributes> implements StatusAttributes {
    public id!: number;
    public userId!: number;
    public classId!: number;

    static async getStatusByClassAndUserId(userId: number, classId: number): Promise<Status | null> {
        try {
            const status = await Status.findOne({
                where: { userId, classId }
            });
            return status;
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return null;
        }
    }
    static async createClassStatus(userId: number, classId: number): Promise<Status | boolean> {
        try {
            const createdStatus = await Status.create(
                {
                    userId,
                    classId
                }
            )
            return createdStatus
            
        } catch  {
            return false;
        }
    }

    static async deleteClassStatus(status: Status): Promise<boolean>{
        try {
            await status.destroy();
            return true
        } catch {
            return false
        }
    }
}

Status.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'status'
});

export default Status;
