import {Request, Response} from 'express';
import * as PatternResponses from '../helpers/PatternResponses'
import UserModel from '../models/User';
import Subscription from '../models/Subscription';
import Course from '../models/Course';

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

export const createSubscription = async (req: Request, res: Response)=>{
    const {userId, courseId} = req.body;

    if(!userId || !courseId){
        return PatternResponses.errorMissingAttributes(res, 'userId, courseId')
    }

    const subscriptionExists = await Subscription.findSubscriptionByCourseAndUserId(parseInt(courseId), parseInt(userId));
    if (subscriptionExists) {
        return PatternResponses.errorNotCreated(res, "Subscription already exists");
    };

    const userExists = await UserModel.findByPk(userId);
    if(!userExists){   
        return PatternResponses.errorNotCreated(res, "User doesn't exist");
    }

    const courseExists = await Course.findByPk(courseId);
    if(!courseExists){
        return PatternResponses.errorNotCreated(res, "Course doesn't exist");
    }

    const subscriptionCreation = await Subscription.createSubscription(parseInt(courseId), parseInt(userId));
    if(!subscriptionCreation){
        return PatternResponses.errorNotCreated(res, "Error in server");
    }

    return PatternResponses.createdWithSuccess(res);
}

export const deleteSubscription = async (req: Request, res: Response)=>{
    const {subscriptionId} = req.params;

    if(!subscriptionId){
        return PatternResponses.errorMissingAttributes(res, 'subscriptionId');
    }

    const subscriptionExists = await Subscription.findByPk(subscriptionId);
    if(!subscriptionExists){
        return PatternResponses.errorNotDeleted(res, "Subscription doesn't exist");
    }

    const subscriptionDeletion = await Subscription.deleteSubscription(parseInt(subscriptionId));
    if(!subscriptionDeletion){
        return PatternResponses.errorNotDeleted(res, "Error during deletion")
    }
    
    return PatternResponses.deletedWithSuccess(res)
}