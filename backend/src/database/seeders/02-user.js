module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: '@guilherme',
        password: '1234Gui1234',
        account_id: 1,
      },
      {
        username: '@felipe',
        password: '1234Felipe',
        account_id: 2,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
