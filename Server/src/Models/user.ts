import { Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize, } from 'sequelize';
import bcrypt from 'bcrypt';



export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;

    async setPassword(newPassword: string) {
        this.password = await bcrypt.hash(newPassword, 10);
    }

    checkPassword(loginPw: string): Promise<boolean> {
        return bcrypt.compare(loginPw, this.password);
    }
}

export function UserFactory(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Please enter a password',
                    },
                    len: {
                        args: [8, 32],
                        msg: 'Your password must be between 8 and 32 characters',
                    },
                },
            },
        },
        {
            hooks: {
                beforeCreate: async (newUserData) => {
                    await newUserData.setPassword(newUserData.password);
                },
                beforeUpdate: async (updatedUserData) => {
                    if (updatedUserData.password) {
                        await updatedUserData.setPassword(updatedUserData.password);
                    }
                },
            },
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'user',
        }
    );

    return User;
}