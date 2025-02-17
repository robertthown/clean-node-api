import { Controller, HttpRequest } from "../../../presentation/protocols";
import { Request, Response } from 'express'


export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        console.log('Request body:', req.body)
        const httpRequest: HttpRequest = {
            body: req.body
        }
        console.log('HTTP Request:', httpRequest)
        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}