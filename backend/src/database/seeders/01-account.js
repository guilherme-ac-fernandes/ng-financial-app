module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Accounts', [
      { balance: 88 },
      { balance: 112 },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};