import { Model, INTEGER } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: string;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

export default Account;