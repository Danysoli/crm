import { DataTypes } from 'sequelize';
import db from '../db/connection';
import User from './user';


const Customer =  db.define('Customer', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    adress: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

Customer.belongsTo(User, {
    foreignKey: 'idUser'
})

export default Customer;