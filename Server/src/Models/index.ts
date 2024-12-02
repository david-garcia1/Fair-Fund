import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { TransactionFactory } from './transaction.js';

const User = UserFactory(sequelize);
const Transaction = TransactionFactory(sequelize);

User.hasMany(Transaction, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'transactions',
    onDelete: 'CASCADE',
});

Transaction.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user',
});



export { sequelize, User, Transaction};