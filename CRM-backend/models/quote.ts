import { DataTypes } from 'sequelize';
import db from '../db/connection';
import User from './user';
import Product from './product';
import Customer from './customer';

const Quotes =  db.define('Quotes', {
    
    idQuote: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    discount: {
        type: DataTypes.INTEGER
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

Quotes.belongsTo(User, {
    foreignKey: 'idUser'
})
Quotes.belongsTo(Product, {
    foreignKey: 'idProduct'
})
Quotes.belongsTo(Customer, {
    foreignKey: 'idCustomer'
})

export default Quotes;