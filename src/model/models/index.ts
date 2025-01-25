import sequelize from '../config/database';
import User from './user';
import Transaction from './transaction';

// Initialize models
const models = {
  User,
  Transaction,
};
  

// Set up associations
Transaction.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Transaction, { foreignKey: 'user_id' });

export default models;

