import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

// Define interface for the attributes of the Transaction model
interface TransactionAttributes {
  transaction_id: number;
  user_id: number;
  type: string;
  category?: string;
  amount: number;
  date: Date;
}

// Define the creation attributes, where transaction_id is optional
interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'transaction_id'> {}

// Extend the Model class to create a typed Transaction model
class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public transaction_id!: number;
  public user_id!: number;
  public type!: string;
  public category?: string;
  public amount!: number;
  public date!: Date;

  // Define the association with User model
  static associate(models: any) {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

// Initialize the Transaction model with the sequelize instance
Transaction.init(
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,  // Reference to the User model
        key: 'user_id',
      },
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: false,
    indexes: [
      {
        fields: ['user_id'],
      },
      {
        fields: ['date'],
      },
    ],
  }
);

export default Transaction;
