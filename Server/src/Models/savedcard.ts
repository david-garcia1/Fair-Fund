import { Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize, 
    type ForeignKey,
  } from 'sequelize';


import type { User } from './user.js';

export class SavedCard extends Model<InferAttributes<SavedCard>, InferCreationAttributes<SavedCard>> {
    declare userId: ForeignKey<User['id']>;
    declare cardId: CreationOptional<string>;
    declare symbol: string;
    declare name: string;
    declare price: number;
}

export function SavedCardFactory(sequelize: Sequelize) {
    SavedCard.init(
        {
            cardId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            symbol: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            tableName: 'SavedCard',
            timestamps: false,
            sequelize,
        }
    )
    return SavedCard;
}