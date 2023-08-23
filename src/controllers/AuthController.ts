import {Request, Response } from 'express';
import * as PatternResponses from '../helpers/PatternResponses'
import UserModel from '../models/User';
import { generateToken, generateHash } from '../config/passport';
import { sendEmail } from '../config/email';

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

export const signup = async (req: Request, res: Response)=>{
    const {email, password, name} = req.body;

    if(!email || !password || !name){
        return PatternResponses.errorMissingAttributes(res, 'email, password, name');
    }

    const nameIsTaken = await UserModel.getUserByName(name);
    if(nameIsTaken){
        return PatternResponses.errorNotCreated(res, 'Name is already taken')
    }

    const passwordHash = generateHash(password)
    const userExists = await UserModel.getUserByEmail(email);

    if(userExists && userExists.name !== null){
        return PatternResponses.errorNotCreated(res, "User already exists");
    }

    const userToken = generateHash(`${name}:${new Date().getMilliseconds()}`);
    if(userExists && userExists.name == null){
        const updateUser = await UserModel.update(
            {confirmationCode: userToken},
            {
                where: {
                    email
                }
            }
        )
        sendEmail({
            title: 'ainda nao funciona assim',
            content: 'bata',
            receiver: "generosa"
        })
        return res.json({
            message:  "Temporary user already exists, Token has been resent",
            token: userToken
        })
    }

    const userCreation = await UserModel.createTemporaryUser(email, passwordHash, userToken)

    if(!userCreation){
        return PatternResponses.errorNotCreated(res, 'Error in server')
    }
    
    sendEmail({
        title: 'ainda nao funciona assim',
        content: 'bata',
        receiver: "generosa"
    })

    return res.json({
        message: "Temporary User created",
        token: userToken
    })
}

export const confirmSignup = async (req: Request, res: Response)=>{
    const {userToken, name} = req.body;

    if(!userToken || !name){
        return PatternResponses.errorMissingAttributes(res, 'userToken, name')
    }

    const userUpdate = await UserModel.update(
        {confirmationCode: '', name},
        {
            where: {
                confirmationCode: userToken
            }
        }
    )

    if(!userUpdate){
        return PatternResponses.errorNotUpdated(res, "Error in server")
    }

    return PatternResponses.createdWithSuccess(res)
}

export const login = async (req: Request, res: Response)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return PatternResponses.errorMissingAttributes(res, 'email, password');
    }

    const passwordHash = generateHash(password)
    console.log(passwordHash)
    const user = await UserModel.getUserByEmailAndPasswordHash(email, passwordHash);

    
    if(!user){
        return PatternResponses.errorWrongCredential(res)
    }
    if(user?.name == null){
        return res.json({error: "Temporary user cannot be logged in"})
    }
    const token = generateToken({id: user.id});

    return res.json({
        token
    })
}