module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 28,
        createdAt: new Date(),
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 16,
        createdAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
