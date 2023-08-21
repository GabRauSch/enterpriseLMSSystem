import {Request, Response} from 'express';
import Company from '../models/Company';
import * as PatternResponses from '../helpers/PatternResponses';

export const companyById = async (req: Request, res: Response)=>{
    console.log('Received request to /company/:id')
    const {companyId} = req.params
    const company = await Company.getCompanyById(parseInt(companyId));

    if(company){
        res.json(company)
        return;
    }

    return PatternResponses.noRegister(res)
}

export const createCompany = async (req: Request, res: Response)=>{
    console.log('Received request to /company/createCompany')
    const {name, ownerId, premiumExpiration, federationUnity, city, detailedLocal, instagram, youtube, facebook, logo} = req.body;
    if(!name || !ownerId){
        const attributes = 'name, ownerId'
        return PatternResponses.errorMissingAttributes(res, attributes)
    }
    const data = {
        name,
        ownerId,
        premiumExpiration,
        federationUnity,
        city,
        detailedLocal,
        instagram,
        youtube,
        facebook,
        logo
    }
    const company = await Company.createCompany(data)
    return PatternResponses.createdWithSuccess(res)
}
