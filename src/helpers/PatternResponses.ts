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

export const errorNotCreated = (res: Response)=>{
    res.status(400);
    res.json({"Error": "Could not create register"})
}

export const changedWithSuccess = (res: Response)=>{
    res.status(200);
    res.json({"Success": "Changed with success"})
}

export const errorNotChanged = (res: Response)=>{
    res.status(400);
    res.json({"Error": "Could not change register"})
}

export const errorNotDeleted = (res: Response)=>{
    res.status(400);
    res.json({"Error": "Could not delete"})
}

export const deletedWithSuccess = (res: Response)=>{
    res.status(202);
    res.json({"Success": "Deleted with success"})
}

export const updatedWithSuccess = (res: Response)=>{
    res.status(200);
    res.json({"Success": "Updated with success"});
}
export const errorNotUpdated = (res: Response)=>{
    res.status(400);
    res.json({"Error": "Could not update register"})
}