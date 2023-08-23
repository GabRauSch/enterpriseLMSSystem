import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';
import UserModel from "./User";
import Course from "./Course";

interface SubscriptionAttributes {
    id: number;
    userId: number;
    courseId: number;
}

interface SubscriptionCreationAttributes extends Optional<SubscriptionAttributes, 'id'> {}

class Subscription extends Model<SubscriptionAttributes, SubscriptionCreationAttributes> implements SubscriptionAttributes {
    public id!: number;
    public userId!: number;
    public courseId!: number;

    static async getSubscriptionsByUserId(userId: number): Promise<any | null> {
        try {
            const subscriptions = await sequelize.query(`
            SELECT DISTINCT
                *
            FROM
                course C
            WHERE
                C.id IN (
                    SELECT
                        S.courseId
                    FROM
                        subscription S
                    WHERE
                        S.userId = ${userId}
                );`)


            return subscriptions[0];
        } catch (error) {
            console.error('Error fetching subscriptions by user ID:', error);
            return null;
        }
    }

    static async createSubscription(courseId: number, userId: number): Promise<boolean | null> {
        try {
            const newSubscription = await Subscription.create({
                userId, courseId
            })
            if(!newSubscription){
                return false
            }
            return true;
        } catch {
            return false;
        }
    }
    static async deleteSubscription(subscription: Subscription): Promise<boolean | null>{
        try {
            await subscription.destroy()
            return true
        } catch {
            return false
        }
    }

    static async findSubscriptionByCourseAndUserId(courseId: number, userId: number): Promise<Subscription | null>{
        try {
            const subscription = await Subscription.findOne({
                where: {
                    userId,
                    courseId
                }
            });
            return subscription
        } catch {
            return null
        }
    }
}

Subscription.init({
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
    sequelize,
    timestamps: false,
    tableName: 'subscription'
});

export default Subscription;
