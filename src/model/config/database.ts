import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('personal_finance', '', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;