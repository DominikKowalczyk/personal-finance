import sequelize from '../config/database';
import models from '../models'; // Import all models and their associations

const syncDatabase = async () => {
  try {
    // Synchronize all models with the database
    await sequelize.sync({ alter: true }); // Use { alter: true } for safe updates without dropping tables
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
