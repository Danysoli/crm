import { Request, Response } from 'express';
import User from '../models/user';
import Product from '../models/product';


export const consultProduct = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price'],
        include: [{
            model: User,
            attributes: ['name']
        }],
        where: {
            state: 1
        }
    });

    res.status(200).json({
        msg: `Seccion de productos`,
        products
    })
}

export const consultProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (product) {
        res.status(200).json({
            product
        })
    } else {
        res.status(404).json({
            msg: 'El producto no existe'
        })
    }
}

export const saveProducts= async (req: Request, res: Response) => {
    let { name, description, price, idUser } = req.body;
    const product = await Product.create({ name, description, price, idUser });
    res.status(200).json({
        msg: `Se ha registrado un nuevo producto con ID: ${product.dataValues.id}`
    })
}

export const updateProducts = async (req: Request, res: Response) => {
    const { id, name, description, price  } = req.body;

    const product = await Product.update({ id, name, description, price }, {
        where: {
            id
        }
    })
    res.status(200).json({
        msg: `Se ha actualizado el producto con ID: ${id}`
    })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const state = 0;
    await Product.update({ state }, {
        where: {
            id
        }
    })
    res.status(200).json({
        msg: `Se ha eliminado el producto exitosamente`
    })
}

