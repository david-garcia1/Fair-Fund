import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';


const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(
        process.env.DB_NAME || '',
        process.env.DB_USER || '',
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt( '5432', 10),
            dialect: 'postgres',
            logging: console.log,
            dialectOptions: {
                decimalNumbers: true,
            }
        });

sequelize.authenticate().then(() => console.log("database connected!"))
.catch(err => console.error(err));

export default sequelize;