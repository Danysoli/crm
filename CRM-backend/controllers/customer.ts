import { Request, Response } from 'express';
import Customer from '../models/customer';
import User from '../models/user';


export const consultCostumer = async (req: Request, res: Response) => {
    const customers = await Customer.findAll({
        attributes: ['id', 'name', 'email' ,'adress', 'phone'],
        include: [{
            model: User,
            attributes: ['name']
        }],
        where: {
            state: 1
        }
    });

    res.status(200).json({
        msg: `Seccion de clientes`,
        customers
    })
}

export const consultCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (customer) {
        res.status(200).json({
            customer
        })
    } else {
        res.status(404).json({
            msg: 'El cliente no existe'
        })
    }
}

export const saveCustomers = async (req: Request, res: Response) => {
    let { name, email, adress, phone, idUser } = req.body;
    console.log(req.body)
    const customer = await Customer.create({ name, email, adress, phone, idUser });
    res.status(200).json({
        msg: `Se ha registrado un nuevo cliente con ID: ${customer.dataValues.id}`
    })
}

export const updateCustomers = async (req: Request, res: Response) => {
    const { id, name, email, adress, phone  } = req.body;

    const customer = await Customer.update({ id, name, email, adress, phone  }, {
        where: {
            id
        }
    })
    res.status(200).json({
        msg: `Se ha actualizado el cliente con ID: ${id}`
    })
}

export const deleteCustomers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const state = 0;
    await Customer.update({ state }, {
        where: {
            id
        }
    })
    res.status(200).json({
        msg: `Se ha eliminado el cliente exitosamente`
    })
}

