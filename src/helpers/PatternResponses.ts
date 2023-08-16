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