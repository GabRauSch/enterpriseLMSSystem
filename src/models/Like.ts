import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';

interface LikeAttributes {
    id: number;
    commentId: number;
    userId: number;
}

interface LikeCreationAttribute extends Optional<LikeAttributes, 'id'>{}

class Like extends Model<LikeAttributes, LikeCreationAttribute> implements LikeAttributes {
    public id!: number;
    public commentId!: number;
    public userId!: number

    static async changeLikeStatus(commentId: number, userId: number): Promise<Like | null> {
        try {
            const like = await Like.findOne({
                where: {
                    commentId, userId
                }
            })
            if(!like){
                const likeCreation = await Like.create({
                    commentId, userId
                });
                return likeCreation
            }
            await like.destroy();
            return like
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return null;
        }
    }
    static async getAllLikesByCommentId(commentId: number): Promise<Like[] | null>{
        try{    
            const likes = Like.findAll({
                where: {
                    commentId
                }
            })
            return likes
        } catch{
            console.error('Error getting likes by comment Id')
            return null
        }
    }
    
}

Like.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'like'
});

export default Like;
