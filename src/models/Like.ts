import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';
import Comment from "./Comment";
import UserModel from "./User";

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
            return null;
        }
    }
    static async getAllLikesByCommentId(commentId: number): Promise<Like[] | null>{
        try{    
            const likes = await Like.findAll({
                where: {
                    commentId
                }
            })
            return likes
        } catch{
            return null
        }
    }
    static async createLike(commentId: number, userId: number): Promise<Like | null>{
        try {
            const likeCreation = await Like.create({
                commentId, userId
            })

            if(!likeCreation){
                return null
            }
            return likeCreation

        } catch {
            return null
        }
    }
    static async deleteLikeByCommentAndUserId(commentId: number, userId: number): Promise<boolean | null>{
        try {
            const like = await Like.destroy({
                where: {
                    commentId, userId
                }
            }) 

            if(!like){
                return false
            }
            return true
        } catch {
            return true
        }
    }

    static async getLikeByCommentAndUserId(commentId: number, userId: number){
        return await Like.findOne({
            where: {
                commentId, userId
            }
        })
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
