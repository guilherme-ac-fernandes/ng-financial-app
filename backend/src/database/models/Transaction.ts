import { Model, INTEGER, DATE, DECIMAL } from 'sequelize';
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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Accounts',
        key: 'id',
      },
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Accounts',
        key: 'id',
      },
    },
    value: {
      type: DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Transactions',
    updatedAt: false,
  }
);

export default Transaction;
