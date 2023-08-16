import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'


interface CommentInstance extends Model{
    id: number,
    userId: number,
    parentClassId: number,
    parentCommentId: number //0 for root
}

export const Comment = sequelize.define<CommentInstance>('Comment', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    parentClassId: {
        type: DataTypes.INTEGER
    }, 
    parentCommentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false,
    tableName: 'comment'
})