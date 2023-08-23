import { Response } from "express"
export const notFound = (res: Response)=>{
    res.status(404);
    res.json({"Error": "Not Found"})

    return res
}

export const noRegister = (res: Response)=>{
    res.status(404)
    res.json({"Error": "Couldn't find any register"})
}

export const errorMissingAttributes = (res: Response, attributes: string)=>{
    res.status(400)
    res.json({"Error": "Missing attributes " + attributes})
}

export const createdWithSuccess = (res: Response) =>{
    res.status(201);
    res.json({"Success": "Created register"})
}

export const errorNotCreated = (res: Response, message: string)=>{
    res.status(400);
    res.json({
        error: "Could not create register",
        message 
    })
}

export const changedWithSuccess = (res: Response)=>{
    res.status(200);
    res.json({"Success": "Changed with success"})
}

export const errorNotChanged = (res: Response)=>{
    res.status(400);
    res.json({"Error": "Could not change register"})
}

export const errorNotDeleted = (res: Response, message: string)=>{
    res.status(400);
    res.json({
        error: "Could not delete",
        message
    })
}

export const deletedWithSuccess = (res: Response)=>{
    res.status(202);
    res.json({"Success": "Deleted with success"})
}

export const updatedWithSuccess = (res: Response)=>{
    res.status(200);
    res.json({"Success": "Updated with success"});
}
export const errorNotUpdated = (res: Response, message: string)=>{
    res.status(400);
    res.json({
        error: "Could not update register",
        message
    })
}

export const notAuthorized = (res: Response)=>{
    res.status(401);
    res.json({
        error: "Not authorized"
    })
}

export const errorWrongCredential = (res: Response)=>{
    res.status(404);
    res.json({
        error: "Email or password doesn't match any"
    })
}