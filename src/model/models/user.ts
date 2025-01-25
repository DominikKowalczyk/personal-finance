import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define interface for the attributes of the User model
interface UserAttributes {
  user_id: number;
  name: string;
  email: string;
  password_hash: string;
}

// Define the creation attributes, where user_id is optional
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

// Extend the Model class to create a typed User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;

  // Define the table name and indexes in the options
  static associate(models: any) {
    // Add associations here if needed
    User.hasMany(models.Transaction, { foreignKey: 'user_id', as: 'transactions' });
  }
}

// Initialize the User model with the sequelize instance
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  }
);

export default User;
