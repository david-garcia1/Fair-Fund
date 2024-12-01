import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { TransactionFactory } from './transaction.js';

const User = UserFactory(sequelize);
const Transaction = TransactionFactory(sequelize);

User.hasMany(Transaction, {

    onDelete: 'CASCADE',
});

Transaction.belongsTo(User);



export { sequelize, User, Transaction};