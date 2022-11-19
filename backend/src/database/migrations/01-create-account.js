module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Accounts');
  },
};