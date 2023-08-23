import {Request, Response} from 'express';
import ClassModel from '../models/Class';
import * as PatternResponses from '../helpers/PatternResponses'

export const classById = async (req: Request, res: Response)=>{
    const {classId} = req.params;

    if(!classId){
        return PatternResponses.errorMissingAttributes(res, 'classId')
    }
    const classItem = await ClassModel.findByPk(classId);

    if(!classItem){
        return PatternResponses.noRegister(res);
    }

    return res.json(classItem)
}

export const createClass = async (req: Request, res: Response)=>{
    const {title, videoRef, moduleId} = req.body;
    if(!title || !videoRef || !moduleId){
        return PatternResponses.errorMissingAttributes(res, 'title, videoRef, moduleId');
    }

    const classItemExists = await ClassModel.getClassByTitleOrVideoRef(title, videoRef)
    if(classItemExists){
        return PatternResponses.errorNotCreated(res, "Class already exists")
    }

    const data = {
        title, 
        videoRef,
        moduleId
    }

    const classCreation =  await ClassModel.createClass(data);
    if(!classCreation){
        return PatternResponses.errorNotCreated(res,  'Could not create class')
    }

    return PatternResponses.createdWithSuccess(res);
}

export const updateClassTitle = async (req: Request, res: Response)=>{
    const {classId, title, moduleId} = req.body

    if(!classId && !title){
        return PatternResponses.errorMissingAttributes(res, 'classId, title')
    }

    const changeTitle = await ClassModel.updateClassTitle(parseInt(classId), title)

    if(!changeTitle){
        return PatternResponses.errorNotChanged(res)
    }

    return PatternResponses.changedWithSuccess(res)

}

export  const updateClassModule = async (req: Request, res: Response)=>{
    const {classId, moduleId} = req.body;

    if(!classId && !moduleId){
        return PatternResponses.errorMissingAttributes(res, 'classId, title')
    }
    const changeModuleId = await ClassModel.updateClassModule(parseInt(classId), moduleId)

    if(!changeModuleId){
        return PatternResponses.errorNotChanged(res)
    }
    return PatternResponses.changedWithSuccess(res)
}

export const deleteClass = async (req: Request, res: Response)=>{
    const {classId} = req.params;

    if(!classId){
        return PatternResponses.errorMissingAttributes(res, 'classId');
    }

    const classDeletion = await ClassModel.deleteClass(parseInt(classId));

    if(!classDeletion){
        return PatternResponses.errorNotDeleted(res,  '')
    }
    return PatternResponses.deletedWithSuccess(res)
}