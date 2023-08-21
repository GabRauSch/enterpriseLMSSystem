import {Request, Response } from 'express';
import * as PatternResponses from '../helpers/PatternResponses'
import UserModel from '../models/User';

export const getUser = async (req: Request, res: Response)=>{
    const {userId} = req.params;

    if(!userId){
        return PatternResponses.errorMissingAttributes(res, 'userId');
    }

    const user = await UserModel.findByPk(userId)
    
    if(!user){
        return PatternResponses.noRegister(res)
    }

    return res.json(user);
}
