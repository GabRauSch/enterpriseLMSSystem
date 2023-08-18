import sequelize from "../config/mysql";
import { DataTypes, Model, Optional, Op } from 'sequelize';

interface CommentAttributes {
    id: number;
    userId: number;
    parentClassId: number;
    parentCommentId: number;
    content: number;
}
interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: number;
    public userId!: number;
    public parentClassId!: number;
    public parentCommentId!: number;
    public content!: number;

    static async getCommentsByUserAndClassId(userId: number, parentClassId: number): Promise<Comment[] | null> {
        try {
            const comments = await Comment.findAll({
                attributes: ['userId', 'parentClassId', 'parentCommentId'],
                where: { userId, parentClassId }
            });
            if(!comments){
                return null
            }
            return comments;
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return null;
        }
    }

    static async createComment(data: CommentCreationAttributes): Promise<Comment | null> {
        try {
            const classDefinition = await Comment.create(data)
            return classDefinition
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return null;
        }
    }

    static async updateComment(data: CommentCreationAttributes, parentClassId?: number, parentCommentId?: number): Promise<boolean | null> {
        try {
            const comment = await Comment.update(
                {content: data.content},
                {
                    where: {
                        [Op.or]: [
                            {parentClassId},
                            {parentCommentId}
                        ]
                    }
                }
            )
            if(!comment){
                return false
            }
            return true
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return false;
        }
    }
    static async deleteComment(id: number): Promise<boolean | null> {
        try {
            const comment = await Comment.destroy({
                where: {id}
            })
            if(!comment){
                return false
            }
            return true
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return false;
        }
    }
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parentClassId: {
        type: DataTypes.INTEGER
    },
    parentCommentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    content: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'comment'
});

export default Comment;
