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
    declare transactionId: CreationOptional<number>;
    declare amount: CreationOptional<number>;
    declare expense: boolean;
}

export function TransactionFactory(sequelize: Sequelize) {
    Transaction.init(
        {
            transactionId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            expense: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },    
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            }
        },
        {
            tableName: 'Transaction',
            timestamps: true,
            updatedAt: 'updatedTime',
            createdAt: 'transactionTime',
            sequelize,
        }
    )
}