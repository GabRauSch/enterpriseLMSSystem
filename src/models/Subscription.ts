import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';

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

    static async createSubscription(data: SubscriptionCreationAttributes): Promise<Subscription | null> {
        try {
            const subscription = await Subscription.findOne({
                where: {
                    userId: data.userId,
                    courseId: data.courseId
                }
            });

            if (!subscription) {
                const newSubscription = await Subscription.create(data);
                return newSubscription;
            }
            return null;
        } catch (error) {
            console.error('Error creating subscription:', error);
            return null;
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
