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
            host: 'localhost',
            dialect: 'postgres',
            dialectOptions: {
                decimalNumbers: true,
            }
        });

        sequelize.authenticate().then(() => {
            console.log('Connection to database has been established successfully.');
        }).catch((err) => {
            console.error('Unable to connect to database:', err);
        });


export default sequelize;