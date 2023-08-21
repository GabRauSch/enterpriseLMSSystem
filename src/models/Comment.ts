import sequelize from "../config/mysql";
import { DataTypes, Model, Optional, Op } from 'sequelize';
import CompanyAquisition from "./CompanyAquisition";

interface CommentAttributes {
    id: number;
    userId: number;
    parentClassId: number;
    parentCommentId: number;
    courseId: number;
    content: string;
}
interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: number;
    public userId!: number;
    public parentClassId!: number;
    public parentCommentId!: number;
    public courseId!: number;
    public content!: string;

    static async getCommentsByUserAndClassId(userId: number, parentClassId: number): Promise<Comment[] | null> {
        try {
            const comments = await Comment.findAll({
                attributes: ['userId', 'parentClassId', 'parentCommentId'],
                where: { userId, parentClassId }
            });
            console.log(comments)
            if(comments.length < 1){
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

    static async updateComment(commentId: number, content: string ): Promise<boolean | null> {
        try {
            const comment = await Comment.update(
                {content},
                {
                    where: {
                        id: commentId
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
    courseId: {
        type: DataTypes.INTEGER
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
