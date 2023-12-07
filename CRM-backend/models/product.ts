import { DataTypes } from 'sequelize';
import db from '../db/connection';
import User from './user';

const Product =  db.define('Product', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.BIGINT
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

Product.belongsTo(User, {
    foreignKey: 'idUser'
})

export default Product;