export const bigIntToString = (data: bigint | number | string) => {
  return typeof data === 'string' ? data : Number(data).toString();
};

export const numStrToBigInt = (data: string) => {
  return BigInt(data);
};
