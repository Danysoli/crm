import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = (req: Request, res: Response, next: () => void) => {
    const token = req.header('x-token');
    console.log();
    if(!token){
        return res.status(401).json({
            msg: 'no hay token'
        })
    }
    try {
        const resultToken: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '');
        req.body.id = resultToken?.id;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}

export default validateJWT;