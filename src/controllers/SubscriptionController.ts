import {Request, Response} from 'express';
import * as PatternResponses from '../helpers/PatternResponses'
import UserModel from '../models/User';
import Subscription from '../models/Subscription';

export const getSubscriptions = async (req: Request, res: Response)=>{
    const {userId} = req.params;
    if(!userId){
        return PatternResponses.errorMissingAttributes(res, 'userId');
    }

    const subscription = await Subscription.getSubscriptionsByUserId(parseInt(userId));
    if(!subscription){
        return PatternResponses.noRegister(res);
    }

    

    return res.json(subscription)
}