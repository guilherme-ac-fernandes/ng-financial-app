module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'barneystinson',
        password: '$2a$10$zaI0xhw2FvOnmXi45DL.Du8k2eOXd3DFnim42aR8rx2QxysLM.7JW',
        accountId: 1,
        // len123Gen
      },
      {
        username: 'lilipad',
        password: '$2a$10$lXN/Cfkkau9c1tDLlUIk7.ekK1/s4ctiOAiOmM/CLi3Y4cqEzDsX6',
        accountId: 2,
        // Pillow1234
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
