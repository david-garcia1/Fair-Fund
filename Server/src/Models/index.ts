import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { TransactionFactory } from './transaction.js';
import { SavedCardFactory } from './savedcard.js';

const User = UserFactory(sequelize);
const Transaction = TransactionFactory(sequelize);
const SavedCard = SavedCardFactory(sequelize);

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

User.hasMany(SavedCard, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'SavedCard',
    onDelete: 'CASCADE',
});

SavedCard.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user',
});



export { sequelize, User, Transaction, SavedCard};