import { Model, INTEGER, DATE, STRING, NOW } from 'sequelize';
import db from '.';
import Account from './Account';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: string;
  createdAt!: string;
}

Transaction.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    debitedAccountId: {
      type: INTEGER,
      allowNull: false,
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false,
    },
    value: {
      type: STRING,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW,
    },
  },
  {
    sequelize: db,
    modelName: 'Transaction',
    tableName: 'Transactions',
    updatedAt: false,
  },
);

Transaction.belongsTo(Account, {
  foreignKey: 'debitedAccountId',
  as: 'debitedAccount',
});
Transaction.belongsTo(Account, {
  foreignKey: 'creditedAccountId',
  as: 'creditedAccount',
});

Account.hasMany(Transaction, {
  foreignKey: 'debitedAccountId',
  as: 'debitedTransactions',
});
Account.hasMany(Transaction, {
  foreignKey: 'creditedAccountId',
  as: 'creditedTransactions',
});

export default Transaction;
