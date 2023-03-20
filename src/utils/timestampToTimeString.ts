export const timestampToTimeString = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString();
};
