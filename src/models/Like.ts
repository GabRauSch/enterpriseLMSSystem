import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'

interface LikeInstance extends Model{
    id: number,
    commentId: number
}

export const Like = sequelize.define<LikeInstance>('Like', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'like'
})