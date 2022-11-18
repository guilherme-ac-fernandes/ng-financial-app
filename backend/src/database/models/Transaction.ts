import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
// import Account from './Account';

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
      type: INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Transactions',
    updatedAt: false,
  }
);

// Transaction.belongsTo(Account, {
//   foreignKey: 'debitedAccountId',
//   as: 'debitedTransaction',
// });
// Transaction.belongsTo(Account, {
//   foreignKey: 'creditedAccountId',
//   as: 'creditedTransaction',
// });

export default Transaction;
