const forceDatabaseRefresh = false;

import express from 'express';
import { routes } from './Routes/index.js';
import { sequelize } from './Models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

app.use(express.json());

app.use(routes);

sequelize.sync({force: forceDatabaseRefresh, alter: true}).then(() => {
    console.log("database synced!");
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});