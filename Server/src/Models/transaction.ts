import { Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize, 
    type ForeignKey,
  } from 'sequelize';


import type { User } from './user.js';

export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare userId: ForeignKey<User['id']>;
    declare transactionId: CreationOptional<string>;
    declare amount: CreationOptional<number>;
    declare date: Date;
    declare description: String;
}

export function TransactionFactory(sequelize: Sequelize) {
    Transaction.init(
        {
            transactionId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },    
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'Transaction',
            timestamps: true,
            updatedAt: 'updatedTime',
            createdAt: 'transactionTime',
            sequelize,
        }
    )

    return Transaction;
}