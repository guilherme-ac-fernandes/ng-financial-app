export const LOGIN_REGISTER_USER_1 = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhcm5leXN0aW5zb24iLCJhY2NvdW50SWQiOjEsImlhdCI6MTY2OTA4OTA2MCwiZXhwIjoxNjY5MTc1NDYwfQ.bYsKiBHC-PTfJZhqg_phr5ljFWhNkRSar68RHmymr-4',
  username: 'barneystinson',
  accountId: 1,
};

export const CREATE_USER_1 = {
  id: 1,
  username: 'barneystinson',
  password: '$2a$10$zaI0xhw2FvOnmXi45DL.Du8k2eOXd3DFnim42aR8rx2QxysLM.7JW',
  accountId: 1,
};

export const ALL_USERS = [
  {
    // id: 1,
    username: 'barneystinson',
    // password: '$2a$10$zaI0xhw2FvOnmXi45DL.Du8k2eOXd3DFnim42aR8rx2QxysLM.7JW',
    accountId: 1,
  },
  {
    // id: 2,
    username: 'lilipad',
    // password: '$2a$10$lXN/Cfkkau9c1tDLlUIk7.ekK1/s4ctiOAiOmM/CLi3Y4cqEzDsX6',
    accountId: 2,
  },
];

export const ALL_USERS_EXCLUDE_FIELDS = [
  {
    username: 'barneystinson',
    accountId: 1,
  },
  {
    username: 'lilipad',
    accountId: 2,
  },
];
