export const assertNever = (val: never) => {
  console.error(`unexpected value : ${val}`);
  throw Error(`unexpected value : ${val}`);
};
