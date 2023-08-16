import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'


interface SubscriptionInstance extends Model{
    id: number,
    userId: number,
    courseId: number
}

export const Subscription = sequelize.define<SubscriptionInstance>('Subscription', {
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
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'subscription'
})