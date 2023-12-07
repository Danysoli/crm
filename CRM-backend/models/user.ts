import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Role from './role';

const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    
    email: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },

    idRol: {
        type: DataTypes.BIGINT
    },

    state: {
        type: DataTypes.BOOLEAN
    }

});

User.belongsTo(Role, {
    foreignKey: 'idRol'
})

export default User;