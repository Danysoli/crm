import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import Role from '../models/role';  


export const consultUser = async (req: Request, res: Response) => {
    const users = await User.findAll({
        attributes: ['id','name', 'email', 'idRol'],
        include: [{
            model: Role,
            attributes: ['name']
        }],
        where: {
            state: 1
        }
    });
    res.status(200).json({
        msg: `Bienvenidos  a la seleccion de usuario`,
        users
    })
}

export const consultUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
        res.status(200).json({
            user
        })
    } else {
        res.status(404).json({
            msg: 'El usuario no existe'
        })
    }
}

export const saveUsers = async (req: Request, res: Response) => {
    let { name, role, email, password } = req.body;
    let idRol = 2;
    if(role == "Administrador"){
         idRol = 1;
    }
    const state = 1;
    //photo = req.file?.filename;
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const user = await User.create({ name, email, password, idRol, state });
    res.status(200).json({
        msg: `Se ha registrado un nuevo usuario con ID: ${user.dataValues.id}`
    })
}

export const updateUsers = async (req: Request, res: Response) => {
    const { id, name, email, idRol } = req.body;

    const user = await User.update({ id, name, email, idRol }, {
        where: {
            id
        }
    })
    res.status(200).json({
        msg: `Se ha actualizado el usuario con ID: ${id}`
    })
}

export const deleteUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const state = 0;
    await User.update({ state }, {
        where: {
            id
        }
    })
    res.status(200).json({
        // msg: `Se ha eliminado el usuario con ID: ${id}`
        msg: `Se ha eliminado el usuario exitosamente`
    })
}