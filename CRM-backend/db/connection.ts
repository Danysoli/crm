import { Sequelize } from "sequelize"


const db = new Sequelize('dbcrm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db; 