import {Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import generateJWT from '../helpers/generate-jwt'
import User from '../models/user'

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const login = await User.findOne({
            where: {
                email
            }
        })
   
        if(!login){
            return res.status(400).json({
                msg: 'el usuario no esta registrado'
            })
        }

        const validPassword = bcrypt.compareSync(password, login.dataValues.password);

        // const validPassword = await User.findOne({
        //     where: {
        //         email,
        //         password
        //     }
        // })

        if(!validPassword){
            return res.status(400).json({
                msg: 'el usuario/contraseña son incorrectos'
            })
        }

        if(!login.dataValues.state){
            return res.status(400).json({
                msg: 'el usuario se encuentra inactivo'
            })
        }

        const token = await generateJWT(login.dataValues.id);
        console.log(token);
        return res.status(200).json({
            token,
            user: login
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const logout = (req: Request, res: Response) => {
    return res.status(200).json({
        msg: 'el usuario cerro sesion correctamente'
    })
}

export const validateToken = async(req: Request, res: Response) => {
    const {id} = req.body;
    console.log('id', id);

    const user = await User.findByPk(id);

    if(!user){
        return res.status(200).json({
            user,
            msg: 'Usuario no existe'
        })
    }

    return res.status(200).json({
        user,
        msg: 'Token validado'
    })
}