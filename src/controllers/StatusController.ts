import {Request, Response} from 'express';
import Status from '../models/Status';
import * as PatternResponses from '../helpers/PatternResponses'

export const getStatusByClass = async (req: Request, res: Response)=>{
    const {classId, userId} = req.params;

    
    if (!classId || !userId) 
        return PatternResponses.errorMissingAttributes(res, 'classId, userId');

    const status = await Status.getStatusByClassAndUserId(parseInt(classId), parseInt(userId))
    
    if(!status)
        return PatternResponses.noRegister(res)

    return res.json(status);
}

export const defineClassStatus = async (req: Request, res: Response)=>{
    const {classId, userId} = req.body;

    if(!classId || !userId){
        return PatternResponses.errorMissingAttributes(res, 'classId, userId');
    }

    const status = await Status.defineClassStatus(classId, userId);
    console.log(status)

    if(!status){
        return PatternResponses.errorNotCreated(res,  '')
    }

    return PatternResponses.changedWithSuccess(res)
    
}