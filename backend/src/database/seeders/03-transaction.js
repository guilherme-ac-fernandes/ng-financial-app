module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 28,
        createdAt: new Date("2022-11-19T14:15:13.000Z"),
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 16,
        createdAt: new Date("2022-11-19T19:15:13.000Z"),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
