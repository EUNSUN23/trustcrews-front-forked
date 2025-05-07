export const JSONReplaceBigInt = (data: Record<string, unknown>) => {
  return JSON.stringify(data, (k, v) =>
    typeof v === 'bigint' ? Number(v) : v,
  );
};
