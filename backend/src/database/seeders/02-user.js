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
      {
        username: 'tmosby',
        password: '$2a$10$9PPPyda3FoX5GrUEfmEp9u00BHv6swB7CgUo7evUEbSn.nTlj4rTy',
        accountId: 3,
        // MosbyT789
      },
      {
        username: 'robin',
        password: '$2a$10$t2OpNaTQ1fL.lF7.YCZhD.doaYQOEtOvbFOy/8Clu/6WgJrTDA3/6',
        accountId: 4,
        // ScherCanada1
      },
      {
        username: 'marshall',
        password: '$2a$10$sS8d0IcGC.wSJLi99K1wfuObU9CRQ5ZJVzzAIJXcwSq9rmtafWmA6',
        accountId: 5,
        // juDge1000
      },
      {
        username: 'themom',
        password: '$2a$10$LhsYMkcYXH1MpC0dTczKo.MWohqqIFCNCVmnxp4npbT4iBtlXKOEK',
        accountId: 6,
        // momThe1234
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
