import { Request, Response } from 'express';
import * as PatternResponses from '../helpers//PatternResponses'
import Comment from '../models/Comment';
import Like from '../models/Like';

export const getComments = async (req: Request, res: Response)=>{
    const {classId, userId} = req.params;

    if(!classId || !userId){
        return PatternResponses.errorMissingAttributes(res, 'classId, userId');
    }

    const comments = await Comment.getCommentsByUserAndClassId(parseInt(userId), parseInt(classId));

    if(!comments){
        return PatternResponses.noRegister(res)
    }

    return res.json(comments);
}

export const createComment = async (req: Request, res: Response)=>{
    const {userId,parentClassId, parentCommentId, courseId, content} = req.body;

    if(!userId || !parentClassId || !parentCommentId || !courseId || !content){
        return PatternResponses.errorMissingAttributes(res, 'userId, parentClassId, parentCommentId, courseId, content');
    }

    const data = {
        userId,
        parentClassId,
        parentCommentId,
        courseId,
        content
    }
    const newComment = await Comment.createComment(data);

    if(!newComment){
        return PatternResponses.errorNotCreated(res)
    }

    return PatternResponses.createdWithSuccess(res)
}

export const updateComment = async (req: Request, res: Response) =>{
    const {commentId, content} = req.body;
    if(!commentId || !content){
        return PatternResponses.errorMissingAttributes(res, 'commentId, content');
    }

    const commentIsUpdated = await Comment.updateComment(commentId, content);

    if(!commentIsUpdated){
        return PatternResponses.errorNotUpdated(res)
    }

    return PatternResponses.updatedWithSuccess(res)

}

export const deleteComment = async (req: Request, res: Response)=>{
    const {commentId} = req.params;

    if(!commentId){
        return PatternResponses.errorMissingAttributes(res, 'commentId');
    }

    const commentDeletion = await Comment.deleteComment(parseInt(commentId));

    if(!commentDeletion){
        return PatternResponses.errorNotDeleted(res)
    }

    return PatternResponses.deletedWithSuccess(res)
}

export const getLikes = async (req: Request, res: Response)=>{
    console.log('likes is on the table')
    const {commentId} = req.params;

    if(!commentId){
        return PatternResponses.errorMissingAttributes(res, 'commentId');
    }

    const likes = await Like.getAllLikesByCommentId(parseInt(commentId));
    const likesCount = likes?.length;

    return res.json({"likes": likesCount})
}

export const createLike = async (req: Request, res: Response)=>{
    const {commentId, userId} = req.body;

    if(!commentId || !userId){
        return PatternResponses.errorMissingAttributes(res, 'commentId, userId');
    }

    const likeCreation = await Like.createLike(commentId, userId);

    if(!likeCreation){
        return PatternResponses.errorNotCreated(res)
    }
    return PatternResponses.createdWithSuccess(res)
}

export const deleteLike = async (req: Request, res: Response)=>{
    const {commentId, userId} = req.params;

    if(!commentId || !userId){
        return PatternResponses.errorMissingAttributes(res, 'commentId, userId');
    }

    const likeDeletion = await Like.deleteLikeByCommentAndUserId(parseInt(commentId), parseInt(userId));
    
    if(!likeDeletion){
        return PatternResponses.errorNotDeleted(res);
    }
    return PatternResponses.deletedWithSuccess(res)
}