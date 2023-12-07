import { Request, Response } from 'express';
import User from '../models/user';
import Product from '../models/product';
import Quotes from '../models/quote';
import Customer from '../models/customer';

export const consultQuote = async (req: Request, res: Response) => {
    const { idQuote } = req.params;
    const quotes = await Quotes.findAll({
        attributes: ['idQuote', 'quantity', 'discount'],
        include: [{
            model: User,
            attributes: ['name']
            },
            {
            model: Product,
            attributes: ['name', 'price']
            },
            {
            model: Customer,
            attributes: ['name']
            }
    ],
        where: {
            idQuote: idQuote
        }
    });

    res.status(200).json({
        quotes
    })
}

export const saveQuote= async (req: Request, res: Response) => {
    let { idQuote, idUser, idCustomer, idProduct, quantity } = req.body;
    const quotes = await Quotes.create({ idQuote, idUser, idCustomer, idProduct, quantity });
    res.status(200).json({
        msg: `Se ha registrado un nueva nueva cotizacion con ID: ${quotes.dataValues.idQuote}`
    })
}



