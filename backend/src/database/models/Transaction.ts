import { Model, INTEGER, DATE, STRING, NOW } from 'sequelize';
import db from '.';

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

export default Transaction;
