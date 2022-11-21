export const sumBalance = (amount: unknown, value: unknown) => ({
  balance: Number(amount) + Number(value),
});

export const subBalance = (amount: unknown, value: unknown) => ({
  balance: Number(amount) - Number(value),
});
