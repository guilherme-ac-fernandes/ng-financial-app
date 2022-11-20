import { Model, INTEGER, DATE, DECIMAL, NOW } from 'sequelize';
import db from '.';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
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
      type: DECIMAL,
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

export default Transaction;
