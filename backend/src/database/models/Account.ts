import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import Transaction from './Transaction';
import User from './User';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DECIMAL,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

Account.belongsTo(User, { foreignKey: 'id', as: 'account' });
Account.hasMany(Transaction, { foreignKey: 'id', as: 'debitedTransaction' });
Account.hasMany(Transaction, { foreignKey: 'id', as: 'creditedTransaction' });

export default Account;