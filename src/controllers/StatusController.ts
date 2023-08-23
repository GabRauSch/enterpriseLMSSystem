import {Request, Response} from 'express';
import Status from '../models/Status';
import * as PatternResponses from '../helpers/PatternResponses'
import UserModel from '../models/User';
import ClassModel from '../models/Class';

export const getStatusByClass = async (req: Request, res: Response)=>{
    const {classId, userId} = req.params;

    
    if (!classId || !userId) 
        return PatternResponses.errorMissingAttributes(res, 'classId, userId');

    const status = await Status.getStatusByClassAndUserId(parseInt(classId), parseInt(userId))
    
    if(!status)
        return PatternResponses.noRegister(res)

    return res.json(status);
}

export const createClassStatus = async (req: Request, res: Response)=>{
    const {classId, userId} = req.body;

    if(!classId || !userId){
        return PatternResponses.errorMissingAttributes(res, 'classId, userId');
    }

    const statusExists = await Status.getStatusByClassAndUserId(parseInt(classId), parseInt(userId));
    if(statusExists){
        return PatternResponses.errorNotCreated(res, "Status already exists")
    }

    const classItemExists = await ClassModel.findByPk(classId);
    const userExists = await UserModel.findByPk(userId);

    if(!classItemExists || !userExists){
        return PatternResponses.errorNotCreated(res, "Class or User don't exist")
    }

    const status = await Status.createClassStatus(classId, userId);
    if(!status){
        return PatternResponses.errorNotCreated(res,  "Error in server")
    }

    return PatternResponses.createdWithSuccess(res)
}

export const deleteClassStatus = async (req: Request, res: Response)=>{
    const {statusId} = req.params;

    if(!statusId){
        return PatternResponses.errorMissingAttributes(res, "statusId");
    }

    const status = await Status.findByPk(statusId);
    if(!status){
        return PatternResponses.errorNotDeleted(res, "Status doesn't exist")
    }

    const statusDeletion = await Status.deleteClassStatus(status);
    if(!statusDeletion){
        return PatternResponses.errorNotDeleted(res, "Error in server");
    }

    return PatternResponses.deletedWithSuccess(res)
}