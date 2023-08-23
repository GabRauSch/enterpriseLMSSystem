import {Request, Response} from 'express';
import Company from '../models/Company';
import * as PatternResponses from '../helpers/PatternResponses';
import Course from '../models/Course';
import CompanyAquisition  from '../models/CompanyAquisition';

export const courseById = async (req: Request, res: Response)=>{
    console.log('Received request to /course/:courseId')
    const {courseId} = req.params
    const course = await Course.getCourseById(parseInt(courseId));

    if(course){
        res.json(course)
        return;
    }

    return PatternResponses.noRegister(res)
}

export const createCourse = async (req: Request, res: Response)=>{
    console.log('Received request to /course/createCourse')
    const {name, ownerId, companyId, description, tagsList, pontuation, evaluation} = req.body;
    if(!name || !ownerId){
        const attributes = 'name, ownerId'
        return PatternResponses.errorMissingAttributes(res, attributes)
    }
    const data = {
        name, ownerId, companyId, description, tagsList, pontuation, evaluation
    }
    const company = await Course.createCourse(data)
    return PatternResponses.createdWithSuccess(res)
}

export const companyAquisitions = async (req: Request, res: Response)=>{
    console.log('Receiver request to /courses/:companyId')
    const {companyId} = req.params;
    const courseIds = await CompanyAquisition.getAquisitionsByCompanyId(parseInt(companyId))
    // console.log(courseIds)

    return res.json(courseIds)
}

export const createAquisition = async (req: Request, res: Response)=>{
    console.log('Received Request to /course/aquisition');
    const {companyId, courseId} = req.body;
    if(!companyId || !courseId){
        const attributes = 'companyId, courseId'
        return PatternResponses.errorMissingAttributes(res, attributes)
    }


    const aquisitionsExists = await CompanyAquisition.getCompanyAquisitionByCompanyAndCourseId(companyId, courseId)  
    if(aquisitionsExists){
        return PatternResponses.errorNotCreated(res, "Aquisition already exists");
    }
    
    const courseExists = await Course.findByPk(courseId)
    if(!courseExists){
        return PatternResponses.errorNotCreated(res, "Course doesn't exist")
    }

    const data = {
        companyId: parseInt(companyId),
        courseId: parseInt(courseId)
    }
    const aquisition = await CompanyAquisition.createAquisition(data);

    if(!aquisition){
        return PatternResponses.errorNotCreated(res, 'test')
    }

    return PatternResponses.createdWithSuccess(res)
}
